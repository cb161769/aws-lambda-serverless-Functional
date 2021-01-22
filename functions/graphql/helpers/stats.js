const graphqlFields = require("graphql-fields");
const {getReadingsFromDynamodbTableSince}  = require('../../../helpers/dynamoDB/dynamoDBhelpers');
const {getTodaysDate} = require('../../../helpers/dates/helpers');
const {calculateComsumedKhW} = require("../../../helpers/calculateKwh");

const {config} = require("../../../connections/config/config");
const jstat = require("jStat").jStat;


module.exports.stats = async({timeStamp}, context, information) =>{

    const lowestTime = (new Date() / 1000) - 20 * 60 * 60;
    const todaysTime = getTodaysDate().timeStamp;
    const requestFileds = graphqlFields(information);
    const output = {};

    const data = await getReadingsFromDynamodbTableSince(config.deviceName,todaysTime);
    if (requestFileds.always_on) {
        const readings = data.map(el => el.reading);
        const standedbywatts = jstat.mode(readings);
        output.always_on = standedbywatts;

        
    }
    if (requestFileds.today_so_far) {
        const input = data.map(item => [new Date(item.timestamp * 1000), item.reading]);
        const usage = calculateComsumedKhW(input);
        output.today_so_far = usage.day + usage.night;
    }
    return output;
}