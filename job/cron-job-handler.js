const {dynamoDBConnection} = require('../connections/connections');
const {config} = require('../connections/config/config');
const {getYesterdayDate,getTodaysDate, writeToS3,firFormatToCvs,convertToCvs} = require('../functions/generalFunctions');
const deviceName = config.deviceName;
const logger = require('../helpers/log/logsHelper')
/**
 * @function fetchYesterdaysData
 * @returns 
 */
async function fetchYesterdaysData(){
    try{
        const startRange = getYesterdayDate().unixTimestamp;
        const endRange = getTodaysDate().unixTimestamp;



        const data = await dynamoDBConnection.query({
            TableName : config.dynamoBB.deviceReadings.name,
            KeyConditionExpression: '#key = :key and #sortKey BETWEEN :start AND :end',
            ScanIndexForward: true, // DESC order
            ConsistentRead: false,
            ExpressionAttributeNames:{
                '#key': 'primarykey',
                '#sortKey': 'sortkey',
            },
            ExpressionAttributeValues: {
                ':key':  config.deviceName,
                ':start': startRange,
                ':end': endRange,
            },
        }).promise();
        logger.log('info', `Requesting [fetchYesterdaysData]`, {tags: 'Method', additionalInfo: {operation: 'fetchYesterdaysData',databaseOperation:'GET', table: config.dynamoBB.deviceReadings.name }});

        return data;
    }catch(e){
        logger.log('error', `Requesting [fetchYesterdaysData]`, {tags: 'Method', additionalInfo: {operation: 'fetchYesterdaysData',databaseOperation:'GET',error:e, table: config.dynamoBB.deviceReadings.name }});

        console.log('Error');
        console.log(e);
        return { Items: [] };
    }
}
/**
 * 
 */
module.exports.handler = async(event, context, callback) => {
    try {
        const data = await fetchYesterdaysData();
        const filteredData = firFormatToCvs(data);
        const csv = convertToCvs(filteredData,[]);
        const time = getYesterdayDate();
        logger.log('info', `Requesting [cron-job]`, {tags: 'cron-job', additionalInfo: {operation: 'cron-job-handler', table: config.dynamoBB.deviceReadings.name }});

        // Write to S3
        await writeToS3(`lecturas/${deviceName}/${time.year}/${time.month}/${time.string}.csv`, csv);
        
        // Calculate the kWh consumed & write it to DynamoDB
    } catch (error) {
        logger.log('error', `Requesting [cron-job]`, {tags: 'cron-job', additionalInfo: {operation: 'cron-job-handler',error:error, table: config.dynamoBB.deviceReadings.name }});
    }
};