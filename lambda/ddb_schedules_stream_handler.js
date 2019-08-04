const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const client = require("elasticsearch").Client({
    hosts: [ process.env.ES_DOMAIN ],
    connectionClass: require('http-aws-es')
});
const mappings = require('./schedule_mappings');
const settings = require('./schedule_settings');

const dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

const esIndexName = process.env.ES_INDEX_NAME;
const tableName = process.env.DDB_EVENTS_TABLE_NAME;
const eventsIndexName = process.env.DDB_EVENTS_INDEX;
const BATCH_SIZE = 25;

exports.handler = async (event, context) => {
    // await client.indices.delete({
    //     index: "_all"
    // })
    // console.log("Delete all indices")
    return await initIndex()
        .catch(error => {
            console.error('elasticsearch cluster is down!', error);
            throw error;
        })
        .then(async () => {
            const records = event.Records;
            const [ bulk, boardIds ] = processRecords(records);
            
            if (bulk.length) await handleBulkOperation(bulk);
            if (boardIds.length) await deleteBoardsEvents(boardIds);
        })
        .then(() => `Successfully processed ${event.Records.length} records.`);
};

function deleteBoardsEvents(boardIds) {
    const queries = boardIds.map(id => {
        const params = {
            TableName: tableName,
            IndexName: eventsIndexName,
            ProjectionExpression: 'id',
            KeyConditionExpression: '#boardId = :id',
            ExpressionAttributeNames: {
                "#boardId": "boardId"
            },
            ExpressionAttributeValues: {
                ":id": {
                    S: id
                }
            }
        };
        return dynamodb.query(params).promise()
            .then(async (data) => {
                let Items = [...data.Items];
                let LastEvaluatedKey = data.LastEvaluatedKey;

                while (LastEvaluatedKey) {
                    const response = await dynamodb.query({
                        ...params,
                        ExclusiveStartKey: LastEvaluatedKey
                    }).promise();
                    if (response) {
                        LastEvaluatedKey = response.LastEvaluatedKey;
                        Items = Items.concat(response.Items);    
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
                        [tableName] : operations.slice(start, end)
                    }
                };
                await dynamodb.batchWriteItem(params).promise();
            }
        }
    });
}

function handleBulkOperation(body) {
    return client.bulk({
        index: esIndexName,
        type: '_doc',
        body
    }).then(() =>{
        // console.log('bulk operation successful')
    })
    .catch(error => console.error('bulk operation failed', error));
}

function parseItem(image) {
    return AWS.DynamoDB.Converter.unmarshall(image);
}

function processRecords(records) {
    const boardIds = [];
    let bulk = [];
    
    for (let record of records) {
        switch (record.eventName) {
            case 'INSERT': case 'MODIFY': {
                const doc = parseItem(record.dynamodb.NewImage);
                const op = {
                    index: {
                        _id: doc.id
                    }
                };
                bulk.push(op);
                bulk.push(doc);
                break;
            }
            case 'REMOVE': {
                const item = parseItem(record.dynamodb.Keys);
                const id = item.id;
                boardIds.push(id);
                const op = {
                    delete: {
                        _id: id,
                    }
                };
                bulk.push(op);
                break;
            }
            default:
                break;
        }
    }
    
    return [ bulk, boardIds ];
}


function initIndex() {
    return indexExists().then(async (exists) => {
        if (!exists) {
            console.log('created new index');  
            return await client.indices.create({
                index: esIndexName,
                body: {
                    mappings,
                    settings
                }
            });         
        } else {
            // console.log('index exists');
        }
    });
}

function indexExists() {
    return client.indices.exists({
        index: esIndexName
    });
}