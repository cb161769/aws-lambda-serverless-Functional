const {getReadingsFromDynamoDBTableSince} = require("../../../api/helpers/database/dynamoDB");
const {config} = require("../../../connections/config/config");

module.exports.realtime = async (timestamp) =>{
    // const lowestTimestampAllowed = (new Date() / 1000) - 24 * 60 * 60;
    // if (timestamp && timestamp < lowestTimestampAllowed) {
    //     throw new Error('This endpoint can only return data from the last 24 hours');
    // }

    // // If no timestamp was given, return the data from the last minute
    // if (!timestamp) {
    //     console.log('No timestamp provided, going default');
    //     timestamp = (new Date() / 1000) - 60;
    // }
    try {
        return await getReadingsFromDynamoDBTableSince(config.deviceName, timestamp);
        
    } catch (error) {
        throw new Error(error);
    }
   
};
