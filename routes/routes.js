const express = require('express');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const {v4: uuidv4} = require('uuid');
const {config} = require('../connections/config/config');
const  {getWeeklyHelper} = require('../helpers/weeklyHelper')
const routes = express.Router({
    mergeParams: true
});
/** 
 * this method gets all the device readings
 */

routes.get("/getAllDeviceReadings", async (req, res) => {
    const params = {
        TableName: config.dynamoBB.deviceTable.name,
      };
      const result = await db.scan(params).promise();
      if (result != undefined) {
        res.status(200).json({readings: result});
      }
      else{
        res.status(400).json({error: result});
      }
});
routes.get("/getDeviceByUserName/:deviceId", async (req,res) => {

  var userName = req.params.deviceId;
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    ExpressionAttributeValues:{
      ":userName":userName
    },
    KeyConditionExpression: `#user = :userName`,
    ExpressionAttributeNames:{
      "#user":"userName"
    }
  };
  try {
    const result = await db.query(params).promise();
    res.status(200).json({readings: result});
    
  } catch (error) {
    res.status(400).json({error: error});
  }

});

routes.post("/createDevice", async (req,res) => {
  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': true,
  // }
  const data = req.body;
  let creationDate = new Date();
  creationDate.getDate();
  const params = {
    TableName:config.dynamoBB.deviceTable.name,
    Item:{
      deviceId: uuidv4(),
      deviceName: data.deviceName,
      userName: data.userName, 
      deviceIp: data.deviceIp,
      deviceCreationDate: creationDate.toDateString(),
      deviceUpdateDate : '',
      deviceStatus: "ACTIVE",
      configuration:{
        configuration: data.configuration
      },
      relays:{
        relay: data.relays
      }
    }
  }
  try {
    await db.put(params).promise();
    res.status(201).json({status:200,message:"Dispositivo creado Satisfactoriamente"});

    
  } catch (error) {
    res.status(400).json({AwsDynamoDB:error});
  }
});
/** 
 * 
 */
routes.patch("/UpdateDevice/:deviceId", async (req,res) => {
    const data = req.body;
    const deviceId = req.params.deviceId;
    let updateDate = new Date();
    updateDate.now();
    const params = {
      TableName:config.dynamoBB.deviceTable.name,
      Item:{
        deviceId: deviceId,
        deviceName: data.deviceName,
        userName: data.userName, 
        deviceIp: data.deviceIp,
        deviceUpdateDate : updateDate.toLocaleDateString(),
        deviceStatus: data.deviceStatus
      }
    }
    try {
      await db.put(params).promise();
      res.status(200).json({message:"Datos actualizados Satisfactoriamente"});
      
    } catch (error) {
      res.status(400).json({AwsDynamoDB:error});
    }
    
});
/** 
 * 
 */
routes.get("/fareConfiguration/getFares", async (req,res) => {
  let fareId = req.params.fareId;
  const params = {
    TableName: config.dynamoBB.fareConfiguration.name,
    ExpressionAttributeValues:{
      ":fareId":fareId
    },
    KeyConditionExpression: `#fare = :fareId`,
    ExpressionAttributeNames:{
      "#fare":"fareConfigurationId"
    }
  }
  try {
    const result = await db.query(params).promise();
    res.status(200).json({readings:result});
    
  } catch (error) {
    res.status(400).json({error: error});
  }


});
routes.get("/fareConfiguration/getAllFares", async (req,res) =>{
  const params = {
    TableName:config.dynamoBB.fareConfiguration.name

  };
  try {
    const result = await db.scan(params).promise();
    res.status(200).json({readings:result});
  } catch (error) {
    res.status(400).json({error:error});
  }
});
routes.post("/fareConfiguration/createFare",async (req,res) => {
  const data = req.body;
  let creationDate  = new Date();
  creationDate.getDate();
  const params = {
    TableName:config.dynamoBB.fareConfiguration.name,
    Item:{
      fareConfigurationId: uuidv4(),
      fareId: data.fareId,
      fixedFee1:{
        FixedFeeId: data.fixedFee1.fareId,
        ConsumptionDescription: data.fixedFee1.ConsumptionDescription,
        fixedFeeCondition: data.fixedFee1.fixedFeeCondition,
        fixedFeeCalculated: data.fixedFee1.fixedFeeCalculated,
        fixedFeeApplied: data.fixedFee1.fixedFeeApplied

      },
      fixedFee2:{
        FixedFeeId: data.fixedFee2.fareId,
        ConsumptionDescription: data.fixedFee2.ConsumptionDescription,
        fixedFeeCondition: data.fixedFee2.fixedFeeCondition,
        fixedFeeCalculated: data.fixedFee2.fixedFeeCalculated,
        fixedFeeApplied: data.fixedFee2.fixedFeeApplied

      },
      energyConditions:{
        conditions: {
          energyCondition1 : {
            minimumKilowatt: data.energyConditions.conditions.energyCondition1.minimumKilowatt,
            maximumKilowatt:data.energyConditions.conditions.energyCondition1.maximumKilowatt,
            fixedFeeCalculated :data.energyConditions.conditions.energyCondition1.fixedFeeCalculated,
            fixedFeeApplied:data.energyConditions.conditions.energyCondition1.fixedFeeApplied

          },
          energyCondition2:{
            minimumKilowatt: data.energyConditions.conditions.energyCondition2.minimumKilowatt,
            maximumKilowatt:data.energyConditions.conditions.energyCondition2.maximumKilowatt,
            fixedFeeCalculated :data.energyConditions.conditions.energyCondition2.fixedFeeCalculated,
            fixedFeeApplied:data.energyConditions.conditions.energyCondition2.fixedFeeApplied

          },
          energyCondition3:{
            minimumKilowatt: data.energyConditions.conditions.energyCondition3.minimumKilowatt,
            maximumKilowatt:data.energyConditions.conditions.energyCondition3.maximumKilowatt,
            fixedFeeCalculated :data.energyConditions.conditions.energyCondition3.fixedFeeCalculated,
            fixedFeeApplied:data.energyConditions.conditions.energyCondition3.fixedFeeApplied

          },
          energyCondition4:{
            minimumKilowatt: data.energyConditions.conditions.energyCondition4.minimumKilowatt,
            maximumKilowatt:data.energyConditions.conditions.energyCondition4.maximumKilowatt,
            fixedFeeCalculated :data.energyConditions.conditions.energyCondition4.fixedFeeCalculated,
            fixedFeeApplied:data.energyConditions.conditions.energyCondition4.fixedFeeApplied

          },
        },
      }

    }
  }
  try {
    await db.put(params).promise();
    res.status(201).json({status:200,message:"Tarifas creadas satisfactoriamente"});
    
  } catch (error) {
    res.status(400).json({status:400,AwsDynamoDB:error});
  }


});
/** 
 * 
 */
routes.post("/configureDevice", async (req,res) => {
  const data = req.body;
  let updateDate = new Date();
  updateDate.getDate();
  var result;
  let fareId = data.configuration.deviceTarifConfiguration.fareId;
  const parameters = {
    TableName: config.dynamoBB.fareConfiguration.name,
    ExpressionAttributeValues:{
      ":fareId":fareId
    },
    KeyConditionExpression: `#fare = :fareId`,
    ExpressionAttributeNames:{
      "#fare":"fareConfigurationId"
    }
  }
  try {
    result = await db.query(parameters).promise();
  } catch (error) {
    res.status(400).json({error: error});
  }

  const params = {
    TableName:config.dynamoBB.deviceTable.name,
    Item:{
      deviceId: data.deviceId,
      userName: data.userName,
      deviceIp: data.deviceIp,
      deviceUpdateDate: updateDate.toDateString(),
      configuration:{
      configuration: result.Items
      },
      relays:{
      relay : data.relays
      }

    },
    

  };
  try {
    await db.put(params).promise();
    res.status(200).json({status:200,message: "El Dispsitivo fue configurado Stisfactoriamente"});
    
  } catch (error) {

    res.status(400).json({status:400, error:error});
    
  }



});
routes.get("/getDeviceWeekly/:start/:end", async (req,res) => {

  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
    KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
    ScanIndexForward:false,
    ConsistentRead:false,
    limit:10,
    ExpressionAttributeNames:{
      '#key':'primarykey',
      '#sortkey':'sortkey'

    },
    ExpressionAttributeValues: {
      ':key':  config.deviceName,
      ':start': parseInt(req.params.start),
      ':end': parseInt(req.params.end)
  },
  };
  const data = await db.query(params).promise();
  if ( data.ScannedCount == 0 || data == null || data == undefined || !data || data.Count == 0) {

        const ob =  [ 
          {registros:0,lunes:{registros: 0, amperios:  0,watts: 0}
          ,martes:{registros:  0, amperios:  0,watts: 0}
          ,miercoles:{registros:0, amperios:  0,watts: 0}
          ,jueves:{registros: 0, amperios:  0,watts: 0}
          ,viernes:{registros:0 , amperios:  0,watts: 0}
          ,sabado:{registros: 0 , amperios:  0 ,watts: 0 }
          ,domingo:{registros: 0, amperios:  0,watts:0  },
          totalWatts:0  , totalAmps: 0 , diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: 0, promedioAmpsSemanal:  0
      }];
      
       res.status(200).json({ usage:ob});
  }
  else{
    try {
      const week = await getWeeklyHelper(data.Items)
         
          res.status(200).json({ usage:week});
      
    } catch (error) {
      const ob =  [ 
        {registros:0,lunes:{registros: 0, amperios:  0,watts: 0}
        ,martes:{registros:  0, amperios:  0,watts: 0}
        ,miercoles:{registros:0, amperios:  0,watts: 0}
        ,jueves:{registros: 0, amperios:  0,watts: 0}
        ,viernes:{registros:0 , amperios:  0,watts: 0}
        ,sabado:{registros: 0 , amperios:  0 ,watts: 0 }
        ,domingo:{registros: 0, amperios:  0,watts:0  },
        totalWatts:0  , totalAmps: 0 , diaConsulta: new Date().toISOString(),
        promedioWattsSemanal: 0, promedioAmpsSemanal:  0
    }];
    
     res.status(200).json({ usage:ob});
      //res.status(400).json({status:400, error:error});
    }
  }


  // try {
  //   const params = {
  //     TableName: config.dynamoBB.deviceReadings.name,
  //     KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
  //     ScanIndexForward:false,
  //     ConsistentRead:false,
  //     limit:10,
  //     ExpressionAttributeNames:{
  //       '#key':'primarykey',
  //       '#sortkey':'sortkey'

  //     },
  //     ExpressionAttributeValues: {
  //       ':key':  config.deviceName,
  //       ':start': parseInt(req.params.start),
  //       ':end': parseInt(req.params.end)
  //   },
  //   };
  //   const data = await db.query(params).promise();
  //   if ( data.ScannedCount == 0 || data == null || data == undefined || !data || data.Count == 0) {

  //     const ob =  [ 
  //       {registros:0,lunes:{registros: 0, amperios:  0,watts: 0}
  //       ,martes:{registros:  0, amperios:  0,watts: 0}
  //       ,miercoles:{registros:0, amperios:  0,watts: 0}
  //       ,jueves:{registros: 0, amperios:  0,watts: 0}
  //       ,viernes:{registros:0 , amperios:  0,watts: 0}
  //       ,sabado:{registros: 0 , amperios:  0 ,watts: 0 }
  //       ,domingo:{registros: 0, amperios:  0,watts:0  },
  //       totalWatts:0  , totalAmps: 0 , diaConsulta: new Date().toISOString(),
  //       promedioWattsSemanal: 0, promedioAmpsSemanal:  0
  //   }];
    
  //   return ob;
  //   }
  //   else{
  //     try {
  //       // var Object2 = {"data":[data.Items]};
  //         const week = await getWeeklyHelper(data.Items)
         
  //        res.status(200).json({ usage:week});
         
  //      } catch (error) {
  //        res.status(400).json({status:400, error:error});
  //      }

  //   }
    
    

    
   
    
  // } catch (error) {
  //   res.status(400).json({status:400, error:error});
  // }
});
routes.get("/getDeviceConfiguration/:userName", async (req,res) => {
  let userName = req.params.userName;
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    ExpressionAttributeValues:{
      ":userN":userName
    },
    KeyConditionExpression: `#user = :userN`,
    ExpressionAttributeNames:{
      "#user":"userName"
    }
  }
  try {
    const result = await db.query(params).promise();
    res.status(200).json({configuration:result});
    
  } catch (error) {
    res.status(400).json({error: error});
  }

});
/**
 * get relays realtime
 */
// routes.get('/try/:timestamp', async (req, res) => {
//   const deviceId = config.deviceName;
//   let timestamp = req.params.timestamp;
//   var time = parseFloat(timestamp)
//   try {
//     const data = await db.query({
//       TableName: config.dynamoBB.deviceReadings.name,
//       KeyConditionExpression: '#key = :key and #sortkey <= :timestamp',
//       ScanIndexForward: false, // DESC order
//       ConsistentRead: false,
//       Limit:1,
//       ExpressionAttributeNames:{
//           '#key': 'primarykey',
//           '#sortkey': 'sortkey',
//       },
//       ExpressionAttributeValues: {
//           ':key':  deviceId,
//           ':timestamp': time
//       },
  
//   }).promise();
//   if (data == null || data == undefined || !data || data.Count == 0) {
//     let error =  [{error:400}];
//     res.status(400).json({error: error});
//   }
//   let date = data.Items[0].sortkey;
//   let firstValidationDate = Math.floor(Date.now()/1000) -50;
//   let secondValidationDate = Math.floor(Date.now()/1000) + 50; 
//   if ((date >= firstValidationDate  && date <= secondValidationDate) ) {
//     const rb =  data.Items[0];
//     res.status(200).json({configuration:rb});
    
//   }
//   else{
//     const err =   [{device:'Not connected in realtime',error:400}];
//     const rb =  data.Items[0].Relays[0];
//     res.status(200).json({configuration:rb});
//   }
    
//   } catch (error) {
//     res.status(400).json({error: error});
//   }
  

// })
// routes.post("/graphql/query",async (req,res) =>{
//   try {
//       const graphqlSchema = buildSchema(`
//       type Query{
//           deviceUsageData(startDate: Int!, endDate: Int!): [DailySummary]!
          
//           stats: Stats!

//           realtimeData(since: Int!): [Reading]!

//           readings(startDate: Int!, endDate: Int!): [Reading]!

//       }
//       type Stats{
//           always_on: Float
//           today_so_far: Float   
//       }

//       type Reading {
//           timestamp: Int!
//           reading: Int!
//         }
      
//         type DailySummary{
//           timestamp: Int!
//           dayUse: Float!
//           nightUse: Float!
//         }
//   `);

//   const helpers = {
//       deviceUsageData: deviceUsageData,
//       realtimeData:realtimeData,
//       stats:stats
//   };
//     try {
//       const query = req.body;
//         const response = await graphql(
//             graphqlSchema,
//             query,
//             helpers
//         );
//         res.status(200).json({body: JSON.stringify(response)});
      
//     } catch (error) {
//       res.status(400).json({status:400, error:error});
//     }

    
//   } catch (error) {
//     res.status(400).json({status:400, error:error});
//   }


// });
// const graphqlSchema = buildSchema(`
//     type Query{
//         realtimeData(since: Int!): [Reading]!
//     }
//     type Reading {
//         timestamp: Int!
//         reading: Int!
//       }

// `);
// const helper = {
//   realtimeData:realtime
// }; 
// routes.post("graphql/query", graphqlHTTP({
//   schema: graphqlSchema,
//   rootValue: helper,
//   graphiql: true
// }));
  
module.exports = {
    routes,
};