const logger = require("../helpers/log/logsHelper");
const { config } = require("../connections/config/config");
const { changeDates } = require("../functions/generalFunctions");
const { dynamoDBConnection } = require("../connections/connections");
const {
  AutomateConsumption,
} = require("../helpers/automation/atuomationHelper");
/**
 * @function fetchTodaysData
 * @author Claudio Raul Brito Mercedes
 * @returns data
 */
async function fetchTodaysData() {
  try {
    const dates = changeDates(15, 15);
    const data = await dynamoDBConnection
      .query({
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortKey BETWEEN :start AND :end",
        ScanIndexForward: true, // DESC order
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortKey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": dates.initialDate,
          ":end": dates.finalDate,
        },
      })
      .promise();
    logger.log("info", `Requesting [fetchTodaysData]`, {
      tags: "Method",
      additionalInfo: {
        operation: "fetchYesterdaysData",
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });

    return data.Items;
  } catch (error) {
    logger.log("error", `Requesting [fetchTodaysData]`, {
      tags: "Method",
      additionalInfo: {
        operation: "fetchYesterdaysData",
        databaseOperation: "GET",
        error: e,
        table: config.dynamoBB.deviceReadings.name,
      },
    });
  }
}
async function fetchConfigurationData() {
  const params = {
    TableName: config.dynamoBB.relaysConfiguration.name,
  };
  const data = await dynamoDBConnection.scan(params).promise();
  return data.Items;
}
module.exports.handler = async () => {
  try {
    const data = await fetchTodaysData();
    const configuration =await fetchConfigurationData();
    const automation = await AutomateConsumption(data, configuration);
    console.log(automation);
    logger.log("info", `Requesting [automation-cron-job]`, {
      tags: "automation-cron-job",
      additionalInfo: {
        operation: "cron-job-handler",
        table: config.dynamoBB.deviceReadings.name,
      },
    });
  } catch (error) {
    logger.log("error", `Requesting [automation-cron-job]`, {
      tags: "automation-cron-job",
      additionalInfo: {
        operation: "cron-job-handler",
        error: error,
        table: config.dynamoBB.deviceReadings.name,
      },
    });
  }
};
