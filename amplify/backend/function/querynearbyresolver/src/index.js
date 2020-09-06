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
  const {arguments} = event;
  const {filter = {}, limit = 50, nextToken} = arguments;
  const {
    location: {lat: latitude, lon: longitude},
    km: radius = 100,
  } = filter;

  try {
    const result = await manager.queryRadius({
      RadiusInMeter: radius * 1000,
      CenterPoint: {
        latitude,
        longitude,
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
