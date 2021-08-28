/**
 * 
 * @param {*} data DynamoDB DATA formatted
 * @param {*} columns desired columns  
 * @returns formatedCsv
 */
module.exports.convertToCvs = function(data,columns){
    const d3 = require('d3-dsv');
    if (columns.length ===0) {
        return d3.csvFormat(data);
        
    }
    return d3.csvFormat(data,columns);

}
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} array dynamoDbArray
 * @returns Array<any>
 */
module.exports.firFormatToCvs = function (array){

    const initialArray = [];
    try {
    
    for (let index = 0; index < array.length; index++) {
        var dataElement = array[index];
        initialArray.push(dataElement.readings);
        
    }
    return initialArray;

    } catch (error) {
        console.error(error);
    }
}
/**
 * @author Xavier Decupier 
 * @github 
 * @returns yesterday Date
 */
module.exports.getYesterdayDate = function(){
    const yesterday = new Date();
    yesterday.setHours(0);
    yesterday.setMinutes(0);
    yesterday.setSeconds(0);
    yesterday.setDate(yesterday.getDate() -1);

    const string = yesterday
    			.toISOString()
    			.substring(0,10)
    			.replace(/-/g, '');

    return {
    	dateObj: yesterday,
    	unixTimestamp: parseInt(yesterday.getTime() / 1000),
    	string: string,
    	year: string.substring(0,4),
    	month: string.substring(4,6),
    	day: string.substring(6,8)
    }
}
/**
 * @function getTodaysDate
 * @returns date
 * @author Xavier Ducupier
 * @gitHub
 */
module.exports.getTodaysDate = function(){
	const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const string = today
    			.toISOString()
    			.substring(0,10)
    			.replace(/-/g, '');

    return {
    	dateObj: today,
    	unixTimestamp: parseInt(today.getTime() / 1000),
    	string: string,
    	year: string.substring(0,4),
    	month: string.substring(4,6),
    	day: string.substring(6,8)
    }
};
/**
 * 
 * @param {*} minutes the required added minutes 
 * @returns 
 */
module.exports.getTodaysDateWithMoreMinutes = function(minutes){
    const today = new Date();
    const string = todayAddedMinutes
    			.toISOString()
    			.substring(0,10)
    			.replace(/-/g, '');

    return {
    	dateObj: today,
    	unixTimestamp: parseInt(today.getTime() / 1000),
    	string: string,
    	year: string.substring(0,4),
    	month: string.substring(4,6),
    	day: string.substring(6,8)
    }
}
/**
 * 
 * @param {*} fileName the  fileName
 * @param {*} content the Conent
 * @returns 
 */
module.exports.writeToS3 = async function (fileName,content){
    const {s3} = require('../connections/connections');
    const {config} = require('../connections/config/config');
    const util = require('util');
	const zlib = require('zlib');
	const gzip = util.promisify(zlib.gzip);

	const compressedBody = await gzip(content);
    return s3.putObject({
        Body: compressedBody,
        Bucket: config.S3.BucketName,
        Key: fileName + '.gz'
    }).promise();
};
/**
 * 
 * @param {*} day {Date}
 * @returns {Date}
 */
 module.exports.changeDates = function(day) {
    var dateOne = new Date();
    var dateTwo = new Date();
    dateOne.setMonth(dateOne.getMonth() - 4);
    let first = dateOne.setDate(day);

    let second = dateTwo.setDate(day);
   
    return {
        initialDate:Math.floor(first/1000),
        finalDate: Math.floor(second/1000)

    };
};
/**
 * @author Savjee
 * @param {*} tableName table's Name
 * @param {*} object  object that needs to be put in
 * @returns Promise
 */
 module.exports.writeToDynamoDB = function(tableName, object){
	const { dynamoDBConnection } = require('../connections/connections');

	return dynamoDBConnection.put({
        TableName: tableName,
        Item: object
    }).promise();
}
