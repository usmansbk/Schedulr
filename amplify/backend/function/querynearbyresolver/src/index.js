/* Amplify Params - DO NOT EDIT
	STORAGE_GEOTABLE_ARN
	STORAGE_GEOTABLE_NAME
Amplify Params - DO NOT EDIT */
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
  console.log(JSON.stringify(event, null, 2));
  try {
    const result = await manager.queryRadius({
      RadiusInMeter: 1000,
      CenterPoint: {
        latitude: 52.22573,
        longitude: 0.149593,
      },
    });
    console.log(result);
  } catch (error) {
    console.log('Error %>', error.message);
  }
  const response = {
    items: [],
    nextToken: null,
    total: 0,
  };
  return response;
};
