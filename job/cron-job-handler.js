const {dynamoDBConnection} = require('../connections/connections');
const {config} = require('../connections/config/config');
const {getYesterdayDate,getTodaysDate, writeToS3,firFormatToCvs,convertToCvs} = require('../functions/generalFunctions');
const deviceName = config.deviceName;
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

        return data;
    }catch(e){
        // pendig logs de cloudwatch
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
    
        // Write to S3
        await writeToS3(`lecturas/${deviceName}/${time.year}/${time.month}/${time.string}.csv`, csv);
    
        // Calculate the kWh consumed & write it to DynamoDB
    } catch (error) {
        console.error('problem')
    }
};