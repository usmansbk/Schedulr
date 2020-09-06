const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');

const ddb = new AWS.DynamoDB();
const config = new ddbGeo.GeoDataManagerConfiguration(
  ddb,
  process.env.STORAGE_GEOTABLE_NAME,
);

config.longitudeFirst = true;

const manager = new ddbGeo.GeoDataManager(config);

const BATCH_SIZE = 25;

exports.handler = async (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const {Records} = event;
  const data = Records.map(transform);
  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);
    try {
      await manager.batchWritePoints(batch).promise();
      console.log('BATCH WRITE SUCCESSFUL');
    } catch (error) {
      console.log('Error %>', error.message);
    }
  }

  return 'Successfully processed DynamoDB record';
};

function transform(record) {
  const {
    dynamodb: {NewImage: Item},
  } = record;
  console.log('Transform', JSON.stringify(Item));
  return {
    RangeKeyValue: {S: '1234'},
    GeoPoint: {
      latitude: 51.51,
      longitude: -0.13,
    },
    PutItemInput: {
      Item,
    },
  };
}
