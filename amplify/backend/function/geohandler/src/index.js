const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');

const ddb = new AWS.DynamoDB();
const config = new ddbGeo.GeoDataManagerConfiguration(
  ddb,
  process.env.STORAGE_GEOTABLE_NAME,
);

config.longitudeFirst = true;

const manager = new ddbGeo.GeoDataManager(config);

exports.handler = async (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  try {
    await manager
      .putPoint({
        RangeKeyValue: {S: '1234'},
        GeoPoint: {
          latitude: 51.51,
          longitude: -0.13,
        },
        PutItemInput: {
          Item: {
            id: {S: 'working'},
            country: {S: 'UK'},
            capital: {S: 'London'},
          },
        },
      })
      .promise();
    console.log('*** WORKING');
  } catch (error) {
    console.log('***', error.message);
  }

  return 'Successfully processed DynamoDB record';
};
