const AWS = require("aws-sdk");
module.exports.dynamoDBConnection = new AWS.DynamoDB.DocumentClient();
module.exports.s3 = new AWS.S3();
module.exports.cloudWatch = new AWS.CloudWatchLogs();
module.exports.sns = new AWS.SNS();
module.exports.ses = new AWS.SES();
