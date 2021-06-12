const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt, 
    GraphQLList,
    GraphQLBoolean
  } = require('graphql');
  const logger = require('../helpers/log/logsHelper');
  const {dynamoDBConnection} = require("../connections/connections");
  const {config} = require("../connections/config/config");
  const device  = {
      isConnection:true,
      connectionName:'',
      turnOff:true,
      isDevice:true,
      deviceName:''
  };
  var snsNotificationModel = new GraphQLObjectType({
      name:'sns',
      fields: function () {
          return{
            isConnection:{
                type: GraphQLBoolean
            },
            connectionName:{
                type: GraphQLString
            },
            turnOff:{
                type: GraphQLBoolean
            },
            isDevice:{
                type: GraphQLBoolean
            },
            deviceName:{
                type: GraphQLString
            }
          }
      }
  });
  var query = new GraphQLObjectType({
      name:'query',
      fields: function () {
          return {
              deviceId:{
                  type: snsNotificationModel,
                  args:{
                        deviceName:{
                            name: 'deviceId',
                            type: GraphQLString
                        }
                  },
                  resolve: async (root,params) =>{
                      const deviceId = config.deviceName;
                      const data = await dynamoDBConnection.query({
                        TableName: config.dynamoBB.deviceConnection.name,
                        KeyConditionExpression: '#user = :userName',
                        ScanIndexForward: false, // DESC order
                        ConsistentRead: false,
                        Limit:1,
                        ExpressionAttributeNames:{ 
                            "#user":"deviceId"
                          },
                          ExpressionAttributeValues:{
                            ":userName":deviceId
                          },

                    }).promise();
                    if (data == null || data == undefined || !data || data.Count == 0 ) {
                        return [{error:400}];
                    }
                    logger.log('info', `Requesting [GraphQLObjectType]`, {tags: 'graphQl', additionalInfo: {operation: 'query',function:'deviceId' }});
                    return data.Items[0];

                  }
              }
          }
      }
  });
  module.exports = new GraphQLSchema({query:query});