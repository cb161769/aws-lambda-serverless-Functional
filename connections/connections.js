const AWS = require("aws-sdk");
module.exports.dynamoDBConnection = new AWS.DynamoDB.DocumentClient();
module.exports.s3 = new AWS.S3();
module.exports.cloudWatch = new AWS.CloudWatchLogs();
