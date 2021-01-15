const express = require('express');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const {v4: uuidv4} = require('uuid');
const routes = express.Router({
    mergeParams: true
});
/** 
 * this method gets all the device readings
 */

routes.get("/getAllDeviceReadings", async (req, res) => {
    const params = {
        TableName: "deviceTable",
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
    TableName:"deviceTable",
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
    TableName:"deviceTable",
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
      TableName:"deviceTable",
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
  const data = req.body;
  let fareId = req.params.fareId;
  const params = {
    TableName: "",
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
routes.post("/fareConfiguration/createFare",async (req,res) => {
  const data = req.body;
  let creationDate  = new Date();
  creationDate.getDate();
  const params = {
    TableName:"fareConfiguration",
    Item:{
      fareCode: uuidv4(),
      fareId: data.fareId,
      fixedFee:{
        FixedFeeId: data.fixedFee.fareId,
        ConsumptionDescription: data.fixedFee.ConsumptionDescription,
        fixedFeeCondition: data.fixedFee.fixedFeeCondition,
        fixedFeeCalculated: data.fixedFee.fixedFeeCalculated,
        fixedFeeApplied: data.fixedFee.fixedFeeApplied

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

  
module.exports = {
    routes,
};