const graphqlFields = require("graphql-fields");
const {getReadingsFromDynamoDBTableSince} = require("../../../api/helpers/database/dynamoDB");
const {getTodaysDate } = require("../../helpers/dates/helpers");
const {calculateConsumedKhW} = require("../../../api/helpers/calculation/calculateKwh");
const jstat = require("jStat").jStat;
const {config} = require("../../../connections/config/config");

// TODO : still in progress;
module.exports.stats = async(timeStamp,context,information) =>{
    const lowestTime = (new Date() / 1000) - 20 * 60 * 60;
};