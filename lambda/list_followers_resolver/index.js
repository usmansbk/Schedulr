const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DDB_TABLE_NAME;
const BATCH_SIZE = 100;

exports.handler = async (event) => {
    const { board, limit, nextToken } = event;
    const response = await getBoardFollowers(board.followers, nextToken, limit);
    return response;
};

async function getBoardFollowers(followers, token, limit=BATCH_SIZE) {
    const from = token ? Number(token) : 0;
    const items = [];
    if (followers && followers.length) {
        const Keys = followers.map(id => ({ id }));
        for (let start = from; start <= followers.length; start += limit) {
            const end = start + limit;
            const params = {
                RequestItems: {
                    [tableName] : {
                        Keys: Keys.slice(start, end)
                    }
                }
            };
            const { Responses } = await dynamodb.batchGet(params).promise();
            const tableResponse = Responses[tableName];
            items.push(...tableResponse);
        }
    }
    const  nextToken = (items.length === limit) ? String(from + limit) : null;
    return {
        items,
        nextToken
    };
}