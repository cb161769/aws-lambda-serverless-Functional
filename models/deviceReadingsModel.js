const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt, 
    GraphQLList
  } = require('graphql');
  const {dynamoDBConnection} = require("../connections/connections");
  const {config} = require("../connections/config/config");

var deviceReadingsModel = new GraphQLObjectType({
    name:'device',
    fields: function () {
        return {
            device_amps:{
                type: GraphQLInt
            },
            device_name:{
                type: GraphQLString

            },
            device_UserName:{
                type: GraphQLString
            },
            device_watts:{
                type: GraphQLInt
            },
            wifi_IP:{
                type: GraphQLInt
            },
            wifi_name:{
                type: GraphQLString
            },
            wifi_strength:{
                type: GraphQLInt
            }


        }
        
    }
});
var queryType = new GraphQLObjectType({
    name:'Query',
    fields: function () {
        return{
            device:{
                type: deviceReadingsModel,
                args:{
                    timeStamp:{
                        name:'timeStamp',
                        type: GraphQLFloat
                    }
                },
                resolve:  async  (root,params) => {
                    const deviceId = config.deviceName;
                    const data = await dynamoDBConnection.query({
                        TableName: config.dynamoBB.deviceReadings.name,
                        KeyConditionExpression: '#key = :key and #sortkey = :timestamp',
                        ScanIndexForward: true, // DESC order
                        ConsistentRead: false,
                        ExpressionAttributeNames:{
                            '#key': 'primarykey',
                            '#sortkey': 'sortkey',
                        },
                        ExpressionAttributeValues: {
                            ':key':  deviceId,
                            ':timestamp': params.timeStamp
                        },

                    }).promise();
                    if (data == null || data == undefined || !data || data.Count == 0) {
                        throw new Error('Error')
                    }
                    return data.Items[0].readings;

                    
                }
            }
        }
    }
});
module.exports = new GraphQLSchema({query:queryType});