const express = require('express');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const {v4: uuidv4} = require('uuid');
const {config} = require('../connections/config/config');
const  {getWeeklyHelper} = require('../helpers/weeklyHelper');
const {getMonthlyHelper} = require('../helpers/monthlyHelper');
const {dailyHelper} = require('../helpers/dailyHelper');
const {findLastDay,findFirstDay,getByMonth} = require('../helpers/getByMonthHelper');
const {dailyHelperFromConnections} = require('../helpers/connectionHelpers/dailyHelper');
const {getByMonthConnections} = require('../helpers/connectionHelpers/getByMonthHelper');
const {getMonthlyHelperConnection} = require('../helpers/connectionHelpers/monthlyHelper');
const {connectionsDailyHelper} = require('../helpers/connectionHelpers/ConnectionDailyHelper')
const routes = express.Router({
    mergeParams: true
});
/** 
 * this method gets all the device readings
 */

routes.get("/getAllDeviceReadings", async (req, res) => {
    const params = {
        TableName: config.dynamoBB.deviceReadings.name,
      };
      const result = await db.scan(params).promise();
      if (result != undefined) {
        res.status(200).json({readings: result.Items});
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
/** 
 * 
 */
routes.get("/getDeviceWeekly/:start/:end", async (req,res) => {

  if (parseInt(req.params.start) > parseInt(req.params.end)) {
    var startChanged = parseInt(req.params.end);
    var endChanged = parseInt(req.params.start);
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
        ':start':startChanged,
        ':end': endChanged
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

    

    
  }else{
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

  }

  


  
});
routes.get("/getDeviceYearly/allConfig", async (req,res) => {
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
  };
  const result = await db.scan(params).promise();
  try {
    const data = await getMonthlyHelper(result.Items);
    res.status(200).json({result:data,database:result.Items});
    
  } catch (error) {
    res.status(400).json({error: error})
  }
 


})
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
    res.status(200).json({configuration:result.Items});
    
  } catch (error) {
    res.status(400).json({error: error});
  }

});
/** 
 *  Get the Device Relays by the UserName
 */
routes.get("/getDeviceRelays/:userName", async (req,res) => {
  const deviceId  = config.deviceName;
  let userName= req.params.userName;
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
    if (result.ScannedCount == 1 || result.Count == 1 || result.Items.length == 1) {
      try {
        var deviceName = result.Items[0].deviceName;
        var time = Math.floor(Date.now()/1000)
        var timeFloat = parseFloat(time);
        const data = await db.query({
          TableName: config.dynamoBB.deviceReadings.name,
          KeyConditionExpression:'#key = :key and #sortkey <= :timestamp', 
          ScanIndexForward: false,
          ConsistentRead: false,
          Limit:1,
          ExpressionAttributeNames:{
            '#key': 'primarykey',
            '#sortkey': 'sortkey',
          },
          ExpressionAttributeValues:{
            ':key':deviceName,
            ':timestamp': timeFloat
          }

        }).promise();

        if (data.ScannedCount == 0 || data == null || data == undefined || !data || data.Count == 0){
          res.status(404).json({notfound:'NO ROWS'});
        }
        res.status(200).json({data:data.Items[0].Relays});
      } catch (error) {
        res.status(400).json({error: error});
      }
    }
    else{
      res.status(404).json({result:'not found'});
    }
  } catch (error) {
    res.status(400).json({error: error});
  }

}); 
routes.post("/addDeviceConfiguration", async(req, res) => {
  const data = req.body;
  let createdDate = new Date();
  let updateDate = new Date();
  createdDate.getDate();
  updateDate.getDate();
  var result;
  
  const params = {
    TableName: config.dynamoBB.deviceConfiguration.name,
    Item:{
      configurationId: uuidv4(),
      deviceId: data.deviceId,
      configurationName: data.configurationName,
      status: data.status,
      configurationDays: data.configurationDays,
      connectionsConfigurations: data.connectionsConfigurations,
      configurationMaximumKilowattsPerDay: data.configurationMaximumKilowattsPerDay,
      registeredAt: createdDate.toLocaleDateString(),
      updatedAt: updateDate.toLocaleDateString()

    }
  };
  try {
    await db.put(params).promise();
    res.status(200).json({status:200,success:true});
  } catch (error) {
    res.status(400).json({status:400,success:false, error:error});
  }


});
routes.get("/getArduinoDeviceConfiguration/:deviceId" , async (req,res) =>{
  var userName = req.params.deviceId;
  const params = {
    TableName: config.dynamoBB.deviceConfiguration.name,
    ExpressionAttributeValues:{
      ":userName":userName
    },
    KeyConditionExpression: `#user = :userName`,
    ExpressionAttributeNames:{ 
      "#user":"deviceId"
    }
  };
  try {
    const result = await db.query(params).promise();
    if ( result.ScannedCount == 1 || result.Count == 1 || result.Items.length == 1){
      res.status(200).json({status:200,deviceConfiguration:result.Items})
    }
    else{
      rest.status(200).json({status:200,deviceConfiguration:[]})
    }
  } catch (error) {
    res.status(400).json({status:400,error: error})
    
  }
});
routes.get("/getAllDeviceReadingsByMonth", async (req, res ) => {
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
routes.get("/getAllDeviceReadingsByGivenDay/:day", async (req,res) =>{

  let day = parseInt(req.params.day);
  const moment = require('moment');
  let completedDay = new Date(day * 1000);
  let completedDay2 = new Date(day * 1000);
  completedDay.setHours(0);
  completedDay2.setHours(24);
  let firstEpoch = completedDay / 1000;
  let secondEpoch = completedDay2/ 1000;
  if (day != undefined || day != null) {
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
      ScanIndexForward:false,
      ConsistentRead:false,
      ExpressionAttributeNames:{
        '#key':'primarykey',
        '#sortkey':'sortkey'
  
      },
      ExpressionAttributeValues: {
        ':key':  config.deviceName,
        ':start':firstEpoch,
        ':end': secondEpoch
      },
    }
    const data = await db.query(params).promise();
    if ( data.ScannedCount == 0  || data == null || data == undefined || !data || data.Count == 0){
      var dayInformation = {
        AlldayName:'',
        AlldayAmps:0,
        AlldayWatts:0,
        AlldayKiloWatts:0,
        DayDetails:{
            Night:{
                amps:0,
                watts:0,
                kilowatts:0,
            },
            Day:{
                amps:0,
                watts:0,
                kilowatts:0,

            }
        }
    }
    const ob =  [{Detail:dayInformation}];
    res.status(200).json({ usage: ob, message:'Not Found', countedRows: data.ScannedCount});
    }
    else{
      const day = await dailyHelper(data.Items);
      res.status(200).json({ usage:day, Items: data.Items});
    }
  }else{
    const moment = require('moment');
    let completedDay = new Date();
    let completedDay2 = new Date();
      completedDay.setHours(0);
    completedDay2.setHours(24);
    let firstEpoch = completedDay / 1000;
    let secondEpoch = completedDay2/ 1000;
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
      ScanIndexForward:false,
      ConsistentRead:false,
      ExpressionAttributeNames:{
        '#key':'primarykey',
        '#sortkey':'sortkey'
  
      },
      ExpressionAttributeValues: {
        ':key':  config.deviceName,
        ':start':firstEpoch,
        ':end': secondEpoch
      },
    };
    const data = await db.query(params).promise();
    if ( data.ScannedCount == 0  || data == null || data == undefined || !data || data.Count == 0){
      var dayInformation = {
        AlldayName:'',
        AlldayAmps:0,
        AlldayWatts:0,
        AlldayKiloWatts:0,
        DayDetails:{
            Night:{
                amps:0,
                watts:0,
                kilowatts:0,
            },
            Day:{
                amps:0,
                watts:0,
                kilowatts:0,

            }
        }
    }
    const ob =  [{Detail:dayInformation}];
    res.status(200).json({ usage: ob, message:'Not Found'});
    }
    else{
      const day = await dailyHelper(data.Items);
      res.status(200).json({ usage:day, Items: data.Items});
    }

  }

});

routes.get("/getAllDeviceReadingsByGivenMonth/:day", async (req,res) => {
  let day = parseInt(req.params.day);
  let completedDay = new Date(day * 1000);
  let firstDayOfMonth = findFirstDay(completedDay.getFullYear(),completedDay.getMonth());
  let secondDayOfMonth = findLastDay(completedDay.getFullYear(),completedDay.getMonth());

  firstDayOfMonth.setHours(0);
  secondDayOfMonth.setHours(24);
  let firstEpoch = firstDayOfMonth / 1000;
  let secondEpoch = secondDayOfMonth/ 1000;
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
    KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
    ScanIndexForward:false,
    ConsistentRead:false,
    ExpressionAttributeNames:{
      '#key':'primarykey',
      '#sortkey':'sortkey'

    },
    ExpressionAttributeValues: {
      ':key':  config.deviceName,
      ':start':firstEpoch,
      ':end': secondEpoch
    },
  };
  const data = await db.query(params).promise();
  if ( data.ScannedCount == 0  || data == null || data == undefined || !data || data.Count ==0 ){
    var MonthInformation = {
      MonthName:'',
      allMonthAmps:0,
      allMonthWatts:0,
      allMonthKiloWatts:0,
      MonthDetails:{
          firstWeek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0,
            
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
  
          },
          secondWeek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
          },
          thirdweek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
  
          },
          fourthweek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
  
          }
      }
    };
  const ob =  [{Detail:MonthInformation}];
  res.status(200).json({ usage: ob, message:'Not Found'});

  }else{
    const month = await getByMonth(data.Items);
    res.status(200).json({ usage: month});
  }
 

});


routes.get("/Connections/getConnectionReadingsCurrentWeek/:start/:end/:ConnectionName", async (req,res)=>{
var ConnectionName = req.params.ConnectionName;
  if (ConnectionName == '' || ConnectionName == null || ConnectionName == undefined) {
    res.status(404).json({ error:'The name is incorrect'});
  
  }
  if (parseInt(req.params.start) > parseInt(req.params.end)) {
    var startChanged = parseInt(req.params.end);
    var endChanged = parseInt(req.params.start);
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
      ScanIndexForward:false,
      ConsistentRead:false,
      ExpressionAttributeNames:{
        '#key':'primarykey',
        '#sortkey':'sortkey'
  
      },
      ExpressionAttributeValues: {
        ':key':  config.deviceName,
        ':start':startChanged,
        ':end': endChanged
    },
    };
    const data = await db.query(params).promise();
    if (data.ScannedCount == 0 || data == null || data == undefined || data.Count ==0) {
      const ob =  [ 
        {registros:0,Connextion:ConnectionName,Timestamp:[],lunes:{registros:0, amperios: 0,watts: 0, Timestamp:[]}
        ,martes:{registros:  0, amperios:  0,watts: 0,Timestamp:[]}
        ,miercoles:{registros: 0, amperios:  0,watts: 0,Timestamp:[]}
        ,jueves:{registros: 0, amperios:  0,watts:0,Timestamp:[]}
        ,viernes:{registros:0 , amperios:  0,watts:0, Timestamp:[]}
        ,sabado:{registros: 0 , amperios:  0 ,watts: 0, Timestamp:[] }
        ,domingo:{registros:0, amperios:  0,watts:0, Timestamp:[]  },
        totalWatts: 0, totalAmps:0 , diaConsulta: new Date().toISOString(),
        promedioWattsSemanal: 0, promedioAmpsSemanal:0, promedioKwhSemanal:  0,uso:data.Items
    }];
    res.status(200).json({ usage:ob});
      
    }else{
      try {
        const week  =await dailyHelperFromConnections(ConnectionName,data.Items);
        res.status(200).json({uso:week});
      } catch (error) {
        const ob =  [ 
          {registros:0,Connextion:ConnectionName,Timestamp:[],lunes:{registros:0, amperios: 0,watts: 0, Timestamp:[]}
          ,martes:{registros:  0, amperios:  0,watts: 0,Timestamp:[]}
          ,miercoles:{registros: 0, amperios:  0,watts: 0,Timestamp:[]}
          ,jueves:{registros: 0, amperios:  0,watts:0,Timestamp:[]}
          ,viernes:{registros:0 , amperios:  0,watts:0, Timestamp:[]}
          ,sabado:{registros: 0 , amperios:  0 ,watts: 0, Timestamp:[] }
          ,domingo:{registros:0, amperios:  0,watts:0, Timestamp:[]  },
          totalWatts: 0, totalAmps:0 , diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: 0, promedioAmpsSemanal:0, promedioKwhSemanal:  0
         }];
         res.status(200).json({ error:ob,err2:error});
      }
      
    }
    
  }else{
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
      ScanIndexForward:false,
      ConsistentRead:false,
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
        {registros:0,Connextion:ConnectionName,Timestamp:[],lunes:{registros:0, amperios: 0,watts: 0, Timestamp:[]}
        ,martes:{registros:  0, amperios:  0,watts: 0,Timestamp:[]}
        ,miercoles:{registros: 0, amperios:  0,watts: 0,Timestamp:[]}
        ,jueves:{registros: 0, amperios:  0,watts:0,Timestamp:[]}
        ,viernes:{registros:0 , amperios:  0,watts:0, Timestamp:[]}
        ,sabado:{registros: 0 , amperios:  0 ,watts: 0, Timestamp:[] }
        ,domingo:{registros:0, amperios:  0,watts:0, Timestamp:[]  },
        totalWatts: 0, totalAmps:0 , diaConsulta: new Date().toISOString(),
        promedioWattsSemanal: 0, promedioAmpsSemanal:0, promedioKwhSemanal:  0,uso:data.Items
       }];
       res.status(200).json({ usage:ob});
    
    }else{
      try {
        const week  =await dailyHelperFromConnections(ConnectionName,data.Items);
        res.status(200).json({usage:week});
      } catch (error) {
        const ob =  [ 
          {registros:0,Connextion:ConnectionName,Timestamp:[],lunes:{registros:0, amperios: 0,watts: 0, Timestamp:[]}
          ,martes:{registros:  0, amperios:  0,watts: 0,Timestamp:[]}
          ,miercoles:{registros: 0, amperios:  0,watts: 0,Timestamp:[]}
          ,jueves:{registros: 0, amperios:  0,watts:0,Timestamp:[]}
          ,viernes:{registros:0 , amperios:  0,watts:0, Timestamp:[]}
          ,sabado:{registros: 0 , amperios:  0 ,watts: 0, Timestamp:[] }
          ,domingo:{registros:0, amperios:  0,watts:0, Timestamp:[]  },
          totalWatts: 0, totalAmps:0 , diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: 0, promedioAmpsSemanal:0, promedioKwhSemanal:  0
         }];
         res.status(200).json({ usage:ob});
      }
    }
  }


});

routes.get("/Connections/getAllDeviceReadingsByGivenMonth/:day/:ConnectionName", async (req,res) =>{
  let day = parseInt(req.params.day);
  var ConnectionName = req.params.ConnectionName;
  let completedDay = new Date(day * 1000);
  let firstDayOfMonth = findFirstDay(completedDay.getFullYear(),completedDay.getMonth());
  let secondDayOfMonth = findLastDay(completedDay.getFullYear(),completedDay.getMonth());

  firstDayOfMonth.setHours(0);
  secondDayOfMonth.setHours(24);
  let firstEpoch = firstDayOfMonth / 1000;
  let secondEpoch = secondDayOfMonth/ 1000;
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
    KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
    ScanIndexForward:false,
    ConsistentRead:false,
    ExpressionAttributeNames:{
      '#key':'primarykey',
      '#sortkey':'sortkey'

    },
    ExpressionAttributeValues: {
      ':key':  config.deviceName,
      ':start':firstEpoch,
      ':end': secondEpoch
    },
  };
  const data = await db.query(params).promise();
  if ( data.ScannedCount == 0  || data == null || data == undefined || !data || data.Count ==0 ){
    var MonthInformation = {
      MonthName:'',
      allMonthAmps:0,
      allMonthWatts:0,
      allMonthKiloWatts:0,
      MonthDetails:{
          firstWeek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0,
            
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
  
          },
          secondWeek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
          },
          thirdweek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
  
          },
          fourthweek:{ 
              monday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              tuesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              wednesday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              thursday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              friday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              saturday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              sunday:{
                  Night:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Day:{
                      count:0,
                      kilowatts:0,
                      watts:0,
                      amps:0
                  },
                  Total:0
              },
              totalKwhPerWeek:0,
              TimeStamp:[]
  
          }
      }
    };
    const ob =  [{Detail:MonthInformation}];
    res.status(200).json({ usage: ob, message:'Not Found'});
  }
  else{
    const month = await getByMonthConnections(ConnectionName,data.Items);
    res.status(200).json({ usage: month});
  }


});

routes.get("/Connections/GetConnectionYearly/allConfig/:ConnectionName", async (req, res) => {
  let connectionName = req.params.ConnectionName;
  
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
  };
  try {
    const result = await db.scan(params).promise();
    const data = await getMonthlyHelperConnection(connectionName,result.Items);
    res.status(200).json({ usage:data});
  } catch (error) {
    res.status(400).json({error: error})
  }
});

routes.get("/Connections/GetConnectionsReadingsByGivenDay/:day/:ConnectionName", async (req,res) =>{
  let day = parseInt(req.params.day);
  let connectionName = req.params.ConnectionName;
  const moment = require('moment');
  let completedDay = new Date(day * 1000);
  let completedDay2 = new Date(day * 1000);
  completedDay.setHours(0);
  completedDay2.setHours(24);
  let firstEpoch = completedDay / 1000;
  let secondEpoch = completedDay2/ 1000;
  if (day != undefined || day != null) {
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:'#key = :key and #sortkey BETWEEN :start AND :end',
      ScanIndexForward:false,
      ConsistentRead:false,
      ExpressionAttributeNames:{
        '#key':'primarykey',
        '#sortkey':'sortkey'
  
      },
      ExpressionAttributeValues: {
        ':key':  config.deviceName,
        ':start':firstEpoch,
        ':end': secondEpoch
      },
    };
    const data = await db.query(params).promise();
    if ( data.ScannedCount == 0  || data == null || data == undefined || !data || data.Count == 0){
      var dayInformation = {
        AlldayName:'',
        AlldayAmps:0,
        AlldayWatts:0,
        AlldayKiloWatts:0,
        DayDetails:{
            Night:{
                amps:0,
                watts:0,
                kilowatts:0,
            },
            Day:{
                amps:0,
                watts:0,
                kilowatts:0,

            }
        }
      }
      const ob =  [{Detail:dayInformation}];
      res.status(200).json({ usage: ob, message:'Not Found', countedRows: data.ScannedCount});

    }
  }else{
    const day = await connectionsDailyHelper(connectionName,data.Items);
    res.status(200).json({ usage:day});
  }
});
module.exports = {
    routes,
};