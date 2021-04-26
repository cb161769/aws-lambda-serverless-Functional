/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
 module.exports.convertEpochDateToHumanDate = function(epochDate){
    var epoch = new Date(epochDate * 1000);
    return epoch;
};
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
};

module.exports.connectionsDailyHelper = async function(connectionName,params){
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
    const fixedParams = params.filter(x => x.Relays[0].Name == connectionName);
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
        var readings2 = filteredArray[index].Relays;
        var filteredReadings = readings2.filter(x => x.Name === connectionName);
        if (readings2 == undefined) {
            break;
            
        }
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
            
            if (isNight == true) {
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                dayInformation.DayDetails.Night.amps += filteredReadings[0].CT1_Amps;
                dayInformation.DayDetails.Night.kilowatts += kwh;
                dayInformation.DayDetails.Night.watts += filteredReadings[0].CT1_Watts;
                dayInformation.DayDetails.Night.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
                break;
                
            }else{
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                dayInformation.DayDetails.Day.amps += filteredReadings[0].CT1_Amps;
                dayInformation.DayDetails.Day.kilowatts += kwh;
                dayInformation.DayDetails.Day.watts += filteredReadings[0].CT1_Watts;
                dayInformation.DayDetails.Day.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
                break;
            }
            
        }
        dayInformation.AlldayName = LocalDate.toLocaleString();
        dayInformation.AlldayAmps += filteredReadings[0].CT1_Amps;
        dayInformation.AlldayWatts += filteredReadings[0].CT1_Watts;
    }   
    totalAmpsProm = dayInformation.AlldayAmps/ fixedParams.length;
    totalWAttsProm = dayInformation.AlldayWatts/ fixedParams.length;
    const ob = [
       { detail: dayInformation}
    ];
    return ob;
}
