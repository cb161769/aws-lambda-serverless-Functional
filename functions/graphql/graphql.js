const { graphql, buildSchema } = require('graphql');
const {realtimeData} = require('./helpers/realtime');
const {deviceUsageData} = require("./helpers/usageData");
const {stats} = require("./helpers/stats");

const graphqlSchema = buildSchema(`
    type Query{
        deviceUsageData(startDate: Int!, endDate: Int!): [DailySummary]!
        
        stats: Stats!

        realtimeData(since: Int!): [Reading]!

        readings(startDate: Int!, endDate: Int!): [Reading]!

    }
    type Stats{
        always_on: Float
        today_so_far: Float   
    }

    type Reading {
        timestamp: Int!
        reading: Int!
      }
    
      type DailySummary{
        timestamp: Int!
        dayUse: Float!
        nightUse: Float!
      }
`);

const helpers = {
    deviceUsageData: deviceUsageData,
    realtimeData:realtimeData,
    stats:stats
};

module.exports.graphQlQuery = async (event,context,callback) =>{
    try {
        const query = event.body;
        const response = await graphql(
            graphqlSchema,
            query,
            helpers
        );
        return {
            status:200,
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body : JSON.stringify(response),
        }
        
    } catch (error) {
        return {
            status:400,
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body : JSON.stringify(error),
        }
        
    }
    
};