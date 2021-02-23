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
                        return data.Items[0].readings;
                        
                    }
                    else{
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
                        return data.Items[0].CT1;
                        
                    }
                    else{
                        return  [{device:'Not connected in realtime',error:400}];
                    }
                }
            }
            // week:{
            //     args:{
            //         start:{
            //             name:'start',
            //             type: GraphQLFloat

            //         },
            //         end:{
            //             name:'end',
            //             type: GraphQLFloat

            //         }
            //     },
            //     resolve: async (root,params) => {
            //         const params = {
            //             TableName: config.dynamoBB.deviceReadings.name,
            //             KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
            //             ScanIndexForward:false,
            //             ConsistentRead:false,
            //             ExpressionAttributeNames:{
            //                 '#key':'primarykey',
            //                 '#sortkey':'sortkey'
                    
            //             },

            //         }
            //     }
            // }
        }
    }
});
module.exports = new GraphQLSchema({query:queryType});