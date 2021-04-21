/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
 module.exports.convertEpochDateToHumanDate = function(epochDate){
    var epoch = new Date(epochDate * 1000);
    return epoch;
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


module.exports.dailyHelper = function (params){
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
            },
            Day:{
                amps:0,
                watts:0,
                kilowatts:0,

            }
        }
    }
    for (let index = 0; index < params.length; index++) {
        var dataElement = params[index];
        var secondDataElement = params[index + 1];
        var seconkeyDate = secondDataElement.sortkey;
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(seconkeyDate);
        var sortKeyDate = dataElement.sortkey;
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortKeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = params[index].readings;
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
                break;
                
            }else{
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                dayInformation.DayDetails.Day.amps += readings2.device_amps;
                dayInformation.DayDetails.Day.kilowatts += kwh;
                dayInformation.DayDetails.Day.watts += readings2.device_watts;
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
       { detail: dayInformation}
    ];
    return ob;
}