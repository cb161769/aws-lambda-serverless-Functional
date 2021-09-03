/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
 module.exports.convertEpochDateToHumanDate = function(epochDate){
    return new Date(epochDate * 1000);

}

/**
 * 
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
}


module.exports.dailyHelper =  function (params){
    const moment = require('moment');
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
                TimeStamp:[]
            },
            Day:{
                amps:0,
                watts:0,
                kilowatts:0,
                TimeStamp:[]

            }
        }
    };
    var  dayWattsProms= 0;
    var nightWattsProms = 0;
    var dayKhwProms = 0;
    var nightKhwProms = 0;
    const fixedParams = params.filter(x => x.sortkey != undefined);
    for (let index = 0; index <= fixedParams.length; index++) {
        var dataElement = fixedParams[index];
        if (dataElement == undefined) {
            break;
        }
        var secondDataElement = fixedParams[index + 1];
        if (secondDataElement == undefined) {
            break; 
         }
        var seconkeyDate = secondDataElement.sortkey;
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(seconkeyDate);
        var sortKeyDate = dataElement.sortkey;
        if (seconkeyDate == undefined && sortKeyDate == undefined) {
            break;
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortKeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = fixedParams[index].readings;
        if (readings2 == undefined) {
            break;
            
        }
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        for (let j = 0; j <= Object.keys(readings2).length;j++) {

            if (isNight == true) {
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                dayInformation.DayDetails.Night.amps += readings2.device_amps;
                dayInformation.DayDetails.Night.kilowatts += kwh;
                dayInformation.DayDetails.Night.watts += readings2.device_watts;
                nightWattsProms += readings2.device_watts;
                nightKhwProms += Math.abs(kwh);
                dayInformation.DayDetails.Night.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:readings2.device_amps,valueKwh:kwh,valueWatts:readings2.device_watts});
                break;
                
            }else{
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                dayInformation.DayDetails.Day.amps += readings2.device_amps;
                dayInformation.DayDetails.Day.kilowatts += kwh;
                dayInformation.DayDetails.Day.watts += readings2.device_watts;
                dayWattsProms += readings2.device_watts;
                dayKhwProms += Math.abs(kwh);
                dayInformation.DayDetails.Day.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:readings2.device_amps,valueKwh:kwh,valueWatts:readings2.device_watts});
                break;
            }

  
        }
        dayInformation.AlldayName = LocalDate.toLocaleString();
        dayInformation.AlldayAmps += readings2.device_amps;
        dayInformation.AlldayWatts += readings2.device_watts;
        
    }
    totalAmpsProm = dayInformation.AlldayAmps/ params.length;
    totalWAttsProm = dayInformation.AlldayWatts/ params.length;
    const ob = [
       { detail: dayInformation, dayWattsProm:dayWattsProms, NightWattsProm:nightWattsProms, NightsKhwProm:nightKhwProms,
        dayKhwProms:dayKhwProms}
    ];
    return ob;
}