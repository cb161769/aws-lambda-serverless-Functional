const { graphql, buildSchema } = require('graphql');
const {realtime} = require("./helpers/realtime");

const graphqlSchema = buildSchema(`
    type Query{
        realtimeData(since: Int!): [Reading]!
    }
    type Reading {
        timestamp: Int!
        reading: Int!
      }

`);
const helper = {
    realtimeData:realtime
};
module.exports.graphQlQuery = async(res) =>{
    try {
        const query = res;
        const response = await graphql(
            graphqlSchema,
            query,
            helper
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
        throw new Error(error);
    }
}