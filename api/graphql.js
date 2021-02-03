  
const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat, 
  } = require('graphql');
  const {dynamoDBConnection} = require("../connections/connections");
  const {config} = require("../connections/config/config");
  const dynamoDBPromise = foo => new Promise((resolve,reject) =>{
      foo((error,result) =>{
          if (error) {
              reject(error);
          } else {
              resolve(result);
          }
      });
  });

  const getGreeting =  (deviceId,timeStamp) => dynamoDBPromise(callback =>


    

    // dynamoDBConnection.get({
    //   TableName: config.dynamoBB.deviceReadings.name,
    //   Key: { primarykey },
    // }, callback))
    // .then((result) => {
    //   if (!result.Item) {
    //     return firstName;
    //   }
    //   return result;
    // })
    dynamoDBConnection.query({
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
            ':timestamp': parseInt(timeStamp)
        },
    },callback)).then((result) =>{
        if (result.Items[0].readings === undefined || result.Items[0].readings == null || result.Items == undefined) {

            return JSON.stringify({data:'NO DATA'});
            
        }
        else{
            return  result.Items[0].readings.device_watts;

        }

        
    })

  const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
          name:'RootName',
          fields:{
              getReadings:{
                  args:{timeStamp:{name:'timeStamp', type: new GraphQLNonNull(GraphQLFloat)}},
                  resolve: (parent,args) => getGreeting(config.deviceName,args.timeStamp),
                  type: GraphQLString
              },
          },
      })
  });
module.exports.query = (event,context,callback) => graphql(schema,event.queryStringParameters.query)
.then(
    result => callback(null, {statusCode:200,body: JSON.stringify(result)}),
    err => callback(err)
);