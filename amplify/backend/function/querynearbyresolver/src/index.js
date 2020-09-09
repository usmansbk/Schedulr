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

const ddb = new AWS.DynamoDB();

exports.handler = async (event) => {
  const {arguments} = event;
  const {filter = {}, limit = 50, nextToken = null} = arguments;
  const {
    // location: {lat: latitude, lon: longitude},
    city,
    category,
    // km: radius = 100,
  } = filter;

  try {
    console.log('find events in', category, city);
  } catch (error) {
    console.log('Error %>', error.message);
  }

  return {
    items: [],
    nextToken: null,
    total: 0,
  };
};
