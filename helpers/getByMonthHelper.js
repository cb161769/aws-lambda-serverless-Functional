/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} y year
 * @param {*} m month
 * @returns date
 */
module.exports.findLastDay = function(y,m){
    return new Date(y,m+1,0);
};
/**
 * 
 * @param {*} y year
 * @param {*} m year
 * @returns dateObj 
 */
module.exports.findFirstDay = function(y,m){
    return new Date(y,m,1);
};

/**
 * @function isNightTarif()
 * @description this method is used when the given timesTamp is in the night or the day
 * @returns boolean
 * @author Claudio Raul Brito Mercedes
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
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
 module.exports.convertEpochDateToHumanDate = function (epochDate)   {
    var epoch = new Date(epochDate * 1000);
    return epoch;
}
module.exports.isInCurrentMonth = function (check){
    var now = new Date();
    if (
        (check.getFullYear() == now.getFullYear()) &&
        (check.getMonth() == now.getMonth()) &&
        (check.getDate() >= now.getDate())
     ) {
        return true;
     }else{
         return false;
     }
}
/**
 * @description this Functions get all detail from a given Month
 * @function getByMonth()
 * @param {*} params parameters
 */
module.exports.getByMonth =  function (params){
    const moment = require('moment');
    
    let totalWAttsProm = 0;

    var MonthInformation = {
        MonthName:'',
        allMonthAmps:0,
        allMonthWatts:0,
        allMonthKiloWatts:0,
        MonthDetails:{
            firstWeek:{ 
                monday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0,
              
                },
                tuesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                wednesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                thursday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                friday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                saturday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                sunday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                totalKwhPerWeek:0,
                totalWattsPerWeek:0,
                totalAmpsPerWeek:0,
                TimeStamp:[]
    
            },
            secondWeek:{ 
                monday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                tuesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                wednesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                thursday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                friday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                saturday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                sunday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                totalKwhPerWeek:0,
                totalWattsPerWeek:0,
                totalAmpsPerWeek:0,
                TimeStamp:[]
            },
            thirdweek:{ 
                monday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                tuesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                wednesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                thursday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                friday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                saturday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                sunday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                totalKwhPerWeek:0,
                totalWattsPerWeek:0,
                totalAmpsPerWeek:0,
                TimeStamp:[]
    
            },
            fourthweek:{ 
                monday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                tuesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                wednesday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                thursday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                friday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                saturday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                sunday:{
                    Night:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Day:{
                        count:0,
                        kilowatts:0,
                        watts:0,
                        amps:0
                    },
                    Total:0
                },
                totalKwhPerWeek:0,
                totalWattsPerWeek:0,
                totalAmpsPerWeek:0,
                TimeStamp:[]
    
            }
        }
    };
    var  dayWattsProms= 0;
    var nightWattsProms = 0;
    var dayKhwProms = 0;
    var nightKhwProms = 0;
    var counter = 0 ;
    var weekTimeStamp = [];
    const fixedParams = params.filter(x => x.sortkey != undefined);
    if (params.length === 0) {
        return  [
            { detail: MonthInformation, count:counter,
             dayWattsProm:dayWattsProms, NightWattsProm:nightWattsProms, NightsKhwProm:nightKhwProms,
             dayKhwProms:dayKhwProms,
             Timestamp:weekTimeStamp
            }
         ];
    }
    else{
        for (let index = 0; index < fixedParams.length; index++) {
            var dataElement = fixedParams[index];
            if (dataElement == undefined) {
                break;
            }
            var secondDataElement = fixedParams[index + 1];
            if (secondDataElement == undefined) {
               break; 
            }
            var sortKeyDate = dataElement.sortkey;
             var seconkeyDate = secondDataElement.sortkey;
            
           var sortKeyDate = dataElement.sortkey;
            if (seconkeyDate == undefined && sortKeyDate == undefined) {
                break;
            }
           var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(seconkeyDate);
            var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortKeyDate);
            var LocalDate = moment(sortKeyEpoch);
            moment.locale('es-do');
            LocalDate.locale(false);
            var month = LocalDate.month();
            var day = LocalDate.isoWeekday();
            var weekMonth = (LocalDate.week() - (month* 4));
            var readings2 = fixedParams[index].readings;
            if (readings2 == undefined || readings2 == null) {
                break;
                
            }
            var isInCurrentMonth = module.exports.isInCurrentMonth(sortKeyEpoch);
            if (isInCurrentMonth === false){
                break;
            }
            var isNight = module.exports.isNightTarif(sortKeyEpoch);

            for (let j = 0; j <= Object.keys(readings2).length;j++) {
                if (isNight == true) {
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                    nightWattsProms += readings2.device_watts;
                    nightKhwProms += Math.abs(kwh);
    
                }
                else{
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                    dayWattsProms += readings2.device_watts;
                    dayKhwProms += Math.abs(kwh);
    
                }
                weekTimeStamp.push({t:sortKeyEpoch.toISOString(),y:readings2.device_watts});
                MonthInformation.allMonthAmps += readings2.device_amps;
                MonthInformation.allMonthWatts += readings2.device_watts;
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                MonthInformation.allMonthKiloWatts += Math.abs(kwh);
                if (weekMonth ==1) {
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                    MonthInformation.MonthDetails.firstWeek.totalWattsPerWeek += readings2.device_watts;
                    MonthInformation.MonthDetails.firstWeek.totalKwhPerWeek += Math.abs(kwh);
                    MonthInformation.MonthDetails.firstWeek.totalAmpsPerWeek += readings2.device_amps;
                    MonthInformation.MonthDetails.firstWeek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:readings2.device_amps,valueKwh:kwh,valueWatts:readings2.device_watts});
                    if (day ==1) {
                        MonthInformation.MonthDetails.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.monday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.monday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.monday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.monday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.monday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.monday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MonthInformation.MonthDetails.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.tuesday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.tuesday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.tuesday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.tuesday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MonthInformation.MonthDetails.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.wednesday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.wednesday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.wednesday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.wednesday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MonthInformation.MonthDetails.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.thursday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.thursday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.thursday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.thursday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.thursday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.thursday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MonthInformation.MonthDetails.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.friday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.friday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.friday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.friday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.friday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.friday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MonthInformation.MonthDetails.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.saturday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.saturday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.saturday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.saturday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.saturday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.saturday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MonthInformation.MonthDetails.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.firstWeek.sunday.Night.count += 1;
                            MonthInformation.MonthDetails.firstWeek.sunday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.sunday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.firstWeek.sunday.Day.count += 1;
                            MonthInformation.MonthDetails.firstWeek.sunday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.firstWeek.sunday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                    MonthInformation.MonthDetails.secondWeek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:readings2.device_amps,valueKwh:kwh,valueWatts:readings2.device_watts});
                    MonthInformation.MonthDetails.secondWeek.totalWattsPerWeek += readings2.device_watts;
                    MonthInformation.MonthDetails.secondWeek.totalKwhPerWeek += Math.abs(kwh);
                    MonthInformation.MonthDetails.secondWeek.totalAmpsPerWeek += readings2.device_amps;
                    // MonthInformation.MonthDetails.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MonthInformation.MonthDetails.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.monday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.monday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.monday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.monday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.monday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.monday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MonthInformation.MonthDetails.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.tuesday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.tuesday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.tuesday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.tuesday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MonthInformation.MonthDetails.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.wednesday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.wednesday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.wednesday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.wednesday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MonthInformation.MonthDetails.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.thursday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.thursday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.thursday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.thursday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.thursday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.thursday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MonthInformation.MonthDetails.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.friday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.friday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.friday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.friday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.friday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.friday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MonthInformation.MonthDetails.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.saturday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.saturday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.saturday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.saturday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.saturday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.saturday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MonthInformation.MonthDetails.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.secondWeek.sunday.Night.count += 1;
                            MonthInformation.MonthDetails.secondWeek.sunday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.sunday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.secondWeek.sunday.Day.count += 1;
                            MonthInformation.MonthDetails.secondWeek.sunday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.secondWeek.sunday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
    
                if (weekMonth ==3) {
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                   // MonthInformation.MonthDetails.thirdweek.totalKwhPerWeek += readings2.device_watts;
                   MonthInformation.MonthDetails.thirdweek.totalWattsPerWeek += readings2.device_watts;
                   MonthInformation.MonthDetails.thirdweek.totalKwhPerWeek += Math.abs(kwh);
                   MonthInformation.MonthDetails.thirdweek.totalAmpsPerWeek += readings2.device_amps;
                    MonthInformation.MonthDetails.thirdweek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:readings2.device_amps,valueKwh:kwh,valueWatts:readings2.device_watts});
                    //  MonthInformation.MonthDetails.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                         MonthInformation.MonthDetails.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.monday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.monday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.monday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.monday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.monday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.monday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                         MonthInformation.MonthDetails.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.tuesday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.tuesday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.tuesday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.tuesday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.tuesday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.tuesday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                         MonthInformation.MonthDetails.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.wednesday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.wednesday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.wednesday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.wednesday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.wednesday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.wednesday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                         MonthInformation.MonthDetails.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.thursday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.thursday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.thursday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.thursday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.thursday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.thursday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                         MonthInformation.MonthDetails.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.friday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.friday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.friday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.friday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.friday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.friday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                         MonthInformation.MonthDetails.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.saturday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.saturday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.saturday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.saturday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.saturday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.saturday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                         MonthInformation.MonthDetails.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                             MonthInformation.MonthDetails.thirdweek.sunday.Night.count += 1;
                             MonthInformation.MonthDetails.thirdweek.sunday.Night.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.sunday.Night.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                             MonthInformation.MonthDetails.thirdweek.sunday.Day.count += 1;
                             MonthInformation.MonthDetails.thirdweek.sunday.Day.kilowatts += kwh;
                             MonthInformation.MonthDetails.thirdweek.sunday.Day.watts += readings2.device_watts;
                             MonthInformation.MonthDetails.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
    
                if (weekMonth ==4) {
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                    MonthInformation.MonthDetails.fourthweek.totalWattsPerWeek += readings2.device_watts;
                    MonthInformation.MonthDetails.fourthweek.totalKwhPerWeek += Math.abs(kwh);
                    MonthInformation.MonthDetails.fourthweek.totalAmpsPerWeek += readings2.device_amps;
                    MonthInformation.MonthDetails.fourthweek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:readings2.device_amps,valueKwh:kwh,valueWatts:readings2.device_watts});
                    // MonthInformation.MonthDetails.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MonthInformation.MonthDetails.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.monday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.monday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.monday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.monday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.monday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.monday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MonthInformation.MonthDetails.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.tuesday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.tuesday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.tuesday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.tuesday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MonthInformation.MonthDetails.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.wednesday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.wednesday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.wednesday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.wednesday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MonthInformation.MonthDetails.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.thursday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.thursday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.thursday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.thursday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.thursday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.thursday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MonthInformation.MonthDetails.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.friday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.friday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.friday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.friday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.friday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.friday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MonthInformation.MonthDetails.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.saturday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.saturday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.saturday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.saturday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.saturday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.saturday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
    
                        MonthInformation.MonthDetails.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MonthInformation.MonthDetails.fourthweek.sunday.Night.count += 1;
                            MonthInformation.MonthDetails.fourthweek.sunday.Night.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.sunday.Night.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MonthInformation.MonthDetails.fourthweek.sunday.Day.count += 1;
                            MonthInformation.MonthDetails.fourthweek.sunday.Day.kilowatts += kwh;
                            MonthInformation.MonthDetails.fourthweek.sunday.Day.watts += readings2.device_watts;
                            MonthInformation.MonthDetails.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                   
                }
                break;
            }
            MonthInformation.allMonthAmps += readings2.device_amps;
            MonthInformation.allMonthWatts += readings2.device_watts;
             const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
            const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
            MonthInformation.MonthName = LocalDate.toString();
            MonthInformation.allMonthKiloWatts += Math.abs(kwh);
            counter ++ ;
        }
        totalAmpsProm = MonthInformation.allMonthAmps/ params.length;
        totalWAttsProm = MonthInformation.allMonthWatts/ params.length;
        return  [
           { detail: MonthInformation, count:counter,
            dayWattsProm:dayWattsProms, NightWattsProm:nightWattsProms, NightsKhwProm:nightKhwProms,
            dayKhwProms:dayKhwProms,
            Timestamp:weekTimeStamp
           }
        ];
    }


}

