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

  var snsNotificationModel = new GraphQLObjectType({
      name:'sns',
      fields: function () {
          return{
              
          }
      }
  })