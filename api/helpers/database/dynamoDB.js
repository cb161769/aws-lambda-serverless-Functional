/**
 * this method gets the reading from a DynamoDBTable since the given timeStamp {timesTamp}
 * @param {*} deviceId 
 * @param {*} timeStamp 
 */
module.exports.getReadingsFromDynamoDBTableSince = async (deviceId,timeStamp) =>{
    const {dynamoDBConnection} = require("../../../connections/connections");
    const {config} = require("../../../connections/config/config");
    try {
        const data = dynamoDBConnection.query({
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
            ':timestamp': timeStamp
        },

        }).promise();
        return (await data).Items;
        
    } catch (error) {
        console.log(error);
        
    }
}
/**
 * this functions puts date to DynamoDB table
 * @param {*} TableName the table's name
 * @param {*} object  the Table's Configuration
 */
module.exports.putToDynamoDBTable = async (TableName,object) =>{
    const {dynamoDBConnection} = require("../../../connections/connections");
    try {
        const output = await dynamoDBConnection.put({
            TableName: TableName,
            Item: object
        }).promise();
        return output;
        
    } catch (error) {
        console.log(error);
    }
}
/**
 * this methods gets the usage Data from a DynamoDB Table
 * @param {*} deviceId device Identifier
 * @param {*} startDate  start Date
 * @param {*} endDate end Date
 */

module.exports.getUsageDataFromDynamodbTable = async (deviceId,startDate,endDate) =>{
    try {
        const {dynamoDBConnection} = require("../../../connections/connections");
        const {config} = require("../../../connections/config/config");
        const data = await dynamoDBConnection.query({
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
        ScanIndexForward: true,
        ConsistentRead:false,
        ExpressionAttributeNames:{
            '#key': 'primarykey',
            '#sortkey': 'sortkey',

        },
        ExpressionAttributeValues: {
            ':key': 'reading-' + deviceId,
            ':start': startDate,
            ':end': endDate
        },

        }).promise();
        return data.Items;
        
    } catch (error) {
        console.log(error);
        
    }

}

