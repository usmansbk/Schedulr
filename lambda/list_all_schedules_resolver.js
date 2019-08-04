const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DDB_TABLE_NAME;
const tableIndex = process.env.DDB_TABLE_INDEX;
const BATCH_SIZE = 100;

exports.handler = async (event) => {
    const { user } = event;
    const createdBoards = await getCreatedBoards(user.id);
    const followingBoards = await getFollowingBoards(user.following);
    
    const items = [...createdBoards, ...followingBoards];
    const response = {
        items,
        nextToken: null
    };
    return response;
};

async function getCreatedBoards(id) {
    let result = [];
    const params = {
        TableName: tableName,
        IndexName: tableIndex,
        KeyConditionExpression: '#authorId = :id',
        ExpressionAttributeNames: {
            "#authorId": "authorId"
        },
        ExpressionAttributeValues: {
            ":id": id
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

async function getFollowingBoards(boardIds) {
    let result = [];
    if (boardIds && boardIds.length) {
        const Keys = boardIds.map(id => ({ id }));
        for (let start = 0; start <= boardIds.length; start += BATCH_SIZE) {
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
    return result;
}
