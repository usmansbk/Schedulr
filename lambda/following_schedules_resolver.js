const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DDB_TABLE_NAME;
const BATCH_SIZE = 100;

exports.handler = async (event) => {
    const { user, currentUser } = event;
    const items = await getFollowingBoards(user.following);
    const filteredItems = items.filter(board => (
        (board.authorId === currentUser) || board.isPublic ||
        (board.followers && board.followers.includes(currentUser))
    ));
    
    const response = {
        items: filteredItems,
        nextToken: null
    };
    return response;
};

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
