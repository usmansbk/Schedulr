const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DDB_EVENTS_TABLE_NAME;
const authorId_createdAt_index = process.env.DDB_AUTHORID_CREATEDAT_INDEX;
const boardId_id_index = process.env.DDB_BOARDID_ID_INDEX;
const BATCH_SIZE = 100;

exports.handler = async (event) => {
    const { user, filter } = event;
    const createdEvents = await getCreatedEvents(user.id, filter);
    const followingBoardsEvents = await getFollowingBoardsEvents(user.following, filter);
    const starredEvents = await getStarredEvents(user.starred, followingBoardsEvents, createdEvents);
    
    const items = [...createdEvents, ...followingBoardsEvents, ...starredEvents];
    const response = {
        items,
        nextToken: null
    };
    return response;
};

async function getStarredEvents(ids, following, created) {
    let result = [];
    if (ids && ids.length) {
        const others = following.map(event => event.id)
            .concat(created.map(event => event.id));
        const target = ids.filter(id => !others.includes(id));
        if (target.length) {
            const Keys = target.map(id => ({ id }));
            for (let start = 0; start <= target.length; start += BATCH_SIZE) {
                const end = start + BATCH_SIZE;
                const params = {
                    RequestItems: {
                        [tableName] : {
                            Keys: Keys.slice(start, end)
                        }
                    }
                };
                const { Responses } = await dynamodb.batchGet(params).promise();
                const tableResponse = Responses[tableName];
                result = result.concat(tableResponse);
            }
        }
    }
    return result;
}

async function getCreatedEvents(id, filter) {
    let result = [];
    const FilterExpression = filter ? filter.expression : undefined;
    const filterExpNames = filter ? JSON.parse(filter.expressionNames) : {};
    const filterExpValues = filter ? JSON.parse(filter.expressionValues) : {};
    const params = {
        TableName: tableName,
        IndexName: authorId_createdAt_index,
        KeyConditionExpression: '#authorId = :id',
        ExpressionAttributeNames: {
            "#authorId": "authorId",
            ...filterExpNames
        },
        ExpressionAttributeValues: {
            ":id": id,
            ...filterExpValues
        },
        FilterExpression
    };
    const { LastEvaluatedKey, Items } = await dynamodb.query(params).promise();
    result = result.concat(Items);
    let ExclusiveStartKey = LastEvaluatedKey;
    while (ExclusiveStartKey) {
        const moreData = await dynamodb.query({
            ...params,
            ExclusiveStartKey
        }).promise();
        ExclusiveStartKey = moreData.LastEvaluatedKey;
        result = result.concat(moreData.Items);
    }
    return result;
}

async function getBoardEvents(id, filter) {
    let result = [];
    const { 
        filterExpNames,
        filterExpValues,
        FilterExpression
    } = filter;
    
    const params = {
        TableName: tableName,
        IndexName: boardId_id_index,
        KeyConditionExpression: '#boardId = :id',
        FilterExpression,
        ExpressionAttributeNames: {
            "#boardId": "boardId",
            ...filterExpNames
        },
        ExpressionAttributeValues: {
            ":id": id,
            ...filterExpValues
        }
    };
    const { LastEvaluatedKey, Items } = await dynamodb.query(params).promise();
    result = result.concat(Items);
    let ExclusiveStartKey = LastEvaluatedKey;
    while (ExclusiveStartKey) {
        const moreData = await dynamodb.query({
            ...params,
            ExclusiveStartKey
        }).promise();
        ExclusiveStartKey = moreData.LastEvaluatedKey;
        result = result.concat(moreData.Items);
    }
    return result;
}

async function getFollowingBoardsEvents(boardIds, filter) {
    if (!(boardIds && boardIds.length)) return [];
    
    const FilterExpression = filter ? filter.expression : undefined;
    const filterExpNames = filter ? JSON.parse(filter.expressionNames) : {};
    const filterExpValues = filter ? JSON.parse(filter.expressionValues) : {};
    
    const promises = boardIds.map(id => getBoardEvents(id,  {
                FilterExpression, filterExpNames, filterExpValues
            }));
    return await Promise.all(promises)
        .then(result => {
            return result.reduce((accumulator, currentValue) => [...accumulator, ...currentValue], []);
        });
    
}
