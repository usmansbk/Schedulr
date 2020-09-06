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
  const {arguments} = event;
  const {filter = {}, limit = 50, nextToken = 0} = arguments;
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
    const start = nextToken ? Number(nextToken) : 0;
    const end = start + Number(limit);

    const paginated = result.slice(start, end);
    return {
      items: paginated.map(AWS.DynamoDB.Converter.unmarshall),
      nextToken: start + paginated.length + 1,
      total: result.length,
    };
  } catch (error) {
    console.log('Error %>', error.message);
  }

  return {
    items: [],
    nextToken: null,
    total: 0,
  };
};
