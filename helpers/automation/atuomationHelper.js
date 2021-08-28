const { writeToDynamoDB } = require("../../functions/generalFunctions");
const { publishSNS } = require("../../sns/sns-helper");
const logger = require("../../helpers/log/logsHelper");
const { config } = require("../../connections/config/config");
const admin = require("firebase-admin");
const { dynamoDBConnection } = require("../../connections/connections");
var serviceAccount = require("../../connections/config/firebase.config.json");
const {writeToDynamoDB} = require("../../functions/generalFunctions");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging();
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} date date Object
 * @returns boolean
 */
module.exports.isInCurrentMonth = function (date) {
  const moment = require("moment");
  var now = moment();
  var input = moment(date);
  return now.month() == input.month();
};
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} watts watts
 * @param {*} seconds seconds
 * @returns watts
 */
module.exports.calculateKwh = function (watts, seconds) {
  const kwh = (watts * seconds * (1 / (60 * 60))) / 590;
  return Math.abs(kwh);
};
/**
 * @function calculateSeconds
 * @param {*} dateOne dateOne
 * @param {*} dateTwo dateTwo
 * @returns seconds
 * @author Claudio Raul Brito Mercedes
 */
module.exports.calculateSeconds = function (dateOne, dateTwo) {
  const seconds = (dateOne.getTime() - dateTwo.getTime()) / 1000;
  return Math.abs(seconds);
};
/**
 * @function convertEpochDateToHumanDate
 * @author Claudio Raul Brito Mercedes
 * @param {*} epochDate epochDate
 * @returns date
 */
module.exports.convertEpochDateToHumanDate = function (epochDate) {
  return new Date(epochDate * 1000);
};
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} data
 * @returns array
 * @author Claudio Raul Brito Mercedes
 */
module.exports.calculateDeviceInSameWeek = function (data) {
  let totalKwh = 0;
  let secondTotalKwh = 0;
  const moment = require("moment");
  for (let index = 0; index < data.length; index++) {
    var dataElement = data[index];
    var secondDataElement = data[index + 1];
    if (secondDataElement == undefined) {
      break;
    }
    var sortkeyDate = dataElement.sortkey;
    if (sortkeyDate === undefined) {
      break;
    }
    var secondkeyDate = secondDataElement.sortkey;
    if (secondkeyDate === undefined) {
      break;
    }
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
    var secondSortKeyEpoch =
      module.exports.convertEpochDateToHumanDate(secondkeyDate);
    var LocalDate = moment(sortKeyEpoch);
    moment.locale("es-do");
    LocalDate.locale(false);
    var readings2 = data[index].readings;
    var isInTheSameDay = IsInCurrentWeek(sortKeyEpoch);
    if (isInTheSameDay === false) {
      break;
    }
    for (let j = 0; j <= Object.keys(readings2).length; j++) {
      const seconds = module.exports.calculateSeconds(
        secondSortKeyEpoch,
        sortKeyEpoch
      );
      const kwh = module.exports.calculateKwh(readings2.device_watts, seconds);
      totalKwh += kwh;
    }
    const seconds2 = module.exports.calculateSeconds(
      secondSortKeyEpoch,
      sortKeyEpoch
    );
    const kwh2 = module.exports.calculateKwh(readings2.device_watts, seconds2);
    secondTotalKwh += kwh2;
  }
  return secondTotalKwh;
};
/**
 * @function calculateSameDay
 * @param {*} date date object
 * @returns date
 * @author Claudio Raul Brito Mercedes
 */
module.exports.calculateSameDay = function (date) {
  const moment = require("moment");
  var now = moment();
  var input = moment(date);
  return now.isSame(input, "day");
};
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} date date
 * @returns date
 */
module.exports.isInCurrentMonth = function (date) {
  const moment = require("moment");
  var now = moment();
  var input = moment(date);
  return now.month() == input.month();
};
/**
 *
 * @param {*} data data object
 * @param {*} connectionName connection Name
 * @returns array <any>
 */
module.exports.CalculateConnectionsInWeeklyConfig = function (
  data,
  connectionName
) {
  let totalKwh = 0;
  const filteredArray = data.filter((x) => x.Relays[0].Name === connectionName);
  if (filteredArray === undefined) return;
  for (let index = 0; index < filteredArray.length; index++) {
    var dataElement = filteredArray[index];
    var secondDataElement = filteredArray[index + 1];
    if (secondDataElement == undefined) {
      break;
    }
    var sortkeyDate = dataElement.sortkey;
    if (sortkeyDate === undefined) {
      break;
    }
    var secondkeyDate = secondDataElement.sortkey;
    if (secondkeyDate === undefined) {
      break;
    }
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
    var secondSortKeyEpoch =
      module.exports.convertEpochDateToHumanDate(secondkeyDate);
    var readings2 = filteredArray[index].Relays;
    var isInCurrentWeek = module.exports.IsInCurrentWeek(sortKeyEpoch);
    var filteredReadings = readings2.filter((x) => x.Name === connectionName);
    if (isInCurrentWeek === false) {
      break;
    }
    for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
      const seconds = module.exports.calculateSeconds(
        secondSortKeyEpoch,
        sortKeyEpoch
      );
      const kwh = module.exports.calculateKwh(
        filteredReadings[0].CT1_Watts,
        seconds
      );
      totalKwh += kwh;
    }
  }
  return totalKwh;
};
/**
 *
 * @param {*} date date object
 * @returns date
 * @author Claudio Raul Brito Mercedes
 */
module.exports.IsInCurrentWeek = function (date) {
  const moment = require("moment");
  var now = moment();
  var input = moment(date);
  return now.isoWeek() == input.isoWeek();
};
/**
 *
 * @param {*} data automate Consumption helpers
 * @param {*} configuration data config
 */
// module.exports.AutomateConsumption = async function (data, configuration) {
//   try {
//     if (Array.isArray(data) && Array.isArray(configuration)) {
//       for (let index = 0; index < configuration.length; index++) {
//         const element = configuration[index];
//         if (element === undefined) {
//           break;
//         }
//         // validate is it daily
//         if (element.isItDaily === true) {
//           // calculate maximumKilowatt in the device
//           const maximumKilowatt = element.configurationMaximumKilowattsPerDay;
//           var calculatedKilowatt =
//             module.exports.calculateDeviceInTheSameDay(data);
//           // TODO send notification to user's Device
//           const percentage = module.exports.calculatePercentage(
//             maximumKilowatt,
//             calculatedKilowatt
//           );
//           if (percentage > 50 && percentage < 75) {
//             const deviceDataOne = await module.exports.findDeviceToken();
//             const tokens = deviceDataOne.data;
//             const message = {
//               notification: {
//                 title: `notificación de consumo diario`,
//                 body: `la ${
//                   element.connectionName || ""
//                 } ha consumido el ${percentage}% de lo estipulado`,
//               },
//               tokens: [tokens],
//             };
//             const firebase = await messaging.sendMulticast(message);
//             if (firebase.failureCount > 0) {
//               logger.log("error", `Requesting [Send Push Notification1]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "Send Push Notificaction",
//                   databaseOperation: "Push",
//                   table: "firebasePushNotification",
//                   error: firebase.responses,
//                 },
//               });
//             } else {
//               logger.log("info", `Requesting [Send Push Notification1]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "Send Push Notificaction",
//                   databaseOperation: "Push",
//                   table: "firebasePushNotification",
//                   error: firebase.responses,
//                 },
//               });
//             }
//           }
//           if (percentage > 75 && percentage <= 90) {
//             const deviceDataTwo = await module.exports.findDeviceToken();
//             const tokens = deviceDataTwo.data;
//             const message = {
//               notification: {
//                 title: `notificación de consumo diario`,
//                 body: `la ${
//                   element.connectionName || ""
//                 } ha consumido el ${percentage}% de lo estipulado`,
//               },
//               tokens: [tokens],
//             };
//             const firebase = await messaging.sendMulticast(message);
//             if (firebase.failureCount > 0) {
//               logger.log("error", `Requesting [Send Push Notification1]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "Send Push Notificaction",
//                   databaseOperation: "Push",
//                   table: "firebasePushNotification",
//                   error: firebase.responses,
//                 },
//               });
//             } else {
//               logger.log("info", `Requesting [Send Push Notification1]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "Send Push Notificaction",
//                   databaseOperation: "Push",
//                   table: "firebasePushNotification",
//                   error: firebase.responses,
//                 },
//               });
//             }
//           }
//           if (calculatedKilowatt >= parseInt(maximumKilowatt)) {
//             const deviceData = await module.exports.findDeviceToken();

//             if (deviceData.success) {
//               const token = deviceData.data;
//               const message = {
//                 notification: {
//                   title: `notificación de consumo diario`,
//                   body: `la ${
//                     element.connectionName || ""
//                   } se va a apagar ya que ha consumido el maximo estipulado`,
//                 },
//                 tokens: [token],
//               };
//               const firebase = await messaging.sendMulticast(message);
//               if (firebase.failureCount > 0) {
//                 logger.log("error", `Requesting [Send Push Notification1]`, {
//                   tags: "automationHelper",
//                   additionalInfo: {
//                     operation: "Send Push Notificaction",
//                     databaseOperation: "Push",
//                     table: "firebasePushNotification",
//                     error: firebase.responses,
//                   },
//                 });
//               } else {
//                 logger.log("info", `Requesting [Send Push Notification1]`, {
//                   tags: "automationHelper",
//                   additionalInfo: {
//                     operation: "Send Push Notificaction",
//                     databaseOperation: "Push",
//                     table: "firebasePushNotification",
//                     error: firebase.responses,
//                   },
//                 });
//               }
//             }
//           } else {
//             // update Database Here

//             try {
//               logger.log("info", `Requesting [Write To DynamoDB]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });

//               logger.log("info", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             } catch (error) {
//               logger.log("error", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             }
//           }
//           if (element.connectionsConfigurations.length > 0) {
//             for (
//               let index = 0;
//               index < element.connectionsConfigurations.length;
//               index++
//             ) {
//               const element2 = element.connectionsConfigurations[index];
//               if (element2.isItDaily === true) {
//                 const connectionMaxPerDay = parseInt(
//                   element2.configurationMaximumKilowattsPerDay
//                 );
//                 const calculatedConnectionKilowatt =
//                   module.exports.calculateConnectionsInSameDay(
//                     data,
//                     element2.connectionName
//                   );
//                 const percentage = module.exports.calculatePercentage(
//                   connectionMaxPerDay,
//                   calculatedConnectionKilowatt
//                 );
//                 if (percentage > 50 && percentage < 75) {
//                   const deviceDataOne = await module.exports.findDeviceToken();
//                   if (deviceDataOne.success) {
//                     const tokens = deviceDataOne.data;
//                     const message = {
//                       notification: {
//                         title: `notificación de consumo diario`,
//                         body: `la ${
//                           element2.connectionName || ""
//                         } ha consumido el ${percentage}% de lo estipulado`,
//                       },
//                       tokens: [tokens],
//                     };
//                     const firebase = await messaging.sendMulticast(message);
//                     if (firebase.failureCount > 0) {
//                       logger.log(
//                         "error",
//                         `Requesting [Send Push Notification1]`,
//                         {
//                           tags: "automationHelper",
//                           additionalInfo: {
//                             operation: "Send Push Notificaction",
//                             databaseOperation: "Push",
//                             table: "firebasePushNotification",
//                             error: firebase.responses,
//                           },
//                         }
//                       );
//                     } else {
//                       logger.log(
//                         "info",
//                         `Requesting [Send Push Notification1]`,
//                         {
//                           tags: "automationHelper",
//                           additionalInfo: {
//                             operation: "Send Push Notificaction",
//                             databaseOperation: "Push",
//                             table: "firebasePushNotification",
//                             error: firebase.responses,
//                           },
//                         }
//                       );
//                     }
//                   }
//                 }
//                 if (percentage > 75 && percentage <= 90) {
//                   const deviceDataTwo = await module.exports.findDeviceToken();
//                   if (deviceDataTwo.success) {
//                     const tokens = deviceDataTwo.data;
//                     const message = {
//                       notification: {
//                         title: `notificación de consumo diario`,
//                         body: `la ${
//                           element2.connectionName || ""
//                         } ha consumido el ${percentage}% de lo estipulado`,
//                       },
//                       tokens: [tokens],
//                     };
//                     const firebase = await messaging.sendMulticast(message);

//                     if (firebase.failureCount > 0) {
//                       logger.log(
//                         "error",
//                         `Requesting [Send Push Notification1]`,
//                         {
//                           tags: "automationHelper",
//                           additionalInfo: {
//                             operation: "Send Push Notificaction",
//                             databaseOperation: "Push",
//                             table: "firebasePushNotification",
//                             error: firebase.responses,
//                           },
//                         }
//                       );
//                     } else {
//                       logger.log(
//                         "info",
//                         `Requesting [Send Push Notification1]`,
//                         {
//                           tags: "automationHelper",
//                           additionalInfo: {
//                             operation: "Send Push Notificaction",
//                             databaseOperation: "Push",
//                             table: "firebasePushNotification",
//                             error: firebase.responses,
//                           },
//                         }
//                       );
//                     }
//                   }
//                 }

//                 if (connectionMaxPerDay >= calculatedConnectionKilowatt) {
//                   // update database here
//                   // send notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     const deviceData = await module.exports.findDeviceToken();
//                     if (deviceData.success) {
//                       const token = deviceData.data;
//                       const message = {
//                         notification: {
//                           title: `notificación de consumo diario`,
//                           body: `la ${
//                             element2.connectionName || ""
//                           } se va a apagar ya que ha consumido el maximo estipulado`,
//                         },
//                         tokens: [token],
//                       };
//                       const firebase = await messaging.sendMulticast(message);
//                       if (firebase.failureCount > 0) {
//                         logger.log(
//                           "error",
//                           `Requesting [Send Push Notification1]`,
//                           {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "Send Push Notificaction",
//                               databaseOperation: "Push",
//                               table: "firebasePushNotification",
//                               error: firebase.responses,
//                             },
//                           }
//                         );
//                       } else {
//                         logger.log(
//                           "info",
//                           `Requesting [Send Push Notification1]`,
//                           {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "Send Push Notificaction",
//                               databaseOperation: "Push",
//                               table: "firebasePushNotification",
//                               error: firebase.responses,
//                             },
//                           }
//                         );
//                       }
//                     }
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 } else {
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                   // update database here
//                   // send notification helper
//                   // TODO check device Notification/Alerts configuration
//                 }
//               }
//               if (element2.isItWeekly === true) {
//                 const connectionMaxPerWeek = parseInt(
//                   element2.configurationMaximumKilowattsPerWeek
//                 );
//                 const calculatedKilowatt =
//                   module.exports.CalculateConnectionsInWeeklyConfig(
//                     data,
//                     element2.ConnectionName
//                   );
//                   const percentageW = module.exports.calculatePercentage(
//                     connectionMaxPerWeek,
//                     calculatedKilowatt
//                   );
//                   if (percentageW > 50 && percentageW < 75) {
//                     const deviceDataOneW = await module.exports.findDeviceToken();
//                     if (deviceDataOneW.success) {
//                       const tokensW = deviceDataOne.data;
//                       const message = {
//                         notification: {
//                           title: `notificación de consumo semanal`,
//                           body: `la ${
//                             element2.connectionName || ""
//                           } ha consumido el ${percentageW}% de lo estipulado`,
//                         },
//                         tokens: [tokensW],
//                       };
//                       const firebaseW = await messaging.sendMulticast(message);
//                       if (firebaseW.failureCount > 0) {
//                         logger.log(
//                           "error",
//                           `Requesting [Send Push Notification1]`,
//                           {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "Send Push Notificaction",
//                               databaseOperation: "Push",
//                               table: "firebasePushNotification",
//                               error: firebaseW.responses,
//                             },
//                           }
//                         );
//                       } else {
//                         logger.log(
//                           "info",
//                           `Requesting [Send Push Notification1]`,
//                           {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "Send Push Notificaction",
//                               databaseOperation: "Push",
//                               table: "firebasePushNotification",
//                               error: firebase.responses,
//                             },
//                           }
//                         );
//                       }
//                 if (calculatedKilowatt >= connectionMaxPerWeek) {
//                   // update database here
//                   // set notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 } else {
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 }
//               }
//               if (element2.isItMonthly === true) {
//                 const connectionMaxPerWeek = parseInt(
//                   element2.configurationMaximumKilowattsPerMonth
//                 );
//                 const calculatedKwh =
//                   module.exports.calculateConnectionsInMonthConfig(
//                     data,
//                     element2.ConnectionName
//                   );
//                 if (connectionMaxPerWeek >= calculatedKwh) {
//                   // update database here
//                   // set notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 } else {
//                   // update database here
//                   // set notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 }
//                 if (element.connectionsConfigurations.length > 0) {
//                   for (
//                     let index = 0;
//                     index < element.connectionsConfigurations.length;
//                     index++
//                   ) {
//                     const element2 = element.connectionsConfigurations[index];
//                     if (element2.isItDaily === true) {
//                       const connectionMaxPerDay = parseInt(
//                         element2.configurationMaximumKilowattsPerDay
//                       );
//                       const calculatedConnectionKilowatt =
//                         module.exports.calculateConnectionsInSameDay(
//                           data,
//                           element2.connectionName
//                         );
//                       if (connectionMaxPerDay >= calculatedConnectionKilowatt) {
//                         // update database here
//                         // send notification helper
//                         try {
//                           logger.log("info", `Requesting [Write To DynamoDB]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                           // const sns = await publishSNS(snsParams);

//                           logger.log("info", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         } catch (error) {
//                           logger.log("error", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         }
//                       } else {
//                         // update database here
//                         // send notification helper
//                         // TODO check device Notification/Alerts configuration
//                         try {
//                           logger.log("info", `Requesting [Write To DynamoDB]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                           // const sns = await publishSNS(snsParams);

//                           logger.log("info", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         } catch (error) {
//                           logger.log("error", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         }
//                       }
//                     }
//                     if (element2.isItWeekly === true) {
//                       const connectionMaxPerWeek = parseInt(
//                         element2.configurationMaximumKilowattsPerWeek
//                       );
//                       const calculatedKilowatt =
//                         module.exports.CalculateConnectionsInWeeklyConfig(
//                           data,
//                           element2.ConnectionName
//                         );
//                       if (calculatedKilowatt >= connectionMaxPerWeek) {
//                         // update database here
//                         // set notification helper
//                         try {
//                           logger.log("info", `Requesting [Write To DynamoDB]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                           // const sns = await publishSNS(snsParams);

//                           logger.log("info", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         } catch (error) {
//                           logger.log("error", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         }
//                       } else {
//                         try {
//                           logger.log("info", `Requesting [Write To DynamoDB]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                           // const sns = await publishSNS(snsParams);

//                           logger.log("info", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         } catch (error) {
//                           logger.log("error", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         }
//                       }
//                     }
//                     if (element2.isItMonthly === true) {
//                       const connectionMaxPerWeek = parseInt(
//                         element2.configurationMaximumKilowattsPerMonth
//                       );
//                       const calculatedKwh =
//                         module.exports.calculateConnectionsInMonthConfig(
//                           data,
//                           element2.ConnectionName
//                         );
//                       if (connectionMaxPerWeek >= calculatedKwh) {
//                         // update database here
//                         // set notification helper
//                         try {
//                           logger.log("info", `Requesting [Write To DynamoDB]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                           // const sns = await publishSNS(snsParams);

//                           logger.log("info", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         } catch (error) {
//                           logger.log("error", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         }
//                       } else {
//                         // update database here
//                         // set notification helper
//                         try {
//                           logger.log("info", `Requesting [Write To DynamoDB]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                           // const sns = await publishSNS(snsParams);

//                           logger.log("info", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         } catch (error) {
//                           logger.log("error", `Requesting [Write To SNS]`, {
//                             tags: "automationHelper",
//                             additionalInfo: {
//                               operation: "AutomateConsumption",
//                               databaseOperation: "PUT",
//                               table: config.dynamoBB.deviceConnection.name,
//                             },
//                           });
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//                 }
//           }

//           // calculate connections
//         }
//         // validate is it weekly
//         if (element.isItWeekly === true) {
//           const maximumKilowatt = element.configurationMaximumKilowattsPerDay;
//           const calculatedKilowatt =
//             module.exports.calculateDeviceInSameWeek(data);
//           if (calculatedKilowatt >= maximumKilowatt) {
//             try {
//               logger.log("info", `Requesting [Write To DynamoDB]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//               // const sns = await publishSNS(snsParams);

//               logger.log("info", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             } catch (error) {
//               logger.log("error", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             }
//             // update db here
//           } else {
//             try {
//               logger.log("info", `Requesting [Write To DynamoDB]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });

//               logger.log("info", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             } catch (error) {
//               logger.log("error", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             }
//             // update db here
//           }
//           if (element.connectionsConfigurations.length > 0) {
//             for (
//               let index = 0;
//               index < element.connectionsConfigurations.length;
//               index++
//             ) {
//               const element2 = element.connectionsConfigurations[index];
//               if (element2.isItDaily === true) {
//                 const connectionMaxPerDay = parseInt(
//                   element2.configurationMaximumKilowattsPerDay
//                 );
//                 const calculatedConnectionKilowatt =
//                   module.exports.calculateConnectionsInSameDay(
//                     data,
//                     element2.connectionName
//                   );
//                 if (connectionMaxPerDay >= calculatedConnectionKilowatt) {
//                   // update database here
//                   // send notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 } else {
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                   // update database here
//                   // send notification helper
//                   // TODO check device Notification/Alerts configuration
//                 }
//               }
//               if (element2.isItWeekly === true) {
//                 const connectionMaxPerWeek = parseInt(
//                   element2.configurationMaximumKilowattsPerWeek
//                 );
//                 const calculatedKilowatt =
//                   module.exports.CalculateConnectionsInWeeklyConfig(
//                     data,
//                     element2.ConnectionName
//                   );
//                 if (calculatedKilowatt >= connectionMaxPerWeek) {
//                   // update database here
//                   // set notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 } else {
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 }
//               }
//               if (element2.isItMonthly === true) {
//                 const connectionMaxPerWeek = parseInt(
//                   element2.configurationMaximumKilowattsPerMonth
//                 );
//                 const calculatedKwh =
//                   module.exports.calculateConnectionsInMonthConfig(
//                     data,
//                     element2.ConnectionName
//                   );
//                 if (connectionMaxPerWeek >= calculatedKwh) {
//                   // update database here
//                   // set notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 } else {
//                   // update database here
//                   // set notification helper
//                   try {
//                     logger.log("info", `Requesting [Write To DynamoDB]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                     // const sns = await publishSNS(snsParams);

//                     logger.log("info", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   } catch (error) {
//                     logger.log("error", `Requesting [Write To SNS]`, {
//                       tags: "automationHelper",
//                       additionalInfo: {
//                         operation: "AutomateConsumption",
//                         databaseOperation: "PUT",
//                         table: config.dynamoBB.deviceConnection.name,
//                       },
//                     });
//                   }
//                 }
//               }
//             }
//           }
//         }
//         if (element.isItMonthly === true) {
//           const maximumKilowatt = element.MaximumKilowattsPerMonth;
//           var calculatedKilowatt =
//             module.exports.calculateDeviceInSameMonth(data);
//           if (calculatedKilowatt >= maximumKilowatt) {
//             // update database here
//             // set notification helper
//             try {
//               logger.log("info", `Requesting [Write To DynamoDB]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//               // const sns = await publishSNS(snsParams);

//               logger.log("info", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             } catch (error) {
//               logger.log("error", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                   error: error,
//                 },
//               });
//             }
//           } else {
//             // update database here
//             // set notification helper

//             try {
//               logger.log("info", `Requesting [Write To DynamoDB]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });

//               logger.log("info", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                 },
//               });
//             } catch (error) {
//               logger.log("error", `Requesting [Write To SNS]`, {
//                 tags: "automationHelper",
//                 additionalInfo: {
//                   operation: "AutomateConsumption",
//                   databaseOperation: "PUT",
//                   table: config.dynamoBB.deviceConnection.name,
//                   error: error,
//                 },
//               });
//             }
//           }
//         }
//         // validate is it monthly
//       }
//     } else {
//       throw new Error("error detected");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
/**
 * @author Claudio Raul Brito Mercedes
 * @function calculateDeviceInTheSameDay
 * @param {*} data data
 * @returns array
 */
module.exports.calculateDeviceInTheSameDay = function (data) {
  let totalKwh = 0;
  let secondTotalKwh = 0;
  const moment = require("moment");
  for (let index = 0; index < data.length; index++) {
    var dataElement = data[index];
    var secondDataElement = data[index + 1];
    if (secondDataElement == undefined) {
      break;
    }
    var sortkeyDate = dataElement.sortkey;
    if (sortkeyDate === undefined) {
      break;
    }
    var secondkeyDate = secondDataElement.sortkey;
    if (secondkeyDate === undefined) {
      break;
    }
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
    var secondSortKeyEpoch =
      module.exports.convertEpochDateToHumanDate(secondkeyDate);
    var LocalDate = moment(sortKeyEpoch);
    moment.locale("es-do");
    LocalDate.locale(false);
    var readings2 = data[index].readings;
    var isInTheSameDay = module.exports.calculateSameDay(sortKeyEpoch);
    if (isInTheSameDay === false) {
      break;
    }
    for (let j = 0; j <= Object.keys(readings2).length; j++) {
      const seconds = module.exports.calculateSeconds(
        secondSortKeyEpoch,
        sortKeyEpoch
      );
      const kwh = module.exports.calculateKwh(readings2.device_watts, seconds);
      totalKwh += kwh;
    }
    const seconds2 = module.exports.calculateSeconds(
      secondSortKeyEpoch,
      sortKeyEpoch
    );
    const kwh2 = module.exports.calculateKwh(readings2.device_watts, seconds2);
    secondTotalKwh += kwh2;
  }

  return secondTotalKwh;
};

/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} data data
 * @param {*} connectionName Connection's Name
 * @returns array
 */
module.exports.calculateConnectionsInMonthConfig = function (
  data,
  connectionName
) {
  let totalKwh = 0;
  const filteredArray = data.filter((x) => x.Relays[0].Name === connectionName);
  if (filteredArray === undefined) return;
  for (let index = 0; index < filteredArray.length; index++) {
    var dataElement = filteredArray[index];
    var secondDataElement = filteredArray[index + 1];
    if (secondDataElement == undefined) {
      break;
    }
    var sortkeyDate = dataElement.sortkey;
    if (sortkeyDate === undefined) {
      break;
    }
    var secondkeyDate = secondDataElement.sortkey;
    if (secondkeyDate === undefined) {
      break;
    }
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
    var secondSortKeyEpoch =
      module.exports.convertEpochDateToHumanDate(secondkeyDate);
    var readings2 = filteredArray[index].Relays;
    var isInCurrentMonth = module.exports.isInCurrentMonth(sortKeyEpoch);
    var filteredReadings = readings2.filter((x) => x.Name === connectionName);
    if (isInCurrentMonth === false) {
      break;
    }
    for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
      const seconds = module.exports.calculateSeconds(
        secondSortKeyEpoch,
        sortKeyEpoch
      );
      const kwh = module.exports.calculateKwh(
        filteredReadings[0].CT1_Watts,
        seconds
      );
      totalKwh += kwh;
    }
  }
  return totalKwh;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @function calculateDeviceInSameMonth
 * @param {*} data data
 * @returns array <any>
 */
module.exports.calculateDeviceInSameMonth = function (data) {
  let totalKwh = 0;
  let secondTotalKwh = 0;
  const moment = require("moment");
  for (let index = 0; index < data.length; index++) {
    var dataElement = data[index];
    var secondDataElement = data[index + 1];
    if (secondDataElement == undefined) {
      break;
    }
    var sortkeyDate = dataElement.sortkey;
    if (sortkeyDate === undefined) {
      break;
    }
    var secondkeyDate = secondDataElement.sortkey;
    if (secondkeyDate === undefined) {
      break;
    }
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
    var secondSortKeyEpoch =
      module.exports.convertEpochDateToHumanDate(secondkeyDate);
    var LocalDate = moment(sortKeyEpoch);
    moment.locale("es-do");
    LocalDate.locale(false);
    var readings2 = data[index].readings;
    var isInTheSameDay = module.exports.isInCurrentMonth(sortKeyEpoch);
    if (isInTheSameDay === false) {
      break;
    }
    for (let j = 0; j <= Object.keys(readings2).length; j++) {
      const seconds = module.exports.calculateSeconds(
        secondSortKeyEpoch,
        sortKeyEpoch
      );
      const kwh = module.exports.calculateKwh(readings2.device_watts, seconds);
      totalKwh += kwh;
    }
    const seconds2 = module.exports.calculateSeconds(
      secondSortKeyEpoch,
      sortKeyEpoch
    );
    const kwh2 = module.exports.calculateKwh(readings2.device_watts, seconds2);
    secondTotalKwh += kwh2;
  }
  return secondTotalKwh;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @function calculateConnectionsInSameDay
 * @param {*} data data
 * @returns array <any>
 */
module.exports.calculateConnectionsInSameDay = function (data, ConnectionName) {
  const moment = require("moment");
  let totalKwh = 0;
  const filteredArray = data.filter((x) => x.Relays[0].Name == ConnectionName);
  if (filteredArray === undefined) {
    return;
  }
  for (let index = 0; index < filteredArray.length; index++) {
    var dataElement = filteredArray[index];
    var secondDataElement = filteredArray[index + 1];

    if (secondDataElement == undefined) {
      break;
    }
    var sortkeyDate = dataElement.sortkey;
    if (sortkeyDate === undefined) {
      break;
    }
    var secondkeyDate = secondDataElement.sortkey;
    if (secondkeyDate === undefined) {
      break;
    }
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
    var secondSortKeyEpoch =
      module.exports.convertEpochDateToHumanDate(secondkeyDate);
    var LocalDate = moment(sortKeyEpoch);
    moment.locale("es-do");
    LocalDate.locale(false);
    var readings2 = filteredArray[index].Relays;
    var isInTheSameDay = module.exports.calculateSameDay(sortKeyEpoch);
    var filteredReadings = readings2.filter((x) => x.Name === ConnectionName);
    if (isInTheSameDay === false) {
      break;
    }
    for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
      const seconds = module.exports.calculateSeconds(
        secondSortKeyEpoch,
        sortKeyEpoch
      );
      const kwh = module.exports.calculateKwh(
        filteredReadings[0].CT1_Watts,
        seconds
      );
      totalKwh += kwh;
    }
  }
  return totalKwh;
};
module.exports.findDeviceToken = async function () {
  try {
    const deviceId = config.userNameEmail.email;
    const data = await dynamoDBConnection
      .query({
        TableName: config.dynamoBB.userDevice.name,
        KeyConditionExpression: "#user = :userName",
        ScanIndexForward: false,
        consistentRead: false,
        Limit: 1,
        ExpressionAttributeNames: {
          "#user": "deviceId",
        },
        ExpressionAttributeValues: {
          ":userName": deviceId,
        },
      })
      .promise();
    logger.log("info", `Requesting [Find To findDeviceToken]`, {
      tags: "automationHelper",
      additionalInfo: {
        operation: "findDeviceToken",
        databaseOperation: "GET",
        table: config.dynamoBB.userDevice.name,
      },
    });
    if (data == null || data == undefined || !data || data.Count == 0) {
      return {
        success: false,
        data: [],
      };
    } else {
      return {
        success: true,
        data: data.Items[0].token,
      };
    }
  } catch (error) {
    logger.log("error", `requesting [find deviceToken]`, {
      additionalInfo: {
        operation: "findDeviceToken",
        databaseOperation: "GET",
        table: config.dynamoBB.userDevice.name,
        error: error,
      },
    });
    return {
      success: false,
      data: [],
    };
  }
};
/**
 * @function calculatePercentage
 * @param {*} numberOne
 * @param {*} numberTwo
 */
module.exports.calculatePercentage = function (numberOne, numberTwo) {
  return (100 * numberOne) / numberTwo;
};
/**
 *@author Claudio Raul Brito Mercedes
 * @param {*} arrayOne firstArray
 * @param {*} arrayTwo second Array
 * @returns boolean
 */
module.exports.validateArray = function (arrayOne, arrayTwo) {
  return Array.isArray(arrayOne) && Array.isArray(arrayTwo);
};

/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} arrayOne connectionsArray
 * @returns array <filtered>
 */
module.exports.filterConnectionsArray = function (arrayOne) {
  try {
    return arrayOne.filter(x => x.connectionsConfigurations.length > 0);
  } catch (error) {
    logger.log("error", `Requesting [filterArray]`, {
      tags: "automationHelper",
      additionalInfo: {
        operation: "Send Push Notificaction",
        databaseOperation: "Filter",
        table: "firebasePushNotification",
        error: error,
      },
    });

  }
};

module.exports.automateConsumptionDaily = async function (data,array) {
  try {
    for (const dayIterator of array) {
      const connectionMaxPerDay = parseInt(dayIterator.configurationMaximumKilowattsPerDay);
      const calculatedConectionKilowatt = module.exports.calculateConnectionsInSameDay(data,dayIterator.connectionName);
      const percentage = module.exports.calculatePercentage(connectionMaxPerDay,calculatedConectionKilowatt);
      if (percentage > 50 && percentage < 75) {
        const deviceData = await module.exports.findDeviceToken();
        if (deviceData.success) {
          await module.exports.sendPushNotification(`notificacion de consumo diario`,`la ${dayIterator.connectionName} ha consumido el ${percentage}% de lo estipulado`,deviceData.data);
        }
        
      }
      if (percentage > 90 && percentage <=99) {
        const deviceDataTwo = await module.exports.findDeviceToken();
        await module.exports.sendPushNotification(`notificacion de consumo diario`,`la ${dayIterator.connectionName} ha consumido el ${percentage}% de lo estipulado`,deviceDataTwo.data);
      }
      if (connectionMaxPerDay >= calculatedConectionKilowatt) {
        const deviceDataThree = await module.exports.findDeviceToken();
        await module.exports.sendPushNotification(`notificacion de consumo diario`,`la ${dayIterator.connectionName} se va a apagar ya que ha consumido el maximo estipulado`,deviceDataThree.data);

      }
    }
  } catch (error) {
    
  }

};
module.exports.automateConsumptionWeekly = function (array) {};
module.exports.automateConsumptionMonthly = function (array) {};
module.exports.sendPushNotification = async function (
  messageTitle,
  body,
  token
) {
  const message = {
    title: messageTitle,
    body: body,
    tokens: [token],
  };
  const firebaseMessage = await messaging.sendMulticast(
    message
  );
  if (firebaseMessage.failureCount > 0) {
    logger.log("error", `Requesting [Send Push Notification1]`, {
      tags: "automationHelper",
      additionalInfo: {
        operation: "Send Push Notificaction",
        databaseOperation: "Push",
        table: "firebasePushNotification",
        error: firebase.responses,
      },
    });
  } else {
    logger.log("info", `Requesting [Send Push Notification1]`, {
      tags: "automationHelper",
      additionalInfo: {
        operation: "Send Push Notificaction",
        databaseOperation: "Push",
        table: "firebasePushNotification",
        error: firebase.responses,
      },
    });
  }
};
module.exports.updateConnectionInformation = async function (information) {

}
