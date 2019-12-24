const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

console.log('Loading function');

const BATCH_SIZE = Number(process.env.BATCH_SIZE);
const DELTA_TABLE = process.env.DELTA_TABLE;
const TTL = Number(process.env.TTL);
const eventTableName = process.env.EVENT_TABLE_NAME;
const followTableName = process.env.FOLLOW_TABLE_NAME;
const gsiScheduleEvents = process.env.GSI_SCHEDULE_EVENTS;
const gsiFollowers = process.env.GSI_FOLLOWERS;
const gsiScheduleEventsKey = process.env.GSI_SCHEDULE_EVENTS_KEY;
const gsiFollowersKey = process.env.GSI_FOLLOWERS_KEY;

exports.handler = async (event) => {
    const { Records } = event;
    for (let i = 0; i < BATCH_SIZE; i += BATCH_SIZE) {
        const [ records, scheduleIds ] = processRecords(Records.slice(i, i + BATCH_SIZE));
        records.length && await batchWriteRecords(records);
        if (scheduleIds.length) {
            await deleteSchedulesEvents(scheduleIds);
            await deleteSchedulesFollows(scheduleIds);
        }
    }
    return `Successfully processed ${event.Records.length} records.`;
};

function processRecords(records) {
    let result = [];
    let deletedScheduleIds = [];
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
        const eventName = record.eventName;
        
        let aws_ds;
        if (eventName === 'INSERT') {
            aws_ds = 'CREATE';
        } else if (eventName === 'REMOVE') {
            aws_ds = 'DELETE';
            deletedScheduleIds.push(keys.id);
        }
        
        const Item = {
            id: keys.id,
            eventScheduleId: newImage.eventScheduleId,
            eventAuthorId: newImage.eventAuthorId,
            oldImage,
            newImage,
            aws_ds,
            timestamp: ApproximateCreationDateTime,
            expDate: ApproximateCreationDateTime + TTL
        };
        result.push({
            PutRequest: {
                Item
            }
        });
    }
    return [ result, deletedScheduleIds ];
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

async function deleteSchedulesEvents(scheduleIds) {
    const queries = scheduleIds.map(id => {
        const params = {
            TableName: eventTableName,
            IndexName: gsiScheduleEvents,
            ProjectionExpression: 'id',
            KeyConditionExpression: '#scheduleId = :id',
            ExpressionAttributeNames: {
                "#scheduleId": gsiScheduleEventsKey
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
                        [eventTableName] : operations.slice(start, end)
                    }
                };
                await dynamodb.batchWrite(params).promise();
            }   
        }
    });
}


async function deleteSchedulesFollows(scheduleIds) {
    const queries = scheduleIds.map(id => {
        const params = {
            TableName: followTableName,
            IndexName: gsiFollowers,
            ProjectionExpression: 'id',
            KeyConditionExpression: '#scheduleId = :id',
            ExpressionAttributeNames: {
                "#scheduleId": gsiFollowersKey
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
                        [followTableName] : operations.slice(start, end)
                    }
                };
                await dynamodb.batchWrite(params).promise();
            }   
        }
    });
}