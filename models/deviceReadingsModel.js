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
  const logger = require('../helpers/log/logsHelper');
  const {dynamoDBConnection} = require("../connections/connections");
  const {config} = require("../connections/config/config");

  /**
   * 
   */
var deviceReadingsModel = new GraphQLObjectType({
    name:'device',
    fields: function () {
        return {
            device_amps:{
                type: GraphQLFloat
            },
            device_name:{
                type: GraphQLString

            },
            device_UserName:{
                type: GraphQLString
            },
            device_watts:{
                type: GraphQLFloat
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
var Ct1ReadingsModel = new GraphQLObjectType({
    name:'CT1',
    fields: function(){
        return{
            CT1_Amps:{
                type: GraphQLFloat
            },
            CT1_Watts:{
                type: GraphQLFloat
            },
            CT1_Status:{
                type: GraphQLString
            },
            Name:{
                type: GraphQLString
            }
        }
    }
})
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
                        KeyConditionExpression: '#key = :key and #sortkey <= :timestamp',
                        ScanIndexForward: false, // DESC order
                        ConsistentRead: false,
                        Limit:1,
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
                        return [{error:400}];
                    }
                    let date = data.Items[0].sortkey;
                    let firstValidationDate = Math.floor(Date.now()/1000) -50;
                    let secondValidationDate = Math.floor(Date.now()/1000) + 50; 
                    if ((date >= firstValidationDate  && date <= secondValidationDate) ) {
                        logger.log('info', `Requesting [GraphQLObjectType]`, {tags: 'graphQl', additionalInfo: {operation: 'Query',function:'device' }});
                        return data.Items[0].readings;
                        
                    }
                    else{
                        logger.log('info', `Requesting [GraphQLObjectType]`, {tags: 'graphQl', additionalInfo: {operation: 'Query',function:'device' }});

                        return  [{device:'Not connected in realtime',error:400}];
                    }
                    
                    
                }
            },
            Ct1_readings:{
                type:Ct1ReadingsModel,
                args:{
                    timeStamp:{
                        name:'timeStamp',
                        type: GraphQLFloat
                    }
                },
                resolve: async  (root,params) => {
                    const deviceId = config.deviceName;
                    const data = await dynamoDBConnection.query({
                        TableName: config.dynamoBB.deviceReadings.name,
                        KeyConditionExpression: '#key = :key and #sortkey <= :timestamp',
                        ScanIndexForward: false, // DESC order
                        ConsistentRead: false,
                        Limit:1,
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
                        return [{error:400}];
                    }
                    let date = data.Items[0].sortkey;
                    let firstValidationDate = Math.floor(Date.now()/1000) -50;
                    let secondValidationDate = Math.floor(Date.now()/1000) + 50; 
                    if ((date >= firstValidationDate  && date <= secondValidationDate) ) {
                        logger.log('info', `Requesting [GraphQLObjectType]`, {tags: 'graphQl', additionalInfo: {operation: 'Query',function:'Ct1_readings' }});

                        return data.Items[0].Relays[0];
                        
                    }
                    else{
                        logger.log('info', `Requesting [GraphQLObjectType]`, {tags: 'graphQl', additionalInfo: {operation: 'Query',function:'Ct1_readings' }});
                        return  [{device:'Not connected in realtime',error:400}];
                       

                        // return data.Items[0].Relays[0];
                    }
                }
            }
        }
    }
});
module.exports = new GraphQLSchema({query:queryType});