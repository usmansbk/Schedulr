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
  const {Records} = event;

  const putItems = [];
  const requestItems = [];

  Records.forEach((record) => {
    const {
      eventName,
      dynamodb: {NewImage},
    } = record;
    if (eventName === 'REMOVE') {
      requestItems.push(record);
    } else {
      const {geo_point, isPublic} = NewImage;
      const publicEvent = isPublic && isPublic.BOOL;
      if (
        publicEvent &&
        geo_point &&
        geo_point.M &&
        geo_point.M.lon &&
        geo_point.M.lat
      ) {
        putItems.push(
          transform(record, {
            latitude: Number(geo_point.M.lat.N),
            longitude: Number(geo_point.M.lon.N),
          }),
        );
      } else {
        // create or replace if no geo_point
        requestItems.push(record);
      }
    }
  });

  for (let i = 0; i < putItems.length; i += BATCH_SIZE) {
    const batch = putItems.slice(i, i + BATCH_SIZE);
    try {
      await manager.batchWritePoints(batch).promise();
      console.log('BATCH WRITE SUCCESSFUL');
    } catch (error) {
      console.log('Error %>', error.message);
    }
  }

  for (let i = 0; i < requestItems.length; i += BATCH_SIZE) {
    const batch = requestItems.slice(i, i + BATCH_SIZE).map((record) => {
      const {
        // eventName,
        dynamodb: {
          Keys: {id},
          // NewImage: Item,
        },
      } = record;
      // if (eventName === 'REMOVE') {
      return {
        DeleteRequest: {
          Key: {
            id,
          },
        },
      };
      // } else {
      //   return {
      //     PutRequest: {
      //       Item: {
      //         ...Item,
      //         _match: {
      //           // use for searching
      //           S: Item.title.S.toLowerCase(),
      //         },
      //       },
      //     },
      //   };
      // }
    });

    const RequestItems = {
      [process.env.STORAGE_GEOTABLE_NAME]: batch,
    };

    try {
      await ddb.batchWriteItem({RequestItems}).promise();
      console.log('BATCH REQUEST SUCCESSFUL');
    } catch (error) {
      console.log('Error %>', error.message);
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
      Item: {
        ...Item,
        _match: {
          // use for searching
          S: Item.title.S.toLowerCase(),
        },
      },
    },
  };
}
