/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 * @function convertEpochDateToHumanDate()
 * 
 */

module.exports.convertEpochDateToHumanDate = function(epochDate){
    var epoch = new Date(epochDate * 1000);
    return epoch;
};
/**
 * @function isNightTarif
 * @param {*} dateObj date
 * @returns boolean
 */
 module.exports.isNightTarif = function(dateObj){
    if (typeof dateObj ==='number') {
        dateObj = new Date(date);
        
    }
    if((dateObj.getHours() >= 21 && dateObj.getHours() <= 23) ||
		(dateObj.getHours() >= 0 && dateObj.getHours() <= 5)){
		return true;
	}
    if(dateObj.getDay() === 0 || dateObj.getDay() === 6){
		return true;
	}

	return false;
};
/**
 * @function isInCurrentWEEK()
 * @param {*} date date
 * @returns new Date()
 */
module.exports.isInCurrentWEEK = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isThisWeek = (now.isoWeek() == input.isoWeek());
    return isThisWeek;
};
/**
 * @function dailyHelperFromConnections
 * @author Claudio Raul Brito Mercedes
 * @param {} connectionName  the ConnectionName
 * @param {*} params the DynamoDBArray 
 * 
 */
module.exports.dailyHelperFromConnections =  function(connectionName,params){
    const moment = require('moment');
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
    var mondayWatts = 0 ;
    var tuesdayWatts = 0;
    var thursdayWatts = 0;
    var wednesdayWatts = 0; 
    var fridayWatts = 0 ;
    var saturdayWatts = 0; 
    var sundayWatts= 0;
    var mondayAmps = 0;
    var tuesdayAmps = 0;
    var thursdayAmps = 0;
    var wednesdayAmps =0;
    var fridayAmps = 0;
    var saturdayAmps = 0;
    var sundayAmps = 0;
    let totalAmps = 0;
    let totalAmpsProm = 0;
    let totalKhw = 0;
   var mondayTimesTamp =[];
   var tuesdayTimesTamp =[];
   var  wednesdayTimesTamp =[];
   var   thursdayTimesTamp =[];
   var  fridayTimesTamp =[];
   var  saturdayTimesTamp =[];
   var  sundayTimesTamp =[];
   var weekTimeStamp = [];
   let totalKwhInWeek = 0;
   let totalAmpsInWeek = 0;
   let totalWattsInWeek = 0;
   let kw2 = 0;
   var isNight = module.exports.isNightTarif(sortKeyEpoch);
   const filteredArray = params.filter(x => x.Relays[0].Name == connectionName);
   for (let index = 0; index <= filteredArray.length; index++) {
    var dataElement = filteredArray[index];
    var secondDataElement = filteredArray[index + 1];
    if (secondDataElement == undefined) {
        break; 
     }

    var sortKeyDate = dataElement.sortkey;
    var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortKeyDate);
    var LocalDate = moment(sortKeyEpoch);
    var seconkeyDate = secondDataElement.sortkey;
    var secondKeyEpoch = module.exports.convertEpochDateToHumanDate(seconkeyDate);
    moment.locale('es-do');
    LocalDate.locale(false);
    var readings2 = filteredArray[index].Relays;
    var filteredReadings = readings2.filter(x => x.Name === connectionName);
    var week = module.exports.isInCurrentWEEK(sortKeyEpoch);
    if (week === false) {
        break;
    }
    if (readings2 === undefined ) {
        break;
    }
    var weekDay = LocalDate.isoWeekday();
    for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
        const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
        const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
        if (isNight == true) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
            nightWattsProms += readings2.device_watts;
            nightKhwProms += Math.abs(kwh);

        }
        else{
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
            dayWattsProms += readings2.device_watts;
            dayKhwProms += Math.abs(kwh);

        }
        weekTimeStamp.push({t:sortKeyEpoch.toISOString(),y:kwh});
        kw2+= kwh;
        if (weekDay == 1) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
        
            monday +=1;
            mondayAmps += filteredReadings[0].CT1_Amps;
            mondayWatts += filteredReadings[0].CT1_Watts;
            mondayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amp,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
                
        }
        if (weekDay == 2) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            tuesday +=1;
            tuesdayWatts += filteredReadings[0].CT1_Watts;
            tuesdayAmps += filteredReadings[0].CT1_Amps;
            tuesdayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amp,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
                
        }
        if (weekDay == 3) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            wednesday +=1;
            wednesdayWatts += filteredReadings[0].CT1_Watts;
            wednesdayAmps += filteredReadings[0].CT1_Amps;
            wednesdayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amp,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
                
        }
        if (weekDay == 4) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            thursday +=1;
            thursdayWatts += filteredReadings[0].CT1_Watts;
            thursdayAmps = filteredReadings[0].CT1_Amps;
            thursdayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amp,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
            // totalWatts += Object.keys(readings2).length;
                
        }
        if (weekDay == 5) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            friday +=1;
            fridayWatts += filteredReadings[0].CT1_Watts;
            fridayAmps +=filteredReadings[0].CT1_Amps;
            fridayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amp,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
                
        }
        if (weekDay == 6) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            saturday +=1;
            saturdayWatts += filteredReadings[0].CT1_Watts;
            saturdayAmps += filteredReadings[0].CT1_Amps;
            saturdayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amp,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
                
        }

        if (weekDay == 7) {
            const seconds = (secondKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            sunday +=1;
            sundayWatts += filteredReadings[0].CT1_Watts;
            sundayAmps += filteredReadings[0].CT1_Amps;
            sundayTimesTamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
            break;
                
        }
        


        
        
        
    }
    counter ++;
    totalWatts += filteredReadings[0].CT1_Watts;
    totalAmps += filteredReadings[0].CT1_Amps;
    totalKhw += kw2;

    
    
}
    totalAmpsProm = totalAmps/ filteredArray.length
    totalWAttsProm = totalWatts/ filteredArray.length;
    weekKhwProm = totalKhw / filteredArray.length;
    const ob =  [ 
        {registros:counter,Connextion:connectionName,Timestamp:weekTimeStamp,lunes:{registros:monday || 0, amperios: mondayAmps || 0,watts:mondayWatts || 0, Timestamp:mondayTimesTamp}
        ,martes:{registros:tuesday || 0, amperios: tuesdayAmps || 0,watts:tuesdayWatts || 0,Timestamp:tuesdayTimesTamp}
        ,miercoles:{registros:wednesday || 0, amperios: wednesdayAmps || 0,watts:wednesdayWatts || 0,Timestamp:wednesdayTimesTamp}
        ,jueves:{registros:thursday || 0, amperios: thursdayAmps || 0,watts:thursdayWatts || 0,Timestamp:thursdayTimesTamp}
        ,viernes:{registros:friday || 0 , amperios: fridayAmps || 0,watts:fridayWatts || 0, Timestamp:fridayTimesTamp}
        ,sabado:{registros:saturday || 0 , amperios: saturdayAmps || 0 ,watts:saturdayWatts || 0, Timestamp:saturdayTimesTamp }
        ,domingo:{registros:sunday || 0, amperios: sundayAmps || 0,watts:sundayWatts ||0, Timestamp:sundayTimesTamp  },
        totalWatts:totalWatts || 0, totalAmps:totalAmps || 0 , diaConsulta: new Date().toISOString(),
        promedioWattsSemanal: totalWAttsProm ||0, promedioAmpsSemanal: totalAmpsProm || 0, promedioKwhSemanal: weekKhwProm || 0,
        totalWatts:totalWatts || 0, totalAmps:totalAmps || 0 , diaConsulta: new Date().toISOString(), totalKhw: totalKhw
    }];
    return ob;

};

