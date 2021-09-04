const express = require("express");
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");
const { config } = require("../connections/config/config");
const { getWeeklyHelper } = require("../helpers/weeklyHelper");
const { getMonthlyHelper } = require("../helpers/monthlyHelper");
const { dailyHelper } = require("../helpers/dailyHelper");
const {
  findLastDay,
  findFirstDay,
  getByMonth,
} = require("../helpers/getByMonthHelper");
const {
  dailyHelperFromConnections,
} = require("../helpers/connectionHelpers/dailyHelper");
const {
  getByMonthConnections,
} = require("../helpers/connectionHelpers/getByMonthHelper");
const {
  getMonthlyHelperConnection,
} = require("../helpers/connectionHelpers/monthlyHelper");
const {
  connectionsDailyHelper,
} = require("../helpers/connectionHelpers/ConnectionDailyHelper");
const {
  DeviceGraphHelper,
  elapsedTime,
  ConnectionGrahphHelper,
} = require("../helpers/connectionHelpers/connectionGraph/conectionGraphHelper");
const logger = require("../helpers/log/logsHelper");
const {
  mapDataToTensorFlow,
  changeDates,
} = require("../tensorflow/tensorflow-helper");
const {
  healthWeeklyHelper,
  healthMonthlyHelper,
  healthYearlyHelper,
  ConnectionsHealthWeeklyHelper,
  ConnectionsHealthYearlyHelper,
  ConnectionsHealthMonthlyHelper,
} = require("../helpers/healthConsumptionHelper");
const { sendEmail } = require("../helpers/email/emailHelper");
const {
  ConnectionsDailyWattsDayNight,
  ConnectionsWeekKiloWattsDayNight,
  ConnectionsWeeklyWattsDayNight,
  ConnectionsWeeklyKiloWattsDayNight,
  ConnectionsMonthlyWattsDayNight,
  ConnectionsMonthlyKiloWattsDayNight,
} = require("../helpers/day-night/connectionsDayAndNightHelper");
const {
  DeviceWeeklyWattsDayNightHelper,
  DeviceWeeklyKiloWattsDayNightHelper,
  DeviceMonthlyWattsDayNightHelper,
  DeviceMonthlyKiloWattsDayNightHelper,
  DeviceMonthlyYearlyWattsDayNight,
  DeviceMonthlyYearlyKiloWattsDayNight,
  DeviceDailyWattsDayNight,
  DeviceDailyKiloWattsDayNight,
} = require("../helpers/day-night/deviceDayAndNightHelper");
const iotData = new AWS.IotData({
  endpoint: "a3grg8s0qkek3y-ats.iot.us-west-2.amazonaws.com",
  accessKeyId: AWS.config.credentials.accessKeyId,
  secretAccessKey: AWS.config.credentials.secretAccessKey,
  sessionToken: AWS.config.credentials.sessionToken,
  region: "us-west-2",
});
const email = new AWS.SES({
  region: "us-east-2",
  apiVersion: "2010-12-01",
});
const routes = express.Router({
  mergeParams: true,
});

/**
 *
 */
routes.get("/getAllDeviceReadings", async (req, res) => {
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
  };
  const result = await db.scan(params).promise();
  if (result != undefined) {
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getAllDeviceReadings",
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });
    //const log =   LogInfo(config.LogGroups.Database.LogGroupName,`${config.LogGroups.Database.LogStreamName}[RESULT][${config.dynamoBB.deviceReadings.name}][${new Date().toISOString}]`,'Info','routes','GET','DATABASE','','/getAllDeviceReadings');
    res.status(200).json({ readings: result.Items });
  } else {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getAllDeviceReadings",
        body: req.body,
        headers: req.headers,
        error: result,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });
    //   logError(config.LogGroups.Database.LogGroupName,`${config.LogGroups.Database.LogStreamName}[RESULT][${config.dynamoBB.deviceReadings.name}][${new Date().toISOString}]`,'Info','routes','GET','DATABASE',result,'/getAllDeviceReadings')
    res.status(400).json({ error: result });
  }
});
routes.get("/getDeviceByUserName/:deviceId", async (req, res) => {
  var userName = req.params.deviceId;
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    ExpressionAttributeValues: {
      ":userName": userName,
    },
    KeyConditionExpression: `#user = :userName`,
    ExpressionAttributeNames: {
      "#user": "userName",
    },
  };
  try {
    const result = await db.query(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceByUserName",
        body: req.body,
        headers: req.headers,
        error: result,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(200).json({ readings: result });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceByUserName",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceTable.name,
      },
    });

    res.status(400).json({ error: error });
  }
});
/**
 * @param req requirement
 */
routes.post("/createDevice", async (req, res) => {
  const data = req.body;
  let creationDate = new Date();
  creationDate.getDate();
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    Item: {
      deviceId: uuidv4(),
      deviceName: data.deviceName,
      userName: data.userName,
      deviceIp: data.deviceIp,
      deviceCreationDate: creationDate.toDateString(),
      deviceUpdateDate: "",
      deviceStatus: "ACTIVE",
      configuration: {
        configuration: data.configuration,
      },
      relays: {
        relay: data.relays,
      },
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "createDevice",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res
      .status(201)
      .json({ status: 200, message: "Dispositivo creado Satisfactoriamente" });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "createDevice",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(400).json({ AwsDynamoDB: error });
  }
});
/**
 * @param req
 * @author Claudio Raul Brito Mercedes
 * @param res
 */
routes.post("/CreateLog", async (req, res) => {
  const data = req.body;
  const logId = uuidv4();
  const log = {
    userName: data.userName,
    timeStamp: data.timeStamp,
    action: data.action,
    logId: logId,
    route: data.route,
    logLevel: data.logLevel,
    logError: data.logError,
  };
  let creationDate = new Date();
  creationDate.toISOString();
  const params = {
    TableName: config.dynamoBB.userLogs.name,
    Item: {
      logId: logId,
      logRecord: log,
      date: creationDate,
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "CreateLog",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.userLogs.name,
      },
    });
    res.status(201).json({ status: 200, success: true });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "CreateLog",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "POST",
        table: config.dynamoBB.userLogs.name,
      },
    });
    res.status(400).json({ status: 400, success: false, error: error });
  }
});
/**
 *
 */
routes.patch("/UpdateDevice/:deviceId", async (req, res) => {
  const data = req.body;
  const deviceId = req.params.deviceId;
  let updateDate = new Date();
  updateDate.now();
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    Item: {
      deviceId: deviceId,
      deviceName: data.deviceName,
      userName: data.userName,
      deviceIp: data.deviceIp,
      deviceUpdateDate: updateDate.toLocaleDateString(),
      deviceStatus: data.deviceStatus,
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "UpdateDevice",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(200).json({ message: "Datos actualizados Satisfactoriamente" });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "UpdateDevice",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(400).json({ AwsDynamoDB: error });
  }
});
/**
 *
 */
routes.get("/fareConfiguration/getFares", async (req, res) => {
  let fareId = req.params.fareId;
  const params = {
    TableName: config.dynamoBB.fareConfiguration.name,
    ExpressionAttributeValues: {
      ":fareId": fareId,
    },
    KeyConditionExpression: `#fare = :fareId`,
    ExpressionAttributeNames: {
      "#fare": "fareConfigurationId",
    },
  };
  try {
    const result = await db.query(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getFares",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });

    res.status(200).json({ readings: result });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getFares",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });

    res.status(400).json({ error: error });
  }
});
routes.get("/fareConfiguration/getAllFares", async (req, res) => {
  const params = {
    TableName: config.dynamoBB.fareConfiguration.name,
  };
  try {
    const result = await db.scan(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getAllFares",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });
    res.status(200).json({ readings: result });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getAllFares",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });

    res.status(400).json({ error: error });
  }
});
routes.post("/fareConfiguration/createFare", async (req, res) => {
  const data = req.body;
  let creationDate = new Date();
  creationDate.getDate();
  const params = {
    TableName: config.dynamoBB.fareConfiguration.name,
    Item: {
      fareConfigurationId: uuidv4(),
      fareId: data.fareId,
      fixedFee1: {
        FixedFeeId: data.fixedFee1.fareId,
        ConsumptionDescription: data.fixedFee1.ConsumptionDescription,
        fixedFeeCondition: data.fixedFee1.fixedFeeCondition,
        fixedFeeCalculated: data.fixedFee1.fixedFeeCalculated,
        fixedFeeApplied: data.fixedFee1.fixedFeeApplied,
      },
      fixedFee2: {
        FixedFeeId: data.fixedFee2.fareId,
        ConsumptionDescription: data.fixedFee2.ConsumptionDescription,
        fixedFeeCondition: data.fixedFee2.fixedFeeCondition,
        fixedFeeCalculated: data.fixedFee2.fixedFeeCalculated,
        fixedFeeApplied: data.fixedFee2.fixedFeeApplied,
      },
      energyConditions: {
        conditions: {
          energyCondition1: {
            minimumKilowatt:
              data.energyConditions.conditions.energyCondition1.minimumKilowatt,
            maximumKilowatt:
              data.energyConditions.conditions.energyCondition1.maximumKilowatt,
            fixedFeeCalculated:
              data.energyConditions.conditions.energyCondition1
                .fixedFeeCalculated,
            fixedFeeApplied:
              data.energyConditions.conditions.energyCondition1.fixedFeeApplied,
          },
          energyCondition2: {
            minimumKilowatt:
              data.energyConditions.conditions.energyCondition2.minimumKilowatt,
            maximumKilowatt:
              data.energyConditions.conditions.energyCondition2.maximumKilowatt,
            fixedFeeCalculated:
              data.energyConditions.conditions.energyCondition2
                .fixedFeeCalculated,
            fixedFeeApplied:
              data.energyConditions.conditions.energyCondition2.fixedFeeApplied,
          },
          energyCondition3: {
            minimumKilowatt:
              data.energyConditions.conditions.energyCondition3.minimumKilowatt,
            maximumKilowatt:
              data.energyConditions.conditions.energyCondition3.maximumKilowatt,
            fixedFeeCalculated:
              data.energyConditions.conditions.energyCondition3
                .fixedFeeCalculated,
            fixedFeeApplied:
              data.energyConditions.conditions.energyCondition3.fixedFeeApplied,
          },
          energyCondition4: {
            minimumKilowatt:
              data.energyConditions.conditions.energyCondition4.minimumKilowatt,
            maximumKilowatt:
              data.energyConditions.conditions.energyCondition4.maximumKilowatt,
            fixedFeeCalculated:
              data.energyConditions.conditions.energyCondition4
                .fixedFeeCalculated,
            fixedFeeApplied:
              data.energyConditions.conditions.energyCondition4.fixedFeeApplied,
          },
        },
      },
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "createFare",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });
    res
      .status(201)
      .json({ status: 200, message: "Tarifas creadas satisfactoriamente" });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "createFare",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });
    res.status(400).json({ status: 400, AwsDynamoDB: error });
  }
});
/**
 *
 */
routes.post("/configureDevice", async (req, res) => {
  const data = req.body;
  let updateDate = new Date();
  updateDate.getDate();
  var result;
  let fareId = data.configuration.deviceTarifConfiguration.fareId;
  const parameters = {
    TableName: config.dynamoBB.fareConfiguration.name,
    ExpressionAttributeValues: {
      ":fareId": fareId,
    },
    KeyConditionExpression: `#fare = :fareId`,
    ExpressionAttributeNames: {
      "#fare": "fareConfigurationId",
    },
  };
  try {
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "configureDevice",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });
    result = await db.query(parameters).promise();
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "configureDevice",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "POST",
        table: config.dynamoBB.fareConfiguration.name,
      },
    });
    res.status(400).json({ error: error });
  }

  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    Item: {
      deviceId: data.deviceId,
      userName: data.userName,
      deviceIp: data.deviceIp,
      deviceUpdateDate: updateDate.toDateString(),
      configuration: {
        configuration: result.Items,
      },
      relays: {
        relay: data.relays,
      },
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "configureDevice",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(200).json({
      status: 200,
      message: "El Dispsitivo fue configurado Stisfactoriamente",
    });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "configureDevice",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(400).json({ status: 400, error: error });
  }
});
/**
 * @route /getDeviceWeekly/:start/:end
 */
routes.get("/getDeviceWeekly/:start/:end", async (req, res) => {
  if (parseInt(req.params.start) >= parseInt(req.params.end)) {
    var startChanged = parseInt(req.params.end);
    var endChanged = parseInt(req.params.start);
    //TODO change to date :3
    var priorStartChanged = parseInt(req.params.end);
    var priorEndChanged = parseInt(req.params.start);
    const priorStartDate = new Date(priorStartChanged * 1000);
    var pastWeekDay = new Date(
      priorStartDate.getFullYear(),
      priorStartDate.getMonth(),
      priorStartDate.getDate() - 7
    );
    // seted final date
    const priorEndDate = new Date(priorEndChanged * 1000);
    var pastWeekDay2 = new Date(
      priorEndDate.getFullYear(),
      priorEndDate.getMonth(),
      priorEndDate.getDate() - 7
    );

    const priorEpochStart = Math.floor(pastWeekDay.getTime() / 1000);
    const priorEpochEnd = Math.floor(pastWeekDay2.getTime() / 1000);
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": startChanged,
        ":end": endChanged,
      },
    };
    const secondParams = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: true,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": priorEpochStart,
        ":end": priorEpochEnd,
      },
    };
    const data = await db.query(params).promise();
    const secondData = await db.query(secondParams).promise();
    if (
      data.ScannedCount == 0 ||
      data == null ||
      data == undefined ||
      !data ||
      data.Count == 0
    ) {
      const ob = [
        {
          registros: 0,
          lunes: { registros: 0, amperios: 0, watts: 0 },
          martes: { registros: 0, amperios: 0, watts: 0 },
          miercoles: { registros: 0, amperios: 0, watts: 0 },
          jueves: { registros: 0, amperios: 0, watts: 0 },
          viernes: { registros: 0, amperios: 0, watts: 0 },
          sabado: { registros: 0, amperios: 0, watts: 0 },
          domingo: { registros: 0, amperios: 0, watts: 0 },
          totalWatts: 0,
          totalAmps: 0,
          diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: 0,
          promedioAmpsSemanal: 0,
          dayWattsProm: 0,
          NightWattsProm: 0,
          NightsKhwProm: 0,
          dayKhwProms: 0,
          Timestamp: [],
          dataOne: data,
          secondData: secondData,
        },
      ];
      const returnObject = {
        health: 0,
        message: "",
        isError: false,
      };
      const dataset = [
        {
          label: "Consumo semanal en Watts",
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          data: [0, 0],
          hoverOffset: 4,
        },
      ];
      const returnWatts = {
        labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
        datasets: dataset,
      };
      const Kwhdataset = [
        {
          label: "Consumo semanal en KiloWatts",
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          data: [0, 0],
          hoverOffset: 4,
        },
      ];
      const returnKHWatts = {
        labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
        datasets: Kwhdataset,
      };
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getDeviceWeekly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      if (secondData.ScannedCount == 0) {
        logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
          tags: "http",
          additionalInfo: {
            operation: "getDeviceWeekly",
            body: req.body,
            headers: req.headers,
            databaseOperation: "GET",
            table: config.dynamoBB.deviceReadings.name,
          },
        });
      }
      res.status(200).json({
        usage: ob,
        health: returnObject,
        dayNight: returnWatts,
        dayNightKilowatts: returnKHWatts,
        test: data,
        test2: secondData,
        priorEpochStart: priorEpochStart,
        priorEpochEnd: priorEpochEnd,
      });
    } else {
      try {
        const week = getWeeklyHelper(data.Items);
        const health = healthWeeklyHelper(data.Items, secondData.Items);
        const dayNight = DeviceWeeklyWattsDayNightHelper(data.Items);
        const dayNightKilowatts = DeviceWeeklyKiloWattsDayNightHelper(
          data.Items
        );
        res.status(200).json({
          usage: week,
          health: health,
          dayNight: dayNight,
          dayNightKilowatts: dayNightKilowatts,
        });
      } catch (error) {
        const ob = [
          {
            registros: 0,
            lunes: { registros: 0, amperios: 0, watts: 0 },
            martes: { registros: 0, amperios: 0, watts: 0 },
            miercoles: { registros: 0, amperios: 0, watts: 0 },
            jueves: { registros: 0, amperios: 0, watts: 0 },
            viernes: { registros: 0, amperios: 0, watts: 0 },
            sabado: { registros: 0, amperios: 0, watts: 0 },
            domingo: { registros: 0, amperios: 0, watts: 0 },
            totalWatts: 0,
            totalAmps: 0,
            diaConsulta: new Date().toISOString(),
            promedioWattsSemanal: 0,
            promedioAmpsSemanal: 0,
            dayWattsProm: 0,
            NightWattsProm: 0,
            NightsKhwProm: 0,
            dayKhwProms: 0,
            Timestamp: [],
            test: data,
            test2: secondData,
            error: error,
            priorEpochStart: priorEpochStart,
            priorEpochEnd: priorEpochEnd,
          },
        ];
        const returnObject = {
          health: 0,
          message: "",
          isError: false,
        };
        const dataset = [
          {
            label: "Consumo semanal en Watts",
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            data: [0, 0],
            hoverOffset: 4,
          },
        ];
        const Kwhdataset = [
          {
            label: "Consumo semanal en KiloWatts",
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            data: [0, 0],
            hoverOffset: 4,
          },
        ];
        const returnKHWatts = {
          labels: [
            "Analisis de consumo de dia",
            "Analisis de consumo de noche",
          ],
          datasets: Kwhdataset,
        };
        const returnWatts = {
          labels: ["Analisis de consumo"],
          datasets: dataset,
        };
        logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
          tags: "http",
          additionalInfo: {
            operation: "getDeviceWeekly",
            body: req.body,
            headers: req.headers,
            error: error,
            databaseOperation: "GET",
            table: config.dynamoBB.deviceReadings.name,
          },
        });
        res.status(200).json({
          usage: ob,
          health: returnObject,
          dayNight: returnWatts,
          dayNightKilowatts: returnKHWatts,
        });
      }
    }
  } else {
    var startDate = parseInt(req.params.start);
    var endDate = parseInt(req.params.end);

    var priorStartChanged = parseInt(req.params.start);
    var priorEndChanged = parseInt(req.params.end);
    const priorStartDate = new Date(priorStartChanged * 1000);
    var pastDate = priorStartDate.getDate() - 7;
    const setedStartDate = new Date();
    setedStartDate.setDate(pastDate);
    // seted final date
    const priorEndDate = new Date(priorEndChanged * 1000);
    const setedFinalDate = new Date();
    var pastFinalDate = priorEndDate.getDate() - 7;
    setedFinalDate.setDate(pastFinalDate);

    const priorEpochStart = setedStartDate / 1000;
    const priorEpochEnd = setedFinalDate / 1000;
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": startDate,
        ":end": endDate,
      },
    };
    const secondParams = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        //TODO change the dates
        ":start": priorEpochStart,
        ":end": priorEpochEnd,
      },
    };
    const data = await db.query(params).promise();
    const secondData = await db.query(secondParams).promise();
    try {
      const dayNight = await DeviceWeeklyWattsDayNightHelper(data.Items);
      const dayNightKilowatts = await DeviceWeeklyKiloWattsDayNightHelper(
        data.Items
      );
      res.status(200).json({
        usage: week,
        health: health,
        dayNight: dayNight,
        dayNightKilowatts: dayNightKilowatts,
      });
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getDeviceWeekly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
    } catch (error) {
      const ob = [
        {
          registros: 0,
          lunes: { registros: 0, amperios: 0, watts: 0 },
          martes: { registros: 0, amperios: 0, watts: 0 },
          miercoles: { registros: 0, amperios: 0, watts: 0 },
          jueves: { registros: 0, amperios: 0, watts: 0 },
          viernes: { registros: 0, amperios: 0, watts: 0 },
          sabado: { registros: 0, amperios: 0, watts: 0 },
          domingo: {
            registros: 0,
            amperios: sundayAmps || 0,
            watts: sundayWatts || 0,
          },
          totalWatts: 0,
          totalAmps: 0,
          diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: 0,
          promedioAmpsSemanal: 0,
          dayWattsProm: 0,
          NightWattsProm: 0,
          NightsKhwProm: 0,
          dayKhwProms: 0,
          Timestamp: [],
        },
      ];
      logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getDeviceWeekly",
          body: req.body,
          headers: req.headers,
          error: error,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      const returnObject = {
        health: 0,
        message: "",
        isError: true,
      };
      const dataset = [
        {
          labels: "Consumo semanal en Watts",
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          data: [0, 0],
        },
      ];
      const returnWatts = {
        label: "Analisis de consumo",
        datasets: dataset,
      };
      const Kwhdataset = [
        {
          labels: "Consumo semanal en KiloWatts",
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          data: [0, 0],
        },
      ];
      const returnKHWatts = {
        label: "Analisis de consumo",
        datasets: Kwhdataset,
      };
      res.status(200).json({
        usage: ob,
        health: returnObject,
        dayNight: returnWatts,
        dayNightKilowatts: returnKHWatts,
      });
    }
  }
});
/**
 *
 */

routes.get("/getMonthly/:day", async (req, res) => {
  let day = parseInt(req.params.day);
  let completedDay = new Date(day * 1000);
  let firstDayOfMonth = findFirstDay(
    completedDay.getFullYear(),
    completedDay.getMonth()
  );
  let secondDayOfMonth = findLastDay(
    completedDay.getFullYear(),
    completedDay.getMonth()
  );
  firstDayOfMonth.setHours(0);
  secondDayOfMonth.setHours(24);
  let firstEpoch = firstDayOfMonth / 1000;
  let secondEpoch = secondDayOfMonth / 1000;
  const priorCompletedDay = new Date(day * 1000);
  priorCompletedDay.setMonth(priorCompletedDay.getMonth() - 1);
  const priorFirstDayOfMonth = findFirstDay(
    priorCompletedDay.getFullYear(),
    priorCompletedDay.getMonth()
  );
  const priorLastDayOfMonth = findLastDay(
    priorCompletedDay.getFullYear(),
    priorCompletedDay.getMonth()
  );
  let priorFirstEpoch = priorFirstDayOfMonth / 1000;
  let priorLastDayEpoch = priorLastDayOfMonth / 1000;

  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
    KeyConditionExpression: "#key = :key and #sortkey BETWEEN :start AND :end",
    ScanIndexForward: false,
    ConsistentRead: false,
    ExpressionAttributeNames: {
      "#key": "primarykey",
      "#sortkey": "sortkey",
    },
    ExpressionAttributeValues: {
      ":key": config.deviceName,
      ":start": firstEpoch,
      ":end": secondEpoch,
    },
  };
  const secondParams = {
    TableName: config.dynamoBB.deviceReadings.name,
    KeyConditionExpression: "#key = :key and #sortkey BETWEEN :start AND :end",
    ScanIndexForward: false,
    ConsistentRead: false,
    ExpressionAttributeNames: {
      "#key": "primarykey",
      "#sortkey": "sortkey",
    },
    ExpressionAttributeValues: {
      ":key": config.deviceName,
      ":start": priorFirstEpoch,
      ":end": priorLastDayEpoch,
    },
  };

  try {
    const data = await db.query(params).promise();
    const secondData = await db.query(secondParams).promise();
    if (
      (data.ScannedCount == 0 ||
        data == null ||
        data == undefined ||
        !data ||
        data.Count == 0) &&
      (secondData.ScannedCount == 0 || secondData == undefined)
    ) {
      var MonthInformation = {
        MonthName: "",
        allMonthAmps: 0,
        allMonthWatts: 0,
        allMonthKiloWatts: 0,
        MonthDetails: {
          firstWeek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          secondWeek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          thirdweek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          fourthweek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
        },
      };
      const ob = [
        {
          detail: MonthInformation,
          count: 0,
          dayWattsProm: 0,
          NightWattsProm: 0,
          NightsKhwProm: 0,
          dayKhwProms: 0,
          Timestamp: [],
        },
      ];
      const returnObject = {
        health: 0,
        message: "",
        isError: true,
      };
      const dataset = [
        {
          labels: "Consumo Mensual en Watts",
          backgroundColor: ["blue", "red"],
          data: [0, 0],
        },
      ];
      const returnWatts = {
        label: "Analisis de consumo",
        datasets: dataset,
      };
      const Kwhdataset = [
        {
          labels: "Consumo semanal en Watts",
          backgroundColor: ["blue", "red"],
          data: [0, 0],
        },
      ];
      const returnKHWatts = {
        label: "Analisis de consumo",
        datasets: Kwhdataset,
      };

      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/getAllDeviceReadingsByGivenMonth",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res.status(200).json({
        usage: ob,
        health: returnObject,
        message: "Not Found",
        dayNight: returnWatts,
        dayNightKilowatts: returnKHWatts,
      });
    } else {
      const month = await getByMonth(data.Items);
      const health = healthMonthlyHelper(data.Items, secondData.Items);
      const dayNight = await DeviceMonthlyWattsDayNightHelper(data.Items);
      const dayNightKilowatts = await DeviceMonthlyKiloWattsDayNightHelper(
        data.Items
      );
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/getAllDeviceReadingsByGivenMonth",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res.status(200).json({
        usage: month,
        health: health,
        dayNight: dayNight,
        dayNightKilowatts: dayNightKilowatts,
      });
    }
  } catch (error) {
    var MonthInformation = {
      MonthName: "",
      allMonthAmps: 0,
      allMonthWatts: 0,
      allMonthKiloWatts: 0,
      MonthDetails: {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
      },
    };
    const ob = [
      {
        detail: MonthInformation,
        count: 0,
        dayWattsProm: 0,
        NightWattsProm: 0,
        NightsKhwProm: 0,
        dayKhwProms: 0,
        Timestamp: [],
      },
    ];
    const returnObject = {
      health: 0,
      message: "",
      isError: true,
    };
    const dataset = [
      {
        labels: "Consumo semanal en Watts",
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        data: [0, 0],
      },
    ];
    const returnWatts = {
      label: "Analisis de consumo",
      datasets: dataset,
    };
    const Kwhdataset = [
      {
        labels: "Consumo semanal en KiloWatts",
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        data: [0, 0],
      },
    ];
    const returnKHWatts = {
      label: "Analisis de consumo",
      datasets: Kwhdataset,
    };
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "Connections/getAllDeviceReadingsByGivenMonth",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
        error: error,
      },
    });
    res.status(200).json({
      usage: ob,
      health: returnObject,
      message: "",
      error: true,
      dayNight: returnWatts,
      dayNightKilowatts: returnKHWatts,
    });
  }
});
routes.get("/getYearly/", async (req, res) => {
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
  };
  try {
    const data = await db.scan(params).promise();
    if (
      data.ScannedCount == 0 ||
      data == null ||
      data == undefined ||
      !data ||
      data.Count == 0
    ) {
      let counter = 0;
      var totalWatts = 0;
      var januaryWatts = 0;
      var januaryWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      var februaryWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //March
      var MarchWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      }; // April
      var aprilWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //May
      var MayWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //June
      var JuneWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      // July
      var JulyWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      // August
      var AugustWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //September
      var SeptemberWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //October
      var OctoberWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //November
      var NovemberWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };

      //December
      var DecemberWeekDays = {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
        },
      };
      //Variables
      var FebruaryWatts = 0;
      var MarchWatts = 0;
      var AprilWatts = 0;
      var MayWatts = 0;
      var JuneWatts = 0;
      var JulyWatts = 0;
      var AugustWatts = 0;
      var SeptemberWatts = 0;
      var OctoberWatts = 0;
      var NovemberWatts = 0;
      var DecemberWatts = 0;
      var totalWAttsProm = 0;
      // Amps
      var totalAmps = 0;
      var januaryAmps = 0;
      var FebruaryAmps = 0;
      var MarchAmps = 0;
      var AprilAmps = 0;
      var MayAmps = 0;
      var JuneAmps = 0;
      var JulyAmps = 0;
      var AugustAmps = 0;
      var SeptemberAmps = 0;
      var OctoberAmps = 0;
      var NovemberAmps = 0;
      var DecemberAmps = 0;
      var totalAmpsProm = 0;
      var TimesTamp = [];
      var KiloWattsTimeStamp = [];
      const ob = [
        {
          registros: counter,
          year: LocalDate.year(),
          totalAmpsProm: totalAmpsProm,
          totalWattsProm: totalWAttsProm,
          timeStamp: TimesTamp,
          january: {
            amps: januaryAmps,
            watts: januaryWatts,
            januaryDetail: [januaryWeekDays],
          },
          February: {
            amps: FebruaryAmps,
            watts: FebruaryWatts,
            februaryDetails: [februaryWeekDays],
          },
          march: {
            amps: MarchAmps,
            watts: MarchWatts,
            marchDetails: [MarchWeekDays],
          },
          april: {
            amps: AprilAmps,
            watts: AprilWatts,
            aprilDetails: [aprilWeekDays],
          },
          may: {
            amps: MayAmps,
            watts: MayWatts,
            mayDetails: [MayWeekDays],
          },
          june: {
            amps: JuneAmps,
            watts: MayWatts,
            juneDetails: [JuneWeekDays],
          },
          july: {
            amps: JulyAmps,
            watts: JulyWatts,
            julyDetails: [JulyWeekDays],
          },
          augustus: {
            amps: AugustAmps,
            watts: AugustWatts,
            augustDetails: [AugustWeekDays],
          },
          September: {
            amps: SeptemberAmps,
            watts: SeptemberAmps,
            SeptemberDetails: [SeptemberWeekDays],
          },
          october: {
            amps: OctoberAmps,
            watts: OctoberWatts,
            OctoberDetails: [OctoberWeekDays],
          },
          november: {
            amps: NovemberAmps,
            watts: NovemberWatts,
            NovemberDetails: [NovemberWeekDays],
          },
          december: {
            amps: DecemberAmps,
            watts: DecemberWatts,
            DecemberDetails: [DecemberWeekDays],
          },
        },
      ];
      const returnObject = {
        health: 0,
        message: "",
        isError: true,
      };
      const dataset = [
        {
          labels: "Consumo semanal en Watts",
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          data: [0, 0],
        },
      ];
      const returnWatts = {
        label: "Analisis de consumo",
        datasets: dataset,
      };
      const Kwhdataset = [
        {
          labels: "Consumo semanal en KiloWatts",
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          data: [0, 0],
        },
      ];
      const returnKHWatts = {
        label: "Analisis de consumo",
        datasets: Kwhdataset,
      };
      res.status(200).json({
        usage: ob,
        health: returnObject,
        dayNight: returnWatts,
        dayNightKilowatts: returnKHWatts,
      });
    } else {
      const response = await getMonthlyHelper(data.Items);
      const health = await healthYearlyHelper(data.Items, data.Items);
      const dayNight = await DeviceMonthlyYearlyWattsDayNight(data.Items);
      const dayNightKilowatts = await DeviceMonthlyYearlyKiloWattsDayNight(
        data.Items
      );
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/GetConnectionYearly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res.status(200).json({
        usage: response,
        health: health,
        dayNight: dayNight,
        dayNightKilowatts: dayNightKilowatts,
      });
    }
  } catch (error) {
    let counter = 0;
    var totalWatts = 0;
    var januaryWatts = 0;
    var januaryWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    var februaryWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //March
    var MarchWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    }; // April
    var aprilWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //May
    var MayWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //June
    var JuneWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    // July
    var JulyWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    // August
    var AugustWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //September
    var SeptemberWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //October
    var OctoberWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //November
    var NovemberWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };

    //December
    var DecemberWeekDays = {
      firstWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      secondWeek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      thirdweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
      fourthweek: {
        monday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        tuesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        wednesday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        thursday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        friday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        saturday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        sunday: {
          Night: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Day: {
            count: 0,
            kilowatts: 0,
            watts: 0,
            amps: 0,
          },
          Total: 0,
        },
        totalKwhPerWeek: 0,
      },
    };
    //Variables
    var FebruaryWatts = 0;
    var MarchWatts = 0;
    var AprilWatts = 0;
    var MayWatts = 0;
    var JuneWatts = 0;
    var JulyWatts = 0;
    var AugustWatts = 0;
    var SeptemberWatts = 0;
    var OctoberWatts = 0;
    var NovemberWatts = 0;
    var DecemberWatts = 0;
    var totalWAttsProm = 0;
    // Amps
    var totalAmps = 0;
    var januaryAmps = 0;
    var FebruaryAmps = 0;
    var MarchAmps = 0;
    var AprilAmps = 0;
    var MayAmps = 0;
    var JuneAmps = 0;
    var JulyAmps = 0;
    var AugustAmps = 0;
    var SeptemberAmps = 0;
    var OctoberAmps = 0;
    var NovemberAmps = 0;
    var DecemberAmps = 0;
    var totalAmpsProm = 0;
    var TimesTamp = [];
    var KiloWattsTimeStamp = [];
    const ob = [
      {
        registros: counter,
        year: LocalDate.year(),
        totalAmpsProm: totalAmpsProm,
        totalWattsProm: totalWAttsProm,
        timeStamp: TimesTamp,
        january: {
          amps: januaryAmps,
          watts: januaryWatts,
          januaryDetail: [januaryWeekDays],
        },
        February: {
          amps: FebruaryAmps,
          watts: FebruaryWatts,
          februaryDetails: [februaryWeekDays],
        },
        march: {
          amps: MarchAmps,
          watts: MarchWatts,
          marchDetails: [MarchWeekDays],
        },
        april: {
          amps: AprilAmps,
          watts: AprilWatts,
          aprilDetails: [aprilWeekDays],
        },
        may: {
          amps: MayAmps,
          watts: MayWatts,
          mayDetails: [MayWeekDays],
        },
        june: {
          amps: JuneAmps,
          watts: MayWatts,
          juneDetails: [JuneWeekDays],
        },
        july: {
          amps: JulyAmps,
          watts: JulyWatts,
          julyDetails: [JulyWeekDays],
        },
        augustus: {
          amps: AugustAmps,
          watts: AugustWatts,
          augustDetails: [AugustWeekDays],
        },
        September: {
          amps: SeptemberAmps,
          watts: SeptemberAmps,
          SeptemberDetails: [SeptemberWeekDays],
        },
        october: {
          amps: OctoberAmps,
          watts: OctoberWatts,
          OctoberDetails: [OctoberWeekDays],
        },
        november: {
          amps: NovemberAmps,
          watts: NovemberWatts,
          NovemberDetails: [NovemberWeekDays],
        },
        december: {
          amps: DecemberAmps,
          watts: DecemberWatts,
          DecemberDetails: [DecemberWeekDays],
        },
      },
    ];
    const returnObject = {
      health: 0,
      message: "",
      isError: true,
    };
    const dataset = [
      {
        labels: "Consumo anual en Watts",
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        data: [0, 0],
      },
    ];
    const returnWatts = {
      label: "Analisis de consumo",
      datasets: dataset,
    };
    const Kwhdataset = [
      {
        labels: "Consumo anual en KiloWatts",
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        data: [0, 0],
      },
    ];
    const returnKHWatts = {
      label: "Analisis de consumo",
      datasets: Kwhdataset,
    };
    res.status(200).json({
      usage: ob,
      health: returnObject,
      message: "",
      error: true,
      dayNight: returnWatts,
      dayNightKilowatts: returnKHWatts,
    });
  }
});
routes.get("/getDeviceYearly/allConfig", async (req, res) => {
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
  };
  const result = await db.scan(params).promise();
  try {
    const data = await getMonthlyHelper(result.Items);
    const health = await healthYearlyHelper(result.Items, result.Items);
    const dayNight = await DeviceWeeklyWattsDayNightHelper(data.Items);
    const dayNightKilowatts = await DeviceWeeklyKiloWattsDayNightHelper(
      data.Items
    );
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceYearly",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });
    res.status(200).json({
      usage: data,
      health: health,
      dayNight: dayNight,
      dayNightKilowatts: dayNightKilowatts,
    });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceYearly",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });
    res.status(400).json({ error: error });
  }
});
/**
 *
 */
routes.get("/getDeviceConfiguration/:userName", async (req, res) => {
  let userName = req.params.userName;
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    ExpressionAttributeValues: {
      ":userN": userName,
    },
    KeyConditionExpression: `#user = :userN`,
    ExpressionAttributeNames: {
      "#user": "userName",
    },
  };
  try {
    const result = await db.query(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceConfiguration",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(200).json({ configuration: result.Items });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceConfiguration",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(400).json({ error: error });
  }
});
/**
 *  Get the Device Relays by the UserName
 */
routes.get("/getDeviceRelays/:userName", async (req, res) => {
  let userName = req.params.userName;
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    ExpressionAttributeValues: {
      ":userName": userName,
    },
    KeyConditionExpression: `#user = :userName`,
    ExpressionAttributeNames: {
      "#user": "userName",
    },
  };
  const result = await db.query(params).promise();
  if (
    result.ScannedCount == 1 ||
    result.Count == 1 ||
    result.Items.length == 1
  ) {
    var deviceName = result.Items[0].deviceName;
    var time = Math.floor(Date.now() / 1000);
    var timeFloat = parseFloat(time);
    const data = await db
      .query({
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression: "#key = :key and #sortkey <= :timestamp",
        ScanIndexForward: false,
        ConsistentRead: false,
        Limit: 1,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": deviceName,
          ":timestamp": timeFloat,
        },
      })
      .promise();
    if (data.ScannedCount == 0) {
      res.status(200).json({
        error: true,
        message: "debe de conectar el dispositivo para obtener las conexiones",
      });
    } else {
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getDeviceRelays",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res.status(200).json({ data: data.Items[0].Relays });
    }
  } else {
    res.status(200).json({
      error: true,
      message: "debe de conectar el dispositivo para obtener las conexiones",
    });
  }
});
routes.get("/getDeviceRelaysTwo/:userName", async (req, res) => {
  let userName = "claudioraulmercedes@gmail.com";
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
    ExpressionAttributeValues: {
      ":userName": userName,
    },
    KeyConditionExpression: `#user = :userName`,
    ExpressionAttributeNames: {
      "#user": "userName",
    },
  };
  const data = await db.query(params).promise();
  res.status(200).json({ data: data });
  // try {
  //   if (!req.params.userName) {
  //       return res.status(400).json({
  //           status: 'error',
  //           error: 'req body cannot be empty',
  //         });
  //   }
  //   const result = await db.query(params).promise();
  //   if (result.ScannedCount == 1 || result.Count == 1 || result.Items.length == 1) {
  //     try {
  //       var deviceName = result.Items[0].deviceName;
  //       var time = Math.floor(Date.now()/1000)
  //       var timeFloat = parseFloat(time);
  //       const data = await db.query({
  //         TableName: config.dynamoBB.deviceReadings.name,
  //         KeyConditionExpression:'#key = :key and #sortkey <= :timestamp',
  //         ScanIndexForward: false,
  //         ConsistentRead: false,
  //         Limit:1,
  //         ExpressionAttributeNames:{
  //           '#key': 'primarykey',
  //           '#sortkey': 'sortkey',
  //         },
  //         ExpressionAttributeValues:{
  //           ':key':deviceName,
  //           ':timestamp': timeFloat
  //         }

  //       }).promise();

  //       if (data.ScannedCount == 0 || data == null || data == undefined || !data || data.Count == 0){
  //         res.status(404).json({notfound:'NO ROWS'});
  //       }
  //       logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, {tags: 'http', additionalInfo: {operation: 'getDeviceRelays',body: req.body, headers: req.headers,databaseOperation:'GET', table: config.dynamoBB.deviceReadings.name }});
  //       res.status(200).json({data:data.Items[0].Relays});
  //     } catch (error) {
  //       logger.log('error', `Requesting ${req.method} ${req.originalUrl}`, {tags: 'http', additionalInfo: {operation: 'getDeviceRelays',body: req.body, headers: req.headers, error:error,databaseOperation:'GET', table: config.dynamoBB.deviceReadings.name  }});
  //       res.status(400).json({error: error});
  //     }
  //   }
  //   else{
  //     res.status(404).json({result:'not found'});
  //   }
  // } catch (error) {
  //   logger.log('error', `Requesting ${req.method} ${req.originalUrl}`, {tags: 'http', additionalInfo: {operation: 'getDeviceRelays',body: req.body, headers: req.headers, error:error,databaseOperation:'GET', table: config.dynamoBB.deviceReadings.name  }});
  //   res.status(400).json({error: error});
  // }
});
routes.post("/addDeviceConfiguration", async (req, res) => {
  const data = req.body;
  let createdDate = new Date();
  let updateDate = new Date();
  createdDate.getDate();
  updateDate.getDate();

  const params = {
    TableName: config.dynamoBB.deviceConfiguration.name,
    Item: {
      configurationId: uuidv4(),
      deviceId: data.deviceId,
      configurationName: data.configurationName,
      status: data.status,
      configurationDays: data.configurationDays,
      connectionsConfigurations: data.connectionsConfigurations,
      configurationMaximumKilowattsPerDay:
        data.configurationMaximumKilowattsPerDay,
      registeredAt: createdDate.toLocaleDateString(),
      updatedAt: updateDate.toLocaleDateString(),
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "addDeviceConfiguration",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceConfiguration.name,
      },
    });
    res.status(200).json({ status: 200, success: true });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getDeviceRelays",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });
    res.status(400).json({ status: 400, success: false, error: error });
  }
});
routes.get("/getArduinoDeviceConfiguration/:deviceId", async (req, res) => {
  var userName = req.params.deviceId;
  const params = {
    TableName: config.dynamoBB.deviceConfiguration.name,
    ExpressionAttributeValues: {
      ":userName": userName,
    },
    KeyConditionExpression: `#user = :userName`,
    ExpressionAttributeNames: {
      "#user": "deviceId",
    },
  };
  try {
    const result = await db.query(params).promise();
    if (
      result.ScannedCount == 1 ||
      result.Count == 1 ||
      result.Items.length == 1
    ) {
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getArduinoDeviceConfiguration",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceConfiguration.name,
        },
      });

      res.status(200).json({ status: 200, deviceConfiguration: result.Items });
    } else {
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getArduinoDeviceConfiguration",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceConfiguration.name,
        },
      });

      rest.status(200).json({ status: 200, deviceConfiguration: [] });
    }
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getArduinoDeviceConfiguration",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceConfiguration.name,
      },
    });

    res.status(400).json({ status: 400, error: error });
  }
});
routes.get("/getAllDeviceReadingsByMonth", async (req, res) => {
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
  };
  const result = await db.scan(params).promise();
  if (result != undefined) {
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getArduinoDeviceConfiguration",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceConfiguration.name,
      },
    });
    res.status(200).json({ readings: result });
  } else {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getArduinoDeviceConfiguration",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceConfiguration.name,
      },
    });
    res.status(400).json({ error: result });
  }
});
routes.get("/getAllDeviceReadingsByGivenDay/:day", async (req, res) => {
  let day = parseInt(req.params.day);
  const moment = require("moment");
  let completedDay = new Date(day * 1000);
  let completedDay2 = new Date(day * 1000);
  completedDay.setHours(0);
  completedDay2.setHours(24);
  let firstEpoch = completedDay / 1000;
  let secondEpoch = completedDay2 / 1000;
  if (day != undefined || day != null) {
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": firstEpoch,
        ":end": secondEpoch,
      },
    };
    const data = await db.query(params).promise();
    if (
      data.ScannedCount == 0 ||
      data == null ||
      data == undefined ||
      !data ||
      data.Count == 0
    ) {
      var dayInformation = {
        AlldayName: "",
        AlldayAmps: 0,
        AlldayWatts: 0,
        AlldayKiloWatts: 0,
        DayDetails: {
          Night: {
            amps: 0,
            watts: 0,
            kilowatts: 0,
          },
          Day: {
            amps: 0,
            watts: 0,
            kilowatts: 0,
          },
        },
      };
      const ob = [{ Detail: dayInformation }];
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getAllDeviceReadingsByGivenDay",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({
        usage: ob,
        message: "Not Found",
        countedRows: data.ScannedCount,
      });
    } else {
      const day = await dailyHelper(data.Items);
      res.status(200).json({ usage: day, Items: data.Items });
    }
  } else {
    const moment = require("moment");
    let completedDay = new Date();
    let completedDay2 = new Date();
    completedDay.setHours(0);
    completedDay2.setHours(24);
    let firstEpoch = completedDay / 1000;
    let secondEpoch = completedDay2 / 1000;
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": firstEpoch,
        ":end": secondEpoch,
      },
    };
    const data = await db.query(params).promise();
    if (
      data.ScannedCount == 0 ||
      data == null ||
      data == undefined ||
      !data ||
      data.Count == 0
    ) {
      var dayInformation = {
        AlldayName: "",
        AlldayAmps: 0,
        AlldayWatts: 0,
        AlldayKiloWatts: 0,
        DayDetails: {
          Night: {
            amps: 0,
            watts: 0,
            kilowatts: 0,
          },
          Day: {
            amps: 0,
            watts: 0,
            kilowatts: 0,
          },
        },
      };
      const ob = [{ Detail: dayInformation }];
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getAllDeviceReadingsByGivenDay",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: ob, message: "Not Found" });
    } else {
      const day = await dailyHelper(data.Items);
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getAllDeviceReadingsByGivenDay",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: day, Items: data.Items });
    }
  }
});

routes.get("/getAllDeviceReadingsByGivenMonth/:day", async (req, res) => {
  let day = parseInt(req.params.day);
  let completedDay = new Date(day * 1000);
  let firstDayOfMonth = findFirstDay(
    completedDay.getFullYear(),
    completedDay.getMonth()
  );
  let secondDayOfMonth = findLastDay(
    completedDay.getFullYear(),
    completedDay.getMonth()
  );

  firstDayOfMonth.setHours(0);
  secondDayOfMonth.setHours(24);
  let firstEpoch = firstDayOfMonth / 1000;
  let secondEpoch = secondDayOfMonth / 1000;
  const params = {
    TableName: config.dynamoBB.deviceReadings.name,
    KeyConditionExpression: "#key = :key and #sortkey BETWEEN :start AND :end",
    ScanIndexForward: false,
    ConsistentRead: false,
    ExpressionAttributeNames: {
      "#key": "primarykey",
      "#sortkey": "sortkey",
    },
    ExpressionAttributeValues: {
      ":key": config.deviceName,
      ":start": firstEpoch,
      ":end": secondEpoch,
    },
  };
  const data = await db.query(params).promise();
  if (
    data.ScannedCount == 0 ||
    data == null ||
    data == undefined ||
    !data ||
    data.Count == 0
  ) {
    var MonthInformation = {
      MonthName: "",
      allMonthAmps: 0,
      allMonthWatts: 0,
      allMonthKiloWatts: 0,
      MonthDetails: {
        firstWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
        secondWeek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
        thirdweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
        fourthweek: {
          monday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          tuesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          wednesday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          thursday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          friday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          saturday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          sunday: {
            Night: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Day: {
              count: 0,
              kilowatts: 0,
              watts: 0,
              amps: 0,
            },
            Total: 0,
          },
          totalKwhPerWeek: 0,
          TimeStamp: [],
        },
      },
    };
    const ob = [{ Detail: MonthInformation }];
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getAllDeviceReadingsByGivenMonth",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });

    res.status(200).json({ usage: ob, message: "Not Found" });
  } else {
    const month = await getByMonth(data.Items);
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "getAllDeviceReadingsByGivenMonth",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceReadings.name,
      },
    });

    res.status(200).json({ usage: month });
  }
});
/**
 *
 */
routes.get(
  "/getAllDeviceReadingsByGivenParametersMonthly/:startDate/:endDate",
  async (req, res) => {
    let day = parseInt(req.params.startDate);
    let finalDay = parseInt(req.params.endDate);
    let completedDay = new Date(day * 1000);
    let secondCompletedDay = new Date(finalDay * 1000);
    let firstDayOfMonth = findFirstDay(
      completedDay.getFullYear(),
      completedDay.getMonth()
    );
    let secondDayOfMonth = findLastDay(
      secondCompletedDay.getFullYear(),
      secondCompletedDay.getMonth()
    );
    firstDayOfMonth.setHours(0);
    secondDayOfMonth.setHours(24);
    let firstEpoch = firstDayOfMonth / 1000;
    let secondEpoch = secondDayOfMonth / 1000;
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": firstEpoch,
        ":end": secondEpoch,
      },
    };
    const data = await db.query(params).promise();
    if (
      data.ScannedCount == 0 ||
      data == null ||
      data == undefined ||
      !data ||
      data.Count == 0
    ) {
      var MonthInformation = {
        MonthName: "",
        allMonthAmps: 0,
        allMonthWatts: 0,
        allMonthKiloWatts: 0,
        MonthDetails: {
          firstWeek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          secondWeek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          thirdweek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          fourthweek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
        },
      };
      const ob = [{ Detail: MonthInformation }];
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getAllDeviceReadingsByGivenParametersMonthly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res
        .status(200)
        .json({ usage: ob, message: "Not Found", dataFound: data });
    } else {
      const month = await DeviceGraphHelper(data.Items);
      const elapsedT = await elapsedTime(completedDay, secondCompletedDay);
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "getAllDeviceReadingsByGivenParametersMonthly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: month, elapsedTime: elapsedT });
    }
  }
);
routes.get(
  "/Connections/getAllDeviceReadingsByGivenParametersMonthly/:startDate/:endDate/:ConnectionName",
  async (req, res) => {
    let day = parseInt(req.params.startDate);
    let finalDay = parseInt(req.params.endDate);
    let completedDay = new Date(day * 1000);
    let secondCompletedDay = new Date(finalDay * 1000);
    let firstDayOfMonth = findFirstDay(
      completedDay.getFullYear(),
      completedDay.getMonth()
    );
    let secondDayOfMonth = findLastDay(
      secondCompletedDay.getFullYear(),
      secondCompletedDay.getMonth()
    );
    firstDayOfMonth.setHours(0);
    secondDayOfMonth.setHours(24);
    let firstEpoch = firstDayOfMonth / 1000;
    let secondEpoch = secondDayOfMonth / 1000;
    var ConnectionName = req.params.ConnectionName;
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": firstEpoch,
        ":end": secondEpoch,
      },
    };
    const data = await db.query(params).promise();
    if (
      data.ScannedCount == 0 ||
      data == null ||
      data == undefined ||
      data.Count == 0
    ) {
      const ob = [
        {
          registros: 0,
          Connextion: ConnectionName,
          Timestamp: [],
          lunes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          martes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          miercoles: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          jueves: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          viernes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          sabado: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          domingo: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
          totalWatts: 0,
          totalAmps: 0,
          diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: 0,
          promedioAmpsSemanal: 0,
          promedioKwhSemanal: 0,
          usage: data.Items,
        },
      ];
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/getAllDeviceReadingsByGivenParametersMonthly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: ob });
    } else {
      const usage = await ConnectionGrahphHelper(ConnectionName, data.Items);
      const elapsedT = await elapsedTime(completedDay, secondCompletedDay);
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/getAllDeviceReadingsByGivenParametersMonthly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: usage, elapsedTime: elapsedT });
    }
  }
);

routes.get(
  "/Connections/getConnectionReadingsCurrentWeek/:start/:end/:ConnectionName",
  async (req, res) => {
    var ConnectionName = req.params.ConnectionName;
    if (
      ConnectionName == "" ||
      ConnectionName == null ||
      ConnectionName == undefined
    ) {
      res.status(404).json({ error: "The name is incorrect" });
    }
    if (parseInt(req.params.start) > parseInt(req.params.end)) {
      var startChanged = parseInt(req.params.end);
      var endChanged = parseInt(req.params.start);
      var priorStartChanged = parseInt(req.params.end);
      var priorEndChanged = parseInt(req.params.start);
      const priorStartDate = new Date(priorStartChanged * 1000);
      var pastDate = priorStartDate.getDate() - 7;
      const setedStartDate = new Date();
      setedStartDate.setDate(pastDate);
      // seted final date
      const priorEndDate = new Date(priorEndChanged * 1000);
      const setedFinalDate = new Date();
      var pastFinalDate = priorEndDate.getDate() - 7;
      setedFinalDate.setDate(pastFinalDate);

      const priorEpochStart = setedStartDate / 1000;
      const priorEpochEnd = setedFinalDate / 1000;
      const params = {
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortkey BETWEEN :start AND :end",
        ScanIndexForward: false,
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": startChanged,
          ":end": endChanged,
        },
      };
      const Secondparams = {
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortkey BETWEEN :start AND :end",
        ScanIndexForward: false,
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": priorEpochStart,
          ":end": priorEpochEnd,
        },
      };
      const data = await db.query(params).promise();
      const secondData = await db.query(Secondparams).promise();
      if (
        (data.ScannedCount == 0 ||
          data == null ||
          data == undefined ||
          data.Count == 0) &&
        (secondData.ScannedCount == 0 || secondData == undefined)
      ) {
        const ob = [
          {
            registros: 0,
            Connextion: ConnectionName,
            Timestamp: [],
            lunes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            martes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            miercoles: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            jueves: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            viernes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            sabado: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            domingo: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            totalWatts: 0,
            totalAmps: 0,
            diaConsulta: new Date().toISOString(),
            promedioWattsSemanal: 0,
            promedioAmpsSemanal: 0,
            promedioKwhSemanal: 0,
            usage: data.Items,
          },
        ];
        const returnObject = {
          health: 0,
          message: "",
          isError: true,
        };
        res.status(200).json({ usage: ob, health: returnObject });
        logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
          tags: "http",
          additionalInfo: {
            operation: "Connections/getConnectionReadingsCurrentWeek",
            body: req.body,
            headers: req.headers,
            databaseOperation: "GET",
            table: config.dynamoBB.deviceReadings.name,
          },
        });
      } else {
        try {
          const week = await dailyHelperFromConnections(
            ConnectionName,
            data.Items
          );
          const health = await ConnectionsHealthWeeklyHelper(
            ConnectionName,
            data.Items,
            secondData.Items
          );
          res.status(200).json({ usage: week, health: health });
        } catch (error) {
          logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
            tags: "http",
            additionalInfo: {
              operation: "Connections/getConnectionReadingsCurrentWeek",
              body: req.body,
              headers: req.headers,
              error: error,
              databaseOperation: "GET",
              table: config.dynamoBB.deviceReadings.name,
            },
          });

          const ob = [
            {
              registros: 0,
              Connextion: ConnectionName,
              Timestamp: [],
              lunes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              martes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              miercoles: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              jueves: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              viernes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              sabado: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              domingo: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              totalWatts: 0,
              totalAmps: 0,
              diaConsulta: new Date().toISOString(),
              promedioWattsSemanal: 0,
              promedioAmpsSemanal: 0,
              promedioKwhSemanal: 0,
            },
          ];
          const returnObject = {
            health: 0,
            message: "",
            isError: true,
          };
          res
            .status(200)
            .json({ usage: ob, health: returnObject, err2: error });
        }
      }
    } else {
      const params = {
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortkey BETWEEN :start AND :end",
        ScanIndexForward: false,
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": parseInt(req.params.start),
          ":end": parseInt(req.params.end),
        },
      };
      var startChanged = parseInt(req.params.end);
      var endChanged = parseInt(req.params.start);
      var priorStartChanged = parseInt(req.params.end);
      var priorEndChanged = parseInt(req.params.start);
      const priorStartDate = new Date(priorStartChanged * 1000);
      var pastDate = priorStartDate.getDate() - 7;
      const setedStartDate = new Date();
      setedStartDate.setDate(pastDate);
      // seted final date
      const priorEndDate = new Date(priorEndChanged * 1000);
      const setedFinalDate = new Date();
      var pastFinalDate = priorEndDate.getDate() - 7;
      setedFinalDate.setDate(pastFinalDate);

      const priorEpochStart = setedStartDate / 1000;
      const priorEpochEnd = setedFinalDate / 1000;
      const secondParams = {
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortkey BETWEEN :start AND :end",
        ScanIndexForward: false,
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": priorEpochEnd,
          ":end": priorEpochStart,
        },
      };
      const data = await db.query(params).promise();
      const secondData = await db.query(secondParams).promise();
      if (
        (data.ScannedCount == 0 ||
          data == null ||
          data == undefined ||
          !data ||
          data.Count == 0) &&
        (secondData.ScannedCount == 0 || secondData == undefined)
      ) {
        const ob = [
          {
            registros: 0,
            Connextion: ConnectionName,
            Timestamp: [],
            lunes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            martes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            miercoles: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            jueves: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            viernes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            sabado: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            domingo: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
            totalWatts: 0,
            totalAmps: 0,
            diaConsulta: new Date().toISOString(),
            promedioWattsSemanal: 0,
            promedioAmpsSemanal: 0,
            promedioKwhSemanal: 0,
            usage: data.Items,
          },
        ];
        const returnObject = {
          health: 0,
          message: "",
          isError: true,
        };
        res.status(200).json({ usage: ob, health: returnObject });
      } else {
        try {
          const week = await dailyHelperFromConnections(
            ConnectionName,
            data.Items
          );
          const health = await ConnectionsHealthWeeklyHelper(
            ConnectionName,
            data.Items,
            secondData.Items
          );
          logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
            tags: "http",
            additionalInfo: {
              operation: "Connections/getConnectionReadingsCurrentWeek",
              body: req.body,
              headers: req.headers,
              databaseOperation: "GET",
              table: config.dynamoBB.deviceReadings.name,
            },
          });

          res.status(200).json({ usage: week, health: health });
        } catch (error) {
          const ob = [
            {
              registros: 0,
              Connextion: ConnectionName,
              Timestamp: [],
              lunes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              martes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              miercoles: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              jueves: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              viernes: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              sabado: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              domingo: { registros: 0, amperios: 0, watts: 0, Timestamp: [] },
              totalWatts: 0,
              totalAmps: 0,
              diaConsulta: new Date().toISOString(),
              promedioWattsSemanal: 0,
              promedioAmpsSemanal: 0,
              promedioKwhSemanal: 0,
            },
          ];
          const returnObject = {
            health: 0,
            message: "",
            isError: true,
          };
          logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
            tags: "http",
            additionalInfo: {
              operation: "Connections/getConnectionReadingsCurrentWeek",
              body: req.body,
              headers: req.headers,
              error: error,
              databaseOperation: "GET",
              table: config.dynamoBB.deviceReadings.name,
            },
          });
          res.status(200).json({ usage: ob, health: returnObject });
        }
      }
    }
  }
);

routes.get(
  "/Connections/getAllDeviceReadingsByGivenMonth/:day/:ConnectionName",
  async (req, res) => {
    let day = parseInt(req.params.day);
    var ConnectionName = req.params.ConnectionName;
    let completedDay = new Date(day * 1000);
    let firstDayOfMonth = findFirstDay(
      completedDay.getFullYear(),
      completedDay.getMonth()
    );
    let secondDayOfMonth = findLastDay(
      completedDay.getFullYear(),
      completedDay.getMonth()
    );

    firstDayOfMonth.setHours(0);
    secondDayOfMonth.setHours(24);
    let firstEpoch = firstDayOfMonth / 1000;
    let secondEpoch = secondDayOfMonth / 1000;
    const priorCompletedDay = new Date(day * 1000);
    priorCompletedDay.setMonth(priorCompletedDay.getMonth() - 1);
    const priorFirstDayOfMonth = findFirstDay(
      priorCompletedDay.getFullYear(),
      priorCompletedDay.getMonth()
    );
    const priorLastDayOfMonth = findLastDay(
      priorCompletedDay.getFullYear(),
      priorCompletedDay.getMonth()
    );
    let priorFirstEpoch = priorFirstDayOfMonth / 1000;
    let priorLastDayEpoch = priorLastDayOfMonth / 1000;
    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": firstEpoch,
        ":end": secondEpoch,
      },
    };
    const secondParams = {
      TableName: config.dynamoBB.deviceReadings.name,
      KeyConditionExpression:
        "#key = :key and #sortkey BETWEEN :start AND :end",
      ScanIndexForward: false,
      ConsistentRead: false,
      ExpressionAttributeNames: {
        "#key": "primarykey",
        "#sortkey": "sortkey",
      },
      ExpressionAttributeValues: {
        ":key": config.deviceName,
        ":start": priorFirstEpoch,
        ":end": priorLastDayEpoch,
      },
    };
    const data = await db.query(params).promise();
    const secondData = await db.query(secondParams).promise();
    if (
      (data.ScannedCount == 0 ||
        data == null ||
        data == undefined ||
        !data ||
        data.Count == 0) &&
      (secondData.ScannedCount == 0 || secondData == undefined)
    ) {
      var MonthInformation = {
        MonthName: "",
        allMonthAmps: 0,
        allMonthWatts: 0,
        allMonthKiloWatts: 0,
        MonthDetails: {
          firstWeek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          secondWeek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          thirdweek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
          fourthweek: {
            monday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            tuesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            wednesday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            thursday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            friday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            saturday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            sunday: {
              Night: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Day: {
                count: 0,
                kilowatts: 0,
                watts: 0,
                amps: 0,
              },
              Total: 0,
            },
            totalKwhPerWeek: 0,
            TimeStamp: [],
          },
        },
      };
      const returnObject = {
        health: 0,
        message: "",
        isError: true,
      };
      const ob = [{ Detail: MonthInformation }];
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/getAllDeviceReadingsByGivenMonth",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res
        .status(200)
        .json({ usage: ob, health: returnObject, message: "Not Found" });
    } else {
      const month = await getByMonthConnections(ConnectionName, data.Items);
      const health = await ConnectionsHealthYearlyHelper(
        ConnectionName,
        data.Items,
        secondData.Items
      );
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/getAllDeviceReadingsByGivenMonth",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res.status(200).json({ usage: month, health: health });
    }
  }
);

routes.get(
  "/Connections/GetConnectionYearly/allConfig/:ConnectionName",
  async (req, res) => {
    let connectionName = req.params.ConnectionName;

    const params = {
      TableName: config.dynamoBB.deviceReadings.name,
    };
    try {
      const result = await db.scan(params).promise();
      const health = await ConnectionsHealthMonthlyHelper(
        ConnectionName,
        data.Items,
        data.Items
      );
      const data = await getMonthlyHelperConnection(
        connectionName,
        result.Items
      );
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/GetConnectionYearly",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: data, health: health });
    } catch (error) {
      logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/GetConnectionYearly",
          body: req.body,
          headers: req.headers,
          error: error,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });
      res.status(400).json({ error: error });
    }
  }
);

routes.get(
  "/Connections/GetConnectionsReadingsByGivenDay/:day/:ConnectionName",
  async (req, res) => {
    let day = parseInt(req.params.day);
    let connectionName = req.params.ConnectionName;
    let completedDay = new Date(day * 1000);
    let completedDay2 = new Date(day * 1000);
    completedDay.setHours(0);
    completedDay2.setHours(24);
    let firstEpoch = completedDay / 1000;
    let secondEpoch = completedDay2 / 1000;
    if (day != undefined || day != null) {
      const params = {
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortkey BETWEEN :start AND :end",
        ScanIndexForward: false,
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": firstEpoch,
          ":end": secondEpoch,
        },
      };
      const data = await db.query(params).promise();
      if (
        data.ScannedCount == 0 ||
        data == null ||
        data == undefined ||
        !data ||
        data.Count == 0
      ) {
        var dayInformation = {
          AlldayName: "",
          AlldayAmps: 0,
          AlldayWatts: 0,
          AlldayKiloWatts: 0,
          DayDetails: {
            Night: {
              amps: 0,
              watts: 0,
              kilowatts: 0,
            },
            Day: {
              amps: 0,
              watts: 0,
              kilowatts: 0,
            },
          },
        };
        const ob = [{ Detail: dayInformation }];
        logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
          tags: "http",
          additionalInfo: {
            operation: "Connections/GetConnectionsReadingsByGivenDay",
            body: req.body,
            headers: req.headers,
            databaseOperation: "GET",
            table: config.dynamoBB.deviceReadings.name,
          },
        });

        res.status(200).json({
          usage: ob,
          message: "Not Found",
          countedRows: data.ScannedCount,
        });
      }
    } else {
      const day = await connectionsDailyHelper(connectionName, data.Items);
      logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
        tags: "http",
        additionalInfo: {
          operation: "Connections/GetConnectionsReadingsByGivenDay",
          body: req.body,
          headers: req.headers,
          databaseOperation: "GET",
          table: config.dynamoBB.deviceReadings.name,
        },
      });

      res.status(200).json({ usage: day });
    }
  }
);
routes.get("/Tensorflow/PredictConsumption/", async (req, res) => {
  let deviceId = req.params.deviceId;
  const params = {
    TableName: config.dynamoBB.deviceTable.name,
  };

  try {
    const result = await db.scan(params).promise();
    const data = result.Items[0];

    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "PredictConsumption",
        body: req.body,
        headers: req.headers,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceConfiguration.name,
      },
    });
    if (data == null) {
      res
        .status(200)
        .json({ success: false, message: "no configuration was found" });
    }
    try {
      let dates = changeDates(15, 15);
      const params2 = {
        TableName: config.dynamoBB.deviceReadings.name,
        KeyConditionExpression:
          "#key = :key and #sortkey BETWEEN :start AND :end",
        ScanIndexForward: false,
        ConsistentRead: false,
        ExpressionAttributeNames: {
          "#key": "primarykey",
          "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: {
          ":key": config.deviceName,
          ":start": dates.initialDate,
          ":end": dates.finalDate,
        },
      };
      const data = await db.query(params2).promise();
      let returnedData = mapDataToTensorFlow(data.Items);
      res.status(200).json({ success: true, data: returnedData, dates: dates });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "PredictConsumption",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "GET",
        table: config.dynamoBB.deviceConfiguration.name,
      },
    });
  }
});
routes.post("/Topics/publishTopic", async (req, res) => {
  const data = req.body;

  try {
    var params = {
      topic: data.topic,
      payload: data.payload,
      qos: 0,
    };
    const response = iotData.publish(params, function (err, data) {
      if (err) {
        res.status(400).json({ success: false, error: err });
        logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
          tags: "http",
          additionalInfo: {
            operation: "publishTopic",
            body: req.body,
            headers: req.headers,
            error: err,
            databaseOperation: "POST",
          },
        });
      }
    });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "publishTopic",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
      },
    });
  }
});
routes.post("/createTemplate", async (req, res) => {
  const { templateName, subject, body } = req.body;

  var params = {
    Template: {
      TemplateName: templateName,
      HtmlPart: body,
      SubjectPart: subject,
    },
  };

  email.createTemplate(params, function (err, data) {
    if (err) {
      res.status(400).send({ error: err, sentParams: params });
    } else {
      res.status(200).send({ data: data });
    }
  });
});
routes.post("/sendEmail", async (req, res) => {
  const { templateName, subject, body, sendTo, source } = req.body;

  // var params = {
  //   Template: {
  //     TemplateName: templateName,
  //     HtmlPart: body,
  //     SubjectPart: subject,
  //   }
  // };
  const params2 = {
    Template: templateName,
    Destination: {
      ToAddresses: [sendTo],
    },
    Source: source, // use the SES domain or email verified in your account
    TemplateData: JSON.stringify({}),
  };

  email.sendTemplatedEmail(params2, function (err, data) {
    if (err) {
      res.status(400).send({ error: err, sentParams: params2 });
    } else {
      res.status(200).send({ data: data });
    }
  });
});
routes.post("/verifyEmail", async (req, res) => {
  const { templateName, subject, body, sendTo, source } = req.body;
  const verifyEmail = email
    .verifyEmailAddress({ EmailAddress: source })
    .promise();
  verifyEmail
    .then((email) => {
      res.status(200).send({ email: email });
    })
    .catch((error) => {
      res.status(400).send({ error: error });
    });
});
routes.post("/insertToken", async (req, res) => {
  const data = req.body;
  let createdDate = new Date();
  const params = {
    TableName: config.dynamoBB.userDevice.name,
    Item: {
      userName: "claudioraulmercedes@gmail.com",
      token: data.token,
      registeredAt: createdDate.toString(),
    },
  };
  try {
    await db.put(params).promise();
    logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "insertToken",
        body: req.body,
        headers: req.headers,
        databaseOperation: "POST",
        table: config.dynamoBB.userDevice.name,
      },
    });
    res
      .status(201)
      .json({ status: true, message: "token insertado correctamente" });
  } catch (error) {
    logger.log("error", `Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        operation: "createDevice",
        body: req.body,
        headers: req.headers,
        error: error,
        databaseOperation: "POST",
        table: config.dynamoBB.deviceTable.name,
      },
    });
    res.status(201).json({ status: false, error: error });
  }
});

module.exports = {
  routes,
};
