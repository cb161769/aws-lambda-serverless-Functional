/**
 * 
 * @param {*} deviceId 
 * @param {*} timestamp 
 */
module.exports.getReadingsFromDynamodbTableSince = async (deviceId,timestamp) =>{
    const {dynamoDBConnection} = require("../../connections");
    const {config} = require("./../../connections/config");
    try {
        const data = await dynamoDBConnection.query({
            TableName: config.dynamoBB.deviceReadings.name,
            KeyConditionExpression: '#key = :key and #sortkey > :timestamp',
            ScanIndexForward: true, // DESC order
           ConsistentRead: false,
           ExpressionAttributeNames:{
            '#key': 'primarykey',
            '#sortkey': 'sortkey',
        },
        ExpressionAttributeValues: {
            ':key': 'reading-' + deviceId,
            ':timestamp': timestamp
        },
        }).promise();
    
        return module.exports.convertDynamoReadingsToJsonFormat(data);
        
    } catch (error) {
        console.log(error);
        
    }
    


};
/**
 * this method converts DynamoDB readings to Json
 * @param {*} data  dynamoDB readings
 */
module.exports.convertDynamoReadingsToJsonFormat = async(data) =>{
    try {
        const jsonOutPut = [];
        for(const entry of data.Items){
        const timestamp = entry.sortKey;
        const deviceReadings = entry.readings;
        let time = entry.sortKey - readings.length -2;
        for(const reading of deviceReadings){
            jsonOutPut.push({
                timestamp:time,
                reading: deviceReadings
            });
            time++;
        }

    }
    return jsonOutPut;
        
    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports.writeToDynamoDBTable = async (tableName,object) =>{
    const {dynamoDBConnection} = require("../../connections");
    try {
        const output = await dynamoDBConnection.put({
            TableName: tableName,
            Item: object
        }).promise();
        return output;
        
    } catch (error) {
        console.log(error);
    }
}
module.exports.getUsageDataFromDynamodbTable = async (deviceId,startDate,endDate) =>{

}