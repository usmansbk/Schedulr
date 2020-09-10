/* Amplify Params - DO NOT EDIT
	API_SCHDLR_EVENTTABLE_ARN
	API_SCHDLR_EVENTTABLE_NAME
	API_SCHDLR_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
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
    category,
    km: radius = 100,
  } = filter;

  try {
    const result = (
      await manager.queryRadius({
        RadiusInMeter: radius * 1000,
        CenterPoint: {
          latitude,
          longitude,
        },
      })
    )
      .map(AWS.DynamoDB.Converter.unmarshall)
      .filter((item) =>
        item.category
          .toLowerCase()
          .includes(category ? category.toLowerCase() : ''),
      );
    const start = nextToken ? Number(nextToken) : 0;
    const end = start + Number(limit);

    const items = result.slice(start, end);
    return {
      items,
      nextToken: end + 1,
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
