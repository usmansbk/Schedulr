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
  const {filter = {}, limit = 50, nextToken = null} = arguments;
  const {
    // location: {lat: latitude, lon: longitude},
    city,
    category,
    km: radius = 100,
  } = filter;

  try {
  } catch (error) {
    console.log('Error %>', error.message);
  }

  return {
    items: [],
    nextToken: null,
    total: 0,
  };
};
