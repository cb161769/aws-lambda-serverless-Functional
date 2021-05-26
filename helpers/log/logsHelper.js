const winston = require('winston'),
WinstonCloudWatch = require('winston-cloudwatch');
const { config } = require('../../connections/config/config');
const AWS = require('aws-sdk');
const logger = new winston.createLogger({
    format: winston.format.json(),
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
            colorize: true,
        })
   ]
});
AWS.config.update({
    region: 'us-west-2',
  });
const cloudwatchConfig = {
    logGroupName: config.LogGroups.Database.LogGroupName,
    logStreamName: `aws-serverles-api-${new Date().toISOString()}`,
    cloudWatchLogs: new   AWS.CloudWatchLogs(),
    messageFormatter: ({ level, message, additionalInfo }) =>    `[${level}] : ${message} \nInformacion Adicional: ${JSON.stringify(additionalInfo)}}`
}
    logger.add(new WinstonCloudWatch(cloudwatchConfig))

module.exports = logger;