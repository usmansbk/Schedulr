const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

console.log('Loading function');

const BATCH_SIZE = Number(process.env.BATCH_SIZE);
const DELTA_TABLE = process.env.DELTA_TABLE;
const TTL = Number(process.env.TTL);

exports.handler = async (event) => {
    const { Records } = event;
    for (let i = 0; i < BATCH_SIZE; i += BATCH_SIZE) {
        const records = processRecords(Records.slice(i, i + BATCH_SIZE));
        if (records.length) await batchWriteRecords(records);
    }
    return `Successfully processed ${event.Records.length} records.`;
};

function processRecords(records) {
    let result = [];
    for (let record of records) {
        const {
            ApproximateCreationDateTime,
            Keys,
            NewImage,
            OldImage
        } = record.dynamodb;
        const eventName = record.eventName;
        const keys = unmarshall(Keys);
        const newImage = unmarshall(NewImage);
        const oldImage = unmarshall(OldImage);
        console.log(eventName);
        if (eventName === 'INSERT') {
            if (newImage) {
                const Item = {
                    id: keys.id,
                    followUserId: newImage.followUserId,
                    followScheduleId: newImage.followScheduleId,
                    oldImage,
                    newImage,
                    eventName,
                    timestamp: ApproximateCreationDateTime,
                    expDate: ApproximateCreationDateTime + TTL
                };
                result.push({
                    PutRequest: {
                        Item
                    }
                });
            }
        }
    }
    return result;
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