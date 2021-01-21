const AWS = require("aws-sdk");
module.exports.dynamoDBConnection = new AWS.DynamoDB.DocumentClient();

