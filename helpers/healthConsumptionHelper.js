//connections
const {
  getMonthlyHelperConnection,
} = require("../helpers/connectionHelpers/monthlyHelper");
const {
  getByMonthConnections,
} = require("../helpers/connectionHelpers/getByMonthHelper");
const { getMonthlyHelper } = require("../helpers/monthlyHelper");
//device
const { getWeeklyHelper } = require("../helpers/weeklyHelper");
const {
  DeviceGraphHelper,
} = require("../helpers/connectionHelpers/connectionGraph/conectionGraphHelper");
const {
  dailyHelperFromConnections,
} = require("../helpers/connectionHelpers/dailyHelper");
module.exports.healthWeeklyHelper = function (currentWeek, otherWeek) {
  const otherMonth = getWeeklyHelper(otherWeek);
  const currentMonth = getWeeklyHelper(currentWeek);
  if (currentMonth[0].totalWatts > otherMonth[0].totalWatts) {
    const healthPromPercentage =
      currentMonth[0].totalWatts / otherMonth[0].totalWatts;
    const message =
      "el consumo de la semana actual es mayor al pasado, favor considerar tu consumo";
    return {
      health: healthPromPercentage,
      message: message,
      isBigger: true,
    };
  } else if (currentMonth[0].totalWatts == nextMonthly[0].totalWatts) {
    const healthPromPercentage =
      currentMonth[0].totalWatts / nextMonthly[0].totalWatts;
    const message =
      "el consumo de la semana actual es igual al pasado, excelente!";
    return {
      health: healthPromPercentage,
      message: message,
      isEqual: true,
    };
  } else if (currentMonth[0].totalWatts < otherMonth[0].totalWatts) {
    const healthPromPercentage =
      currentMonth[0].totalWatts / otherMonth[0].totalWatts;
    const message =
      "el consumo de la semana actual es menor al pasado, muy bien!";
    return {
      health: healthPromPercentage,
      message: message,
      isLower: true,
    };
  }
};
module.exports.healthMonthlyHelper = async function (currentMonth, otherMonth) {
  const currentMonthly = getMonthlyHelper(currentWeek);
  const nextMonthly = getMonthlyHelper(otherMonth);
  if (currentMonthly[0].totalWattsProm > nextMonthly[0].totalWattsProm) {
    const healthPromPercentage =
      currentMonthly[0].totalWattsProm / nextMonthly[0].totalWattsProm;
    const message =
      "el consumo del mes actual es mayor al pasado, favor considerar tu consumo";
    return {
      health: healthPromPercentage,
      message: message,
      isBigger: true,
    };
  } else if (
    currentMonthly[0].totalWattsProm == nextMonthly[0].totalWattsProm
  ) {
    const healthPromPercentage =
      currentMonthly[0].totalWattsProm / nextMonthly[0].totalWattsProm;
    const message =
      "el consumo de la semana actual es igual al pasado, excelente!";
    return {
      health: healthPromPercentage,
      message: message,
      isEqual: false,
    };
  } else if (currentMonthly[0].totalWattsProm < nextMonthly[0].totalWattsProm) {
    const healthPromPercentage =
      nextMonthly[0].totalWattsProm / nextMonthly[0].totalWattsProm;
    const message =
      "el consumo de la semana actual es menor al pasado, muy bien!";
    return {
      health: healthPromPercentage,
      message: message,
      isLower: false,
    };
  }
};
module.exports.healthYearlyHelper = function (currentYear, otherYear) {
  const currentYears = DeviceGraphHelper(currentYear);
  const otherYears = DeviceGraphHelper(otherYear);
  if (currentYears[0].totalWattsProm > otherYears[0].totalWattsProm) {
    const healthPromPercentage =
      currentYears[0].totalWattsProm / currentYears[0].totalWattsProm;
    const message =
      "el consumo del mes  actual es mayor al pasado, favor considerar tu consumo";
    return {
      health: healthPromPercentage,
      message: message,
      isBigger: true,
    };
  } else if (currentYears[0].totalWattsProm == otherYears[0].totalWattsProm) {
    const healthPromPercentage =
      currentYears[0].totalWattsProm / otherYears[0].totalWattsProm;
    const message = "el consumo del mes  actual es igual al pasado, excelente!";
    return {
      health: healthPromPercentage,
      message: message,
      isEqual: false,
    };
  } else if (currentYears[0].totalWattsProm < otherYears[0].totalWattsProm) {
    const healthPromPercentage =
      currentYears[0].totalWattsProm / otherYears[0].totalWattsProm;
    const message = "el consumo del mes  actual es menor al pasado, muy bien!";
    return {
      health: healthPromPercentage,
      message: message,
      isLower: false,
    };
  }
};

module.exports.ConnectionsHealthWeeklyHelper = function (
  ConnectionName,
  currentWeek,
  otherWeek
) {
  const currentWeeks = dailyHelperFromConnections(ConnectionName, currentWeek);
  const nextWeek = dailyHelperFromConnections(ConnectionName, otherWeek);
  if (currentWeeks[0].totalWatts > nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message =
      "el consumo de la semana actual es mayor al pasado, favor considerar tu consumo";
    return {
      health: healthPromPercentage,
      message: message,
      isBigger: true,
    };
  } else if (currentWeeks[0].totalWatts == nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message =
      "el consumo de la semana actual es igual al pasado, excelente!";
    return {
      health: healthPromPercentage,
      message: message,
      isEqual: false,
    };
  } else if (currentWeeks[0].totalWatts < nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message =
      "el consumo de la semana actual es menor al pasado, muy bien!";
    return {
      health: healthPromPercentage,
      message: message,
      isLower: false,
    };
  }
};
/**
 *
 * @param {*} ConnectionName deviceConnectionName
 * @param {*} currentMonth deviceCurrentMonth (dynamoDbArray)
 * @param {*} otherMonth (dynamoDbArray)
 * @returns
 */
module.exports.ConnectionsHealthYearlyHelper = function (
  ConnectionName,
  currentMonth,
  otherMonth
) {
  const currentWeeks =  getMonthlyHelperConnection(
    ConnectionName,
    currentMonth
  );
  const nextWeek =  getMonthlyHelperConnection(ConnectionName, otherMonth);
  if (currentWeeks[0].totalWatts > nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message =
      "el consumo del año actual es mayor al pasado, favor considerar tu consumo";
      return{
      health: healthPromPercentage,
      message: message,
      isBigger: true,
    };
 
  } else if (currentWeeks[0].totalWatts == nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message = "el consumo del año actual es igual al pasado, excelente!";
    return {
      health: healthPromPercentage,
      message: message,
      isEqual: false,
    };
 
  } else if (currentWeeks[0].totalWatts < nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message = "el consumo del año actual es menor al pasado, muy bien!";
    return {
      health: healthPromPercentage,
      message: message,
      isLower: false,
    };
  }
};
/**
 *
 * @param {*} ConnectionName device ConnectionName
 * @param {*} currentYear dynamoDbArray
 * @param {*} otherYear dynamoDBArray
 * @returns custom props
 */
module.exports.ConnectionsHealthMonthlyHelper = function (
  ConnectionName,
  currentYear,
  otherYear
) {
  const currentWeeks = getByMonthConnections(ConnectionName, currentYear);
  const nextWeek = getByMonthConnections(ConnectionName, otherYear);
  if (currentWeeks[0].totalWatts > nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message =
      "el consumo del mes actual es mayor al pasado, favor considerar tu consumo";
    return {
      health: healthPromPercentage,
      message: message,
      isBigger: true,
    };
  } else if (currentWeeks[0].totalWatts == nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message = "el consumo del mes actual es igual al pasado, excelente!";
    return {
      health: healthPromPercentage,
      message: message,
      isEqual: false,
    };
  } else if (currentWeeks[0].totalWatts < nextWeek[0].totalWatts) {
    const healthPromPercentage =
      currentWeeks[0].totalWatts / nextWeek[0].totalWatts;
    const message = "el consumo del mes actual es menor al pasado, muy bien!";
    return {
      health: healthPromPercentage,
      message: message,
      isLower: false,
    };
  }
};
