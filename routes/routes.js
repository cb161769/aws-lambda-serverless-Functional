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
routes.get("/getDeviceByUserName/:userName", async (req,res) => {
  var userName = req.body.userName;
  var deviceId = req.body.deviceId;
  const params = {
    TableName:"deviceTable",
    ExpressionAttributeValues:{
      ":userName":{
        S:userName
      },
      ":device":{
        N:deviceId
      },
    },
    KeyConditionExpression: `#user = :userName and #device = :device`,
    ExpressionAttributeNames:{
      "#user": "userName",
      "#device":"deviceId"
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
      deviceStatus: "ACTIVE"
    }
  }
  try {
    await db.put(params).promise();
    res.status(201).json({message:"Dispositivo creado Satisfactoriamente"});

    
  } catch (error) {
    res.status(400).json({AwsDynamoDB:error});
  }
});
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
  
module.exports = {
    routes,
};