/*
expedted datased 
["day",night]
*/
const { getWeeklyHelper } = require("../../helpers/weeklyHelper");
const { getMonthlyHelper } = require("../../helpers/monthlyHelper");
const { getByMonth } = require("../../helpers/getByMonthHelper");
const { dailyHelper } = require("../../helpers/dailyHelper");
/**
 * @function DeviceWattsDayNightHelper
 * @param {*} dynamoDBArray
 * @returns array[]
 */
module.exports.DeviceWeeklyWattsDayNightHelper =  function (
  dynamoDBArray
) {
  const helper =  getMonthlyHelper(dynamoDBArray);
  const days = helper[0].dayWattsProm || 0;
  const night = helper[0].NightWattsProm || 0;
  const dataset = [
    {
      label: "Consumo semanal en Watts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };
};
/**
 * @function DeviceKiloWattsDayNightHelper
 * @param {*} dynamoDBArray
 * @returns array[]
 */
module.exports.DeviceWeeklyKiloWattsDayNightHelper = function (dynamoDBArray) {
  const helper =  getMonthlyHelper(dynamoDBArray);
  const days = helper[0].dayKhwProms || 0;
  const night = helper[0].NightsKhwProm || 0;
  const dataset = [
    {
      label: "Consumo semanal en KiloWatts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };
};
/**
 * @function DeviceMonthlyWattsDayNightHelper
 * @param {*} dynamoDBArray dynamobdArray
 * @returns
 */
module.exports.DeviceMonthlyWattsDayNightHelper = function (dynamoDBArray) {
  const helper =  getMonthlyHelper(dynamoDBArray);
  const days = helper[0].dayWattsProm;
  const night = helper[0].NightWattsProm;
  const dataset = [
    {
      label: "Consumo semanal en Watts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };
};
/**
 *
 * @param {*} dynamoDBArray
 */
module.exports.DeviceMonthlyKiloWattsDayNightHelper =  function (
  dynamoDBArray
) {
  const helper =  getMonthlyHelper(dynamoDBArray);
  const days = helper[0].dayKhwProms;
  const night = helper[0].NightsKhwProm;
  const dataset = [
    {
      label: "Consumo Mensual en KiloWatts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };
};
/**
 * @function DeviceMonthlyYearlyWattsDayNight
 * @param {*} dynamoDBArray
 */
module.exports.DeviceMonthlyYearlyWattsDayNight =  function (
  dynamoDBArray
) {
  const helper =  getByMonth(dynamoDBArray);
  const days = helper[0].dayWattsProm;
  const night = helper[0].NightWattsProm;
  const dataset = [
    {
      label: "Consumo Anual en Watts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };

};
/**
 *
 * @param {*} dynamoDBArray dynamoDBArray
 * @returns Array<any>
 */
module.exports.DeviceMonthlyYearlyKiloWattsDayNight =  function (
  dynamoDBArray
) {
  const helper =  getByMonth(dynamoDBArray);
  const days = helper[0].dayKhwProms;
  const night = helper[0].NightsKhwProm;
  const dataset = [
    {
      label: "Consumo Anual en KiloWatts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return{
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };

};
/**
 * @function DeviceDailyWattsDayNight
 * @param {*} dynamoDBArray
 */
module.exports.DeviceDailyWattsDayNight =  function (dynamoDBArray) {
  const helper = dailyHelper(dynamoDBArray);
  const days = helper[0].dayWattsProm;
  const night = helper[0].NightWattsProm;
  const dataset = [
    {
      label: "Consumo Diario en Watts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };
};
/**
 *
 * @param {*} dynamoDBArray dynamoDBArray
 * @returns Array<any>
 */
module.exports.DeviceDailyKiloWattsDayNight =  function (dynamoDBArray) {
  const helper = dailyHelper(dynamoDBArray);
  const days = helper[0].dayKhwProms;
  const night = helper[0].NightsKhwProm;
  const dataset = [
    {
      label: "Consumo Diario en KiloWatts",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      data: [days, night],
      hoverOffset: 4,
    },
  ];
  return {
    labels: ["Analisis de consumo de dia", "Analisis de consumo de noche"],
    datasets: dataset,
  };
};
