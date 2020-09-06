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
  console.log(JSON.stringify(event, null, 2));
  const {Records} = event;

  const putItems = [];

  Records.forEach((record) => {
    const {
      eventName,
      dynamodb: {NewImage},
    } = record;
    const {geo_point, isPublic, banner} = NewImage;
    const publicEvent = isPublic && isPublic.BOOL;
    if (publicEvent && banner && geo_point) {
      console.log(record);
      putItems.push(
        transform(record, {
          latitude: Number(geo_point.M.lat.N),
          longitude: Number(geo_point.M.lon.N),
        }),
      );
    }
  });

  for (let i = 0; i < putItems.length; i += BATCH_SIZE) {
    const batch = putItems.slice(i, i + BATCH_SIZE);
    try {
      await manager.batchWritePoints(batch).promise();
      console.log('BATCH WRITE SUCCESSFUL');
    } catch (error) {
      console.log('BATCH DELETE Error %>', error.message);
    }
  }

  return 'Successfully processed DynamoDB record';
};

function transform(record, GeoPoint) {
  const {
    dynamodb: {
      Keys: {id: RangeKeyValue},
      NewImage: Item,
    },
  } = record;
  return {
    RangeKeyValue,
    GeoPoint,
    PutItemInput: {
      Item,
    },
  };
}
