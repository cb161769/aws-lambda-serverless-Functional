const {getUsageDataFromDynamodbTable} = require("../../../helpers/dynamoDB/dynamoDBhelpers");
const {config} = require('../../../connections/config/config');

module.exports.deviceUsageData = async ({startDate,endDate}) =>{

    const data = await getUsageDataFromDynamodbTable(config.deviceName,
        startDate,endDate);
        return data.map(el => {
            return {
              timestamp: el.sortkey,
              dayUse: el.usage.day,
              nightUse: el.usage.night,
            }
        });

}