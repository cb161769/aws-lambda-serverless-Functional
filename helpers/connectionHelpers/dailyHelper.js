/**
 * this Function determines if the user consumed
 * @param {*} epochDate date
 * @function convertEpochDateToHumanDate()
 *
 */

module.exports.convertEpochDateToHumanDate = function (epochDate) {
  var epoch = new Date(epochDate * 1000);
  return epoch;
};
/**
 * @function isNightTarif
 * @param {*} dateObj date
 * @returns boolean
 */
module.exports.isNightTarif = function (dateObj) {
  if (typeof dateObj === "number") {
    dateObj = new Date(date);
  }
  if (
    (dateObj.getHours() >= 21 && dateObj.getHours() <= 23) ||
    (dateObj.getHours() >= 0 && dateObj.getHours() <= 5)
  ) {
    return true;
  }
  if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
    return true;
  }

  return false;
};
/**
 * @function isInCurrentWEEK()
 * @param {*} date date
 * @returns new Date()
 */
module.exports.isInCurrentWEEK = function (date) {
  const moment = require("moment");
  var now = moment();
  var input = moment(date);
  var isThisWeek = now.isoWeek() == input.isoWeek();
  return isThisWeek;
};
/**
 * @function dailyHelperFromConnections
 * @author Claudio Raul Brito Mercedes
 * @param {} connectionName  the ConnectionName
 * @param {*} params the DynamoDBArray
 *
 */
module.exports.dailyHelperFromConnections = function (connectionName, params) {
  const moment = require("moment");
  let counter = 0;
  var totalWatts = 0;
  var weekKhwProm = 0;
  var monday = 0;
  var tuesday = 0;
  var thursday = 0;
  var wednesday = 0;
  var friday = 0;
  var saturday = 0;
  var sunday = 0;
  var mondayWatts = 0;
  var tuesdayWatts = 0;
  var thursdayWatts = 0;
  var wednesdayWatts = 0;
  var fridayWatts = 0;
  var saturdayWatts = 0;
  var sundayWatts = 0;
  var mondayAmps = 0;
  var tuesdayAmps = 0;
  var thursdayAmps = 0;
  var wednesdayAmps = 0;
  var fridayAmps = 0;
  var saturdayAmps = 0;
  var sundayAmps = 0;
  let totalAmps = 0;
  let totalAmpsProm = 0;
  let totalKhw = 0;
  var mondayTimesTamp = [];
  var tuesdayTimesTamp = [];
  var wednesdayTimesTamp = [];
  var thursdayTimesTamp = [];
  var fridayTimesTamp = [];
  var saturdayTimesTamp = [];
  var sundayTimesTamp = [];
  var weekTimeStamp = [];
  let totalKwhInWeek = 0;
  let totalAmpsInWeek = 0;
  let totalWattsInWeek = 0;
  let totalWAttsProm = 0;
  let nightKhwProms = 0;
  let nightWattsProms = 0;
  let dayWattsProms = 0;
  let dayKhwProms = 0;
  let kw2 = 0;
  //kwh
  let mondayKwh = 0;
  let tuesdayKwh = 0;
  let thursdayKwh = 0;
  let wendsDayKwh = 0;
  let juevesKwh = 0;
  let viernesKwh = 0;
  let sabadoKwh = 0;
  let domingoKwh = 0;
  if (params.length === 0) {
    return [
      {
        registros: 0,
        Connextion: connectionName,
        Timestamp: weekTimeStamp,
        nightKhwProms: nightKhwProms,
        nightWattsProms: nightWattsProms,
        dayWattsProms: dayWattsProms,
        dayKhwProms: dayKhwProms,
        lunes: {
          registros: monday || 0,
          amperios: mondayAmps || 0,
          watts: mondayWatts || 0,
          kwh: mondayKwh,
          Timestamp: mondayTimesTamp,
        },
        martes: {
          registros: tuesday || 0,
          amperios: tuesdayAmps || 0,
          watts: tuesdayWatts || 0,
          kwh: tuesdayKwh,
          Timestamp: tuesdayTimesTamp,
        },
        miercoles: {
          registros: wednesday || 0,
          amperios: wednesdayAmps || 0,
          watts: wednesdayWatts || 0,
          kwh: wendsDayKwh,
          Timestamp: wednesdayTimesTamp,
        },
        jueves: {
          registros: thursday || 0,
          amperios: thursdayAmps || 0,
          watts: thursdayWatts || 0,
          kwh: juevesKwh,
          Timestamp: thursdayTimesTamp,
        },
        viernes: {
          registros: friday || 0,
          amperios: fridayAmps || 0,
          watts: fridayWatts || 0,
          kwh: viernesKwh,
          Timestamp: fridayTimesTamp,
        },
        sabado: {
          registros: saturday || 0,
          amperios: saturdayAmps || 0,
          watts: saturdayWatts || 0,
          kwh: sabadoKwh,
          Timestamp: saturdayTimesTamp,
        },
        domingo: {
          registros: sunday || 0,
          amperios: sundayAmps || 0,
          watts: sundayWatts || 0,
          kwh: domingoKwh,
          Timestamp: sundayTimesTamp,
        },
        totalWatts: totalWatts || 0,
        totalAmps: totalAmps || 0,
        diaConsulta: new Date().toISOString(),
        promedioWattsSemanal: totalWAttsProm || 0,
        promedioAmpsSemanal: totalAmpsProm || 0,
        promedioKwhSemanal: weekKhwProm || 0,
        totalKhw: totalKhw,
        totalKwhInWeek: 0,
        totalAmpsInWeek: 0,
        totalWattsInWeek: 0,
      },
    ];
  } else {
    if (connectionName.trim() == "Conexion 1".trim()) {
      const filteredArray = params.filter(
        (x) => x.Relays[0].Name.trim() == connectionName.trim()
      );

      for (let index = 0; index <= filteredArray.length; index++) {
        var dataElement = filteredArray[index];
        var secondDataElement = filteredArray[index + 1];
        if (secondDataElement == undefined) {
          break;
        }

        var sortKeyDate = dataElement.sortkey;
        var sortKeyEpoch =
          module.exports.convertEpochDateToHumanDate(sortKeyDate);
        var LocalDate = moment(sortKeyEpoch);
        var seconkeyDate = secondDataElement.sortkey;
        var secondKeyEpoch =
          module.exports.convertEpochDateToHumanDate(seconkeyDate);
        moment.locale("es-do");
        LocalDate.locale(false);
        var readings2 = filteredArray[index].Relays;
        var filteredReadings = readings2.filter(
          (x) => x.Name == connectionName
        );
        console.log(JSON.stringify(filteredReadings));
        var week = module.exports.isInCurrentWEEK(sortKeyEpoch);
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        if (week === false) {
          break;
        }
        if (readings2 === undefined) {
          break;
        }
        var weekDay = LocalDate.isoWeekday();
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
          const seconds =
            (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
          const kwh =
            (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) / 1000;
          totalKwhInWeek += Math.abs(kwh);
          totalWattsInWeek += Math.abs(filteredReadings[0].CT1_Watts);
          totalAmpsInWeek += Math.abs(filteredReadings[0].CT1_Amps);
          if (isNight == true) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            nightWattsProms += filteredReadings[0].CT1_Watts;
            nightKhwProms += Math.abs(kwh);
          } else {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            dayWattsProms += filteredReadings[0].CT1_Watts;
            dayKhwProms += Math.abs(kwh);
          }
          weekTimeStamp.push({
            t: sortKeyEpoch.toISOString(),
            y: Math.abs(kwh),
          });
          kw2 += kwh;
          if (weekDay == 1) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;

            monday += 1;
            mondayAmps += filteredReadings[0].CT1_Amps;
            mondayWatts += filteredReadings[0].CT1_Watts;
            mondayKwh += Math.abs(kwh);
            mondayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: Math.abs(kwh),
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 2) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            tuesday += 1;
            tuesdayWatts += filteredReadings[0].CT1_Watts;
            tuesdayAmps += filteredReadings[0].CT1_Amps;
            tuesdayKwh += Math.abs(kwh);
            tuesdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 3) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            wednesday += 1;
            wednesdayWatts += filteredReadings[0].CT1_Watts;
            wednesdayAmps += filteredReadings[0].CT1_Amps;
            wendsDayKwh += Math.abs(kwh);
            wednesdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 4) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            thursday += 1;
            thursdayWatts += filteredReadings[0].CT1_Watts;
            thursdayAmps = filteredReadings[0].CT1_Amps;
            juevesKwh += Math.abs(kwh);
            thursdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
            // totalWatts += Object.keys(readings2).length;
          }
          if (weekDay == 5) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            friday += 1;
            fridayWatts += filteredReadings[0].CT1_Watts;
            fridayAmps += filteredReadings[0].CT1_Amps;
            viernesKwh += Math.abs(kwh);
            fridayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 6) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            saturday += 1;
            saturdayWatts += filteredReadings[0].CT1_Watts;
            saturdayAmps += filteredReadings[0].CT1_Amps;
            sabadoKwh += Math.abs(kwh);
            saturdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }

          if (weekDay == 7) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            sunday += 1;
            sundayWatts += filteredReadings[0].CT1_Watts;
            sundayAmps += filteredReadings[0].CT1_Amps;
            domingoKwh += Math.abs(kwh);
            sundayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amps,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
        }
        counter++;
        totalWatts += filteredReadings[0].CT1_Watts;
        totalAmps += filteredReadings[0].CT1_Amps;
        totalKhw += Math.abs(kw2);
      }
      totalAmpsProm = totalAmps / filteredArray.length;
      totalWAttsProm = totalWatts / filteredArray.length;
      weekKhwProm = totalKhw / filteredArray.length;
      return [
        {
          registros: counter,
          Connextion: connectionName,
          Timestamp: weekTimeStamp,
          totalKwhInWeek: totalKwhInWeek,
          totalAmpsInWeek: totalAmpsInWeek,
          totalWattsInWeek: totalWattsInWeek,
          nightKhwProms: nightKhwProms,
          nightWattsProms: nightWattsProms,
          dayWattsProms: dayWattsProms,
          dayKhwProms: dayKhwProms,
          lunes: {
            registros: monday || 0,
            amperios: mondayAmps || 0,
            watts: mondayWatts || 0,
            kwh: mondayKwh,
            Timestamp: mondayTimesTamp,
          },
          martes: {
            registros: tuesday || 0,
            amperios: tuesdayAmps || 0,
            watts: tuesdayWatts || 0,
            kwh: tuesdayKwh,
            Timestamp: tuesdayTimesTamp,
          },
          miercoles: {
            registros: wednesday || 0,
            amperios: wednesdayAmps || 0,
            watts: wednesdayWatts || 0,
            kwh: wendsDayKwh,
            Timestamp: wednesdayTimesTamp,
          },
          jueves: {
            registros: thursday || 0,
            amperios: thursdayAmps || 0,
            watts: thursdayWatts || 0,
            kwh: juevesKwh,
            Timestamp: thursdayTimesTamp,
          },
          viernes: {
            registros: friday || 0,
            amperios: fridayAmps || 0,
            watts: fridayWatts || 0,
            kwh: viernesKwh,
            Timestamp: fridayTimesTamp,
          },
          sabado: {
            registros: saturday || 0,
            amperios: saturdayAmps || 0,
            watts: saturdayWatts || 0,
            kwh: sabadoKwh,
            Timestamp: saturdayTimesTamp,
          },
          domingo: {
            registros: sunday || 0,
            amperios: sundayAmps || 0,
            watts: sundayWatts || 0,
            kwh: domingoKwh,
            Timestamp: sundayTimesTamp,
          },
          totalWatts: totalWatts || 0,
          totalAmps: totalAmps || 0,
          diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: totalWAttsProm || 0,
          promedioAmpsSemanal: totalAmpsProm || 0,
          promedioKwhSemanal: weekKhwProm || 0,
          totalKhw: totalKhw,
        },
      ];
    }
    if (connectionName.trim() == "Conexion 2".trim()) {
      const filteredArray = params.filter(
        (x) => x.Relays[1].Name.trim() == connectionName.trim()
      );
      console.log(filteredArray);
      for (let index = 0; index <= filteredArray.length; index++) {
        var dataElement = filteredArray[index];
        var secondDataElement = filteredArray[index + 1];
        if (secondDataElement == undefined) {
          break;
        }

        var sortKeyDate = dataElement.sortkey;
        var sortKeyEpoch =
          module.exports.convertEpochDateToHumanDate(sortKeyDate);
        var LocalDate = moment(sortKeyEpoch);
        var seconkeyDate = secondDataElement.sortkey;
        var secondKeyEpoch =
          module.exports.convertEpochDateToHumanDate(seconkeyDate);
        moment.locale("es-do");
        LocalDate.locale(false);
        var readings2 = filteredArray[index].Relays;
        var filteredReadings = readings2.filter(
          (x) => x.Name == connectionName
        );
        console.log(JSON.stringify(filteredReadings));
        var week = module.exports.isInCurrentWEEK(sortKeyEpoch);
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        if (week === false) {
          break;
        }
        if (readings2 === undefined) {
          break;
        }
        var weekDay = LocalDate.isoWeekday();
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
          const seconds =
            (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
          const kwh =
            (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) / 1000;
          totalKwhInWeek += Math.abs(kwh);
          totalWattsInWeek += Math.abs(filteredReadings[0].CT1_Watts);
          totalAmpsInWeek += Math.abs(filteredReadings[0].CT1_Amps);
          if (isNight == true) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            nightWattsProms += filteredReadings[0].CT1_Watts;
            nightKhwProms += Math.abs(kwh);
          } else {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            dayWattsProms += filteredReadings[0].CT1_Watts;
            dayKhwProms += Math.abs(kwh);
          }
          weekTimeStamp.push({ t: sortKeyEpoch.toISOString(), y: kwh });
          kw2 += kwh;
          if (weekDay == 1) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;

            monday += 1;
            mondayAmps += filteredReadings[0].CT1_Amps;
            mondayWatts += filteredReadings[0].CT1_Watts;
            mondayKwh += Math.abs(kwh);
            mondayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 2) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            tuesday += 1;
            tuesdayWatts += filteredReadings[0].CT1_Watts;
            tuesdayAmps += filteredReadings[0].CT1_Amps;
            tuesdayKwh += Math.abs(kwh);
            tuesdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 3) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            wednesday += 1;
            wednesdayWatts += filteredReadings[0].CT1_Watts;
            wednesdayAmps += filteredReadings[0].CT1_Amps;
            wendsDayKwh += Math.abs(kwh);
            wednesdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 4) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            thursday += 1;
            thursdayWatts += filteredReadings[0].CT1_Watts;
            thursdayAmps = filteredReadings[0].CT1_Amps;
            juevesKwh += Math.abs(kwh);
            thursdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 5) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            friday += 1;
            fridayWatts += filteredReadings[0].CT1_Watts;
            fridayAmps += filteredReadings[0].CT1_Amps;
            viernesKwh += Math.abs(kwh);
            fridayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 6) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            saturday += 1;
            saturdayWatts += filteredReadings[0].CT1_Watts;
            saturdayAmps += filteredReadings[0].CT1_Amps;
            sabadoKwh += Math.abs(kwh);
            saturdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }

          if (weekDay == 7) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            sunday += 1;
            sundayWatts += filteredReadings[0].CT1_Watts;
            sundayAmps += filteredReadings[0].CT1_Amps;
            domingoKwh += Math.abs(kwh);
            sundayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amps,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
        }
        counter++;
        totalWatts += filteredReadings[0].CT1_Watts;
        totalAmps += filteredReadings[0].CT1_Amps;
        totalKhw += Math.abs(kw2);
      }
      totalAmpsProm = totalAmps / filteredArray.length;
      totalWAttsProm = totalWatts / filteredArray.length;
      weekKhwProm = totalKhw / filteredArray.length;
      return [
        {
          registros: counter,
          Connextion: connectionName,
          Timestamp: weekTimeStamp,
          totalKwhInWeek: totalKwhInWeek,
          totalAmpsInWeek: totalAmpsInWeek,
          totalWattsInWeek: totalWattsInWeek,
          nightKhwProms: nightKhwProms,
          nightWattsProms: nightWattsProms,
          dayWattsProms: dayWattsProms,
          dayKhwProms: dayKhwProms,
          lunes: {
            registros: monday || 0,
            amperios: mondayAmps || 0,
            watts: mondayWatts || 0,
            kwh: mondayKwh,
            Timestamp: mondayTimesTamp,
          },
          martes: {
            registros: tuesday || 0,
            amperios: tuesdayAmps || 0,
            watts: tuesdayWatts || 0,
            kwh: tuesdayKwh,
            Timestamp: tuesdayTimesTamp,
          },
          miercoles: {
            registros: wednesday || 0,
            amperios: wednesdayAmps || 0,
            watts: wednesdayWatts || 0,
            kwh: wendsDayKwh,
            Timestamp: wednesdayTimesTamp,
          },
          jueves: {
            registros: thursday || 0,
            amperios: thursdayAmps || 0,
            watts: thursdayWatts || 0,
            kwh: juevesKwh,
            Timestamp: thursdayTimesTamp,
          },
          viernes: {
            registros: friday || 0,
            amperios: fridayAmps || 0,
            watts: fridayWatts || 0,
            kwh: viernesKwh,
            Timestamp: fridayTimesTamp,
          },
          sabado: {
            registros: saturday || 0,
            amperios: saturdayAmps || 0,
            watts: saturdayWatts || 0,
            kwh: sabadoKwh,
            Timestamp: saturdayTimesTamp,
          },
          domingo: {
            registros: sunday || 0,
            amperios: sundayAmps || 0,
            watts: sundayWatts || 0,
            kwh: domingoKwh,
            Timestamp: sundayTimesTamp,
          },
          totalWatts: totalWatts || 0,
          totalAmps: totalAmps || 0,
          diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: totalWAttsProm || 0,
          promedioAmpsSemanal: totalAmpsProm || 0,
          promedioKwhSemanal: weekKhwProm || 0,

          totalKhw: totalKhw,
        },
      ];
    }
    if (connectionName.trim() == "Conexion 3".trim()) {
      const filteredArray = params.filter(
        (x) => x.Relays[2].Name.trim() == connectionName.trim()
      );
      console.log(filteredArray);
      for (let index = 0; index <= filteredArray.length; index++) {
        var dataElement = filteredArray[index];
        var secondDataElement = filteredArray[index + 1];
        if (secondDataElement == undefined) {
          break;
        }

        var sortKeyDate = dataElement.sortkey;
        var sortKeyEpoch =
          module.exports.convertEpochDateToHumanDate(sortKeyDate);
        var LocalDate = moment(sortKeyEpoch);
        var seconkeyDate = secondDataElement.sortkey;
        var secondKeyEpoch =
          module.exports.convertEpochDateToHumanDate(seconkeyDate);
        moment.locale("es-do");
        LocalDate.locale(false);
        var readings2 = filteredArray[index].Relays;
        var filteredReadings = readings2.filter(
          (x) => x.Name == connectionName
        );
        console.log(JSON.stringify(filteredReadings));
        var week = module.exports.isInCurrentWEEK(sortKeyEpoch);
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        if (week === false) {
          break;
        }
        if (readings2 === undefined) {
          break;
        }
        var weekDay = LocalDate.isoWeekday();
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
          const seconds =
            (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
          const kwh =
            (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) / 1000;
          totalKwhInWeek += Math.abs(kwh);
          totalWattsInWeek += Math.abs(filteredReadings[0].CT1_Watts);
          totalAmpsInWeek += Math.abs(filteredReadings[0].CT1_Amps);
          if (isNight == true) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            nightWattsProms += filteredReadings[0].CT1_Watts;
            nightKhwProms += Math.abs(kwh);
          } else {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            dayWattsProms += filteredReadings[0].CT1_Watts;
            dayKhwProms += Math.abs(kwh);
          }
          weekTimeStamp.push({ t: sortKeyEpoch.toISOString(), y: kwh });
          kw2 += kwh;
          if (weekDay == 1) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;

            monday += 1;
            mondayAmps += filteredReadings[0].CT1_Amps;
            mondayWatts += filteredReadings[0].CT1_Watts;
            mondayKwh += Math.abs(kwh);
            mondayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 2) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            tuesday += 1;
            tuesdayWatts += filteredReadings[0].CT1_Watts;
            tuesdayAmps += filteredReadings[0].CT1_Amps;
            tuesdayKwh += Math.abs(kwh);
            tuesdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 3) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            wednesday += 1;
            wednesdayWatts += filteredReadings[0].CT1_Watts;
            wednesdayAmps += filteredReadings[0].CT1_Amps;
            wendsDayKwh += Math.abs(kwh);
            wednesdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 4) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            thursday += 1;
            thursdayWatts += filteredReadings[0].CT1_Watts;
            thursdayAmps = filteredReadings[0].CT1_Amps;
            juevesKwh += Math.abs(kwh);
            thursdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 5) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            friday += 1;
            fridayWatts += filteredReadings[0].CT1_Watts;
            fridayAmps += filteredReadings[0].CT1_Amps;
            viernesKwh += Math.abs(kwh);
            fridayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
          if (weekDay == 6) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            saturday += 1;
            saturdayWatts += filteredReadings[0].CT1_Watts;
            saturdayAmps += filteredReadings[0].CT1_Amps;
            sabadoKwh += Math.abs(kwh);
            saturdayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amp,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }

          if (weekDay == 7) {
            const seconds =
              (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh =
              (filteredReadings[0].CT1_Watts * seconds * (1 / (60 * 60))) /
              1000;
            sunday += 1;
            sundayWatts += filteredReadings[0].CT1_Watts;
            sundayAmps += filteredReadings[0].CT1_Amps;
            domingoKwh += Math.abs(kwh);
            sundayTimesTamp.push({
              time: sortKeyEpoch / 1000,
              valueAmps: filteredReadings[0].CT1_Amps,
              valueKwh: kwh,
              valueWatts: filteredReadings[0].CT1_Watts,
            });
            break;
          }
        }
        counter++;
        totalWatts += filteredReadings[0].CT1_Watts;
        totalAmps += filteredReadings[0].CT1_Amps;
      }
      totalAmpsProm = totalAmps / filteredArray.length;
      totalWAttsProm = totalWatts / filteredArray.length;
      weekKhwProm = totalKhw / filteredArray.length;
      return [
        {
          registros: counter,
          Connextion: connectionName,
          Timestamp: weekTimeStamp,
          totalKwhInWeek: totalKwhInWeek,
          totalAmpsInWeek: totalAmpsInWeek,
          totalWattsInWeek: totalWattsInWeek,
          nightKhwProms: nightKhwProms,
          nightWattsProms: nightWattsProms,
          dayWattsProms: dayWattsProms,
          dayKhwProms: dayKhwProms,
          lunes: {
            registros: monday || 0,
            amperios: mondayAmps || 0,
            watts: mondayWatts || 0,
            kwh: mondayKwh,
            Timestamp: mondayTimesTamp,
          },
          martes: {
            registros: tuesday || 0,
            amperios: tuesdayAmps || 0,
            watts: tuesdayWatts || 0,
            kwh: tuesdayKwh,
            Timestamp: tuesdayTimesTamp,
          },
          miercoles: {
            registros: wednesday || 0,
            amperios: wednesdayAmps || 0,
            watts: wednesdayWatts || 0,
            kwh: wendsDayKwh,
            Timestamp: wednesdayTimesTamp,
          },
          jueves: {
            registros: thursday || 0,
            amperios: thursdayAmps || 0,
            watts: thursdayWatts || 0,
            kwh: juevesKwh,
            Timestamp: thursdayTimesTamp,
          },
          viernes: {
            registros: friday || 0,
            amperios: fridayAmps || 0,
            watts: fridayWatts || 0,
            kwh: viernesKwh,
            Timestamp: fridayTimesTamp,
          },
          sabado: {
            registros: saturday || 0,
            amperios: saturdayAmps || 0,
            watts: saturdayWatts || 0,
            kwh: sabadoKwh,
            Timestamp: saturdayTimesTamp,
          },
          domingo: {
            registros: sunday || 0,
            amperios: sundayAmps || 0,
            watts: sundayWatts || 0,
            kwh: domingoKwh,
            Timestamp: sundayTimesTamp,
          },
          totalWatts: totalWatts || 0,
          totalAmps: totalAmps || 0,
          diaConsulta: new Date().toISOString(),
          promedioWattsSemanal: totalWAttsProm || 0,
          promedioAmpsSemanal: totalAmpsProm || 0,
          promedioKwhSemanal: weekKhwProm || 0,
          totalKhw: totalKhw,
        },
      ];
    }
  }
};
