const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

console.log('Loading function');

const BATCH_SIZE = Number(process.env.BATCH_SIZE);
const DELTA_TABLE = process.env.DELTA_TABLE;
const TTL = Number(process.env.TTL);
const commentTableName = process.env.COMMENT_TABLE_NAME;
const bookmarkTableName = process.env.BOOKMARK_TABLE_NAME;
const commentsIndexName = process.env.GSI_EVENT_COMMENTS;
const eventIndexName = process.env.GSI_EVENT_BOOKMARKS;

exports.handler = async (event, context) => {
    const { Records } = event;
    for (let i = 0; i < BATCH_SIZE; i += BATCH_SIZE) {
        const [ records, deletedEventsIds ] = processRecords(Records.slice(i, i + BATCH_SIZE));
        records.length && await batchWriteRecords(records);
        if (deletedEventsIds.length) {
            await deleteEventsComments(deletedEventsIds);
            // await deleteEventsBookmarks(deletedEventsIds);
        }
    }
    return `Successfully processed ${event.Records.length} records.`;
};

function processRecords(records) {
    let result = [];
    let deletedEventsIds = [];
    for (let record of records) {
        const {
            ApproximateCreationDateTime,
            Keys,
            NewImage,
            OldImage
        } = record.dynamodb;
        const keys = unmarshall(Keys);
        const newImage = unmarshall(NewImage);
        const oldImage = unmarshall(OldImage);
        const eventObject = newImage.__typename ? newImage : oldImage;
        const eventName = record.eventName;
        let aws_ds;
        if (eventName === 'INSERT') {
            aws_ds = 'CREATE';
        } else if (eventName === 'REMOVE') {
            aws_ds = 'DELETE';
            deletedEventsIds.push(keys.id);
        }
        
        const Item = {
            id: keys.id,
            eventScheduleId: eventObject.eventScheduleId,
            eventAuthorId: eventObject.eventAuthorId,
            aws_ds,
            oldImage: oldImage.__typename && oldImage,
            newImage: newImage.__typename && newImage,
            timestamp: ApproximateCreationDateTime,
            expDate: ApproximateCreationDateTime + TTL
        };
        result.push({
            PutRequest: {
                Item
            }
        });
    }
    return [ result, deletedEventsIds ];
}

function unmarshall(object) {
    return AWS.DynamoDB.Converter.unmarshall(object);
}

async function batchWriteRecords(records) {
    const params = {
        RequestItems: {
            [DELTA_TABLE]: records
        }
    };
    await dynamodb.batchWrite(params).promise();
}

async function deleteEventsComments(eventIds) {
    const queries = eventIds.map(id => {
        const params = {
            TableName: commentTableName,
            IndexName: commentsIndexName,
            ProjectionExpression: 'id',
            KeyConditionExpression: '#commentEventId = :id',
            ExpressionAttributeNames: {
                "#commentEventId": "commentEventId"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };
        return dynamodb.query(params).promise()
            .then(async (data) => {
                const Items = [...data.Items];
                let LastEvaluatedKey = data.LastEvaluatedKey;

                while (LastEvaluatedKey) {
                    const response = await dynamodb.query({
                        ...params,
                        ExclusiveStartKey: LastEvaluatedKey
                    }).promise();
                    if (response) {
                        LastEvaluatedKey = response.LastEvaluatedKey;
                        Items.push(...response.Items);    
                    }
                }

                return Items;
            });
    });
    return Promise.all(queries).then(async (itemsList) => {
        const operations = itemsList.reduce((accumulator, items) => {
            if (items.length) {
                accumulator.push(...items); 
            }
            return accumulator;
        }, []).map(Key => ({
            DeleteRequest: {
                Key
            }
        }));
        if (operations.length) {
            for (let start = 0; start <= operations.length; start += BATCH_SIZE) {
                const end = start + BATCH_SIZE;
                const params = {
                    RequestItems: {
                        [commentTableName] : operations.slice(start, end)
                    }
                };
                await dynamodb.batchWrite(params).promise();
            }   
        }
    });
}


async function deleteEventsBookmarks(deletedEventsIds) {
    const queries = deletedEventsIds.map(id => {
        const params = {
            TableName: bookmarkTableName,
            IndexName: eventIndexName,
            ProjectionExpression: 'id',
            KeyConditionExpression: '#eventId = :id',
            ExpressionAttributeNames: {
                "#eventId": "bookmarkEventId"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };
        return dynamodb.query(params).promise()
            .then(async (data) => {
                const Items = [...data.Items];
                let LastEvaluatedKey = data.LastEvaluatedKey;

                while (LastEvaluatedKey) {
                    const response = await dynamodb.query({
                        ...params,
                        ExclusiveStartKey: LastEvaluatedKey
                    }).promise();
                    if (response) {
                        LastEvaluatedKey = response.LastEvaluatedKey;
                        Items.push(...response.Items);    
                    }
                }

                return Items;
            });
    });
    return Promise.all(queries).then(async (itemsList) => {
        const operations = itemsList.reduce((accumulator, items) => {
            if (items.length) {
                accumulator.push(...items); 
            }
            return accumulator;
        }, []).map(Key => ({
            DeleteRequest: {
                Key
            }
        }));
        if (operations.length) {
            for (let start = 0; start <= operations.length; start += BATCH_SIZE) {
                const end = start + BATCH_SIZE;
                const params = {
                    RequestItems: {
                        [bookmarkTableName] : operations.slice(start, end)
                    }
                };
                await dynamodb.batchWrite(params).promise();
            }   
        }
    });
}