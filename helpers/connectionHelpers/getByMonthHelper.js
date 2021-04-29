/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} y year
 * @param {*} m month
 * @returns date
 */
 module.exports.findLastDayConnection = function(y,m){
    return new Date(y,m+1,0);
};
/**
 * 
 * @param {*} y year
 * @param {*} m year
 * @returns dateObj 
 */
 module.exports.findFirstDayConnection = function(y,m){
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
};
/**
 * @description this Functions get all detail from a given Month for de connections
 * @function getByMonthConnections()
 * @param {*} params parameters
 */
module.exports.getByMonthConnections = async function(ConnectionName,Params){
    const moment = require('moment');
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
                TimeStamp:[]
    
            },
            TimeStamp:[],
            kwhTimesTamp:[],
            ampsTimestamp:[]
        }
    };
    var counter = 0 ;
    const fixedParams = Params.filter(x => x.Relays[0].Name == ConnectionName);
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
        var readings2 = fixedParams[index].Relays;
        if (readings2 == undefined || readings2 == null) {
            break;
            
        }
        var filteredReadings = readings2.filter(x => x.Name === ConnectionName);

     
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        for (let j = 0; j <= Object.keys(filteredReadings).length;j++) {

            MonthInformation.allMonthAmps += filteredReadings[0].CT1_Amps;
            MonthInformation.allMonthWatts += filteredReadings[0].CT1_Watts;
            const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
             const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
            MonthInformation.allMonthKiloWatts += kwh * ( -1);
            MonthInformation.MonthDetails.TimeStamp.push({t:sortKeyEpoch.toISOString(),y:filteredReadings[0].CT1_Watts});
            MonthInformation.MonthDetails.ampsTimestamp.push({t:sortKeyEpoch.toISOString(),y:filteredReadings[0].CT1_Amps});
            MonthInformation.MonthDetails.kwhTimesTamp.push({t:sortKeyEpoch.toISOString(),y:kwh * (-1)});
            if (weekMonth ==1) {
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                 const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                MonthInformation.MonthDetails.firstWeek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                MonthInformation.MonthDetails.firstWeek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
                if (day ==1) {
                    MonthInformation.MonthDetails.firstWeek.monday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    // to do
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.monday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.monday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.monday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.monday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.monday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.monday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.monday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.monday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day == 2) {
                    MonthInformation.MonthDetails.firstWeek.tuesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.tuesday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.tuesday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.tuesday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.tuesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.tuesday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.tuesday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.tuesday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.tuesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day ==3) {
                    MonthInformation.MonthDetails.firstWeek.wednesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.wednesday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.wednesday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.wednesday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.wednesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.wednesday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.wednesday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.wednesday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.wednesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 4) {
                    MonthInformation.MonthDetails.firstWeek.thursday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.thursday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.thursday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.thursday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.thursday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.thursday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.thursday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.thursday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.thursday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day ==5) {
                    MonthInformation.MonthDetails.firstWeek.friday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.friday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.friday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.friday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.friday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.friday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.friday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.friday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.friday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 6) {
                    MonthInformation.MonthDetails.firstWeek.saturday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.saturday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.saturday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.saturday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.saturday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.saturday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.saturday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.saturday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.saturday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day == 7) {
                    MonthInformation.MonthDetails.firstWeek.sunday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.firstWeek.sunday.Night.count += 1;
                        MonthInformation.MonthDetails.firstWeek.sunday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.sunday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.sunday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.firstWeek.sunday.Day.count += 1;
                        MonthInformation.MonthDetails.firstWeek.sunday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.firstWeek.sunday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.firstWeek.sunday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                
            }
            if (weekMonth ==2) {
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                 const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                MonthInformation.MonthDetails.secondWeek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                MonthInformation.MonthDetails.secondWeek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
                // MonthInformation.MonthDetails.secondWeek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                if (day ==1) {
                    MonthInformation.MonthDetails.secondWeek.monday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    // to do
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.monday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.monday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.monday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.monday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.monday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.monday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.monday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.monday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day == 2) {
                    MonthInformation.MonthDetails.secondWeek.tuesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.tuesday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.tuesday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.tuesday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.tuesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.tuesday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.tuesday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.tuesday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.tuesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day ==3) {
                    MonthInformation.MonthDetails.secondWeek.wednesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.wednesday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.wednesday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.wednesday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.wednesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.wednesday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.wednesday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.wednesday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.wednesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 4) {
                    MonthInformation.MonthDetails.secondWeek.thursday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.thursday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.thursday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.thursday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.thursday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.thursday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.thursday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.thursday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.thursday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day ==5) {
                    MonthInformation.MonthDetails.secondWeek.friday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.friday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.friday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.friday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.friday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.friday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.friday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.friday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.friday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 6) {
                    MonthInformation.MonthDetails.secondWeek.saturday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.saturday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.saturday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.saturday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.saturday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.saturday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.saturday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.saturday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.saturday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day == 7) {
                    MonthInformation.MonthDetails.secondWeek.sunday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.secondWeek.sunday.Night.count += 1;
                        MonthInformation.MonthDetails.secondWeek.sunday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.sunday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.sunday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.secondWeek.sunday.Day.count += 1;
                        MonthInformation.MonthDetails.secondWeek.sunday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.secondWeek.sunday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.secondWeek.sunday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                
            }

            if (weekMonth ==3) {
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                 const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                MonthInformation.MonthDetails.thirdweek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                MonthInformation.MonthDetails.thirdweek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
                //  MonthInformation.MonthDetails.thirdweek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                if (day ==1) {
                     MonthInformation.MonthDetails.thirdweek.monday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    // to do
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.monday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.monday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.monday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.monday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.monday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.monday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.monday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.monday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day == 2) {
                     MonthInformation.MonthDetails.thirdweek.tuesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.tuesday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.tuesday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.tuesday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.tuesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.tuesday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.tuesday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.tuesday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.tuesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day ==3) {
                     MonthInformation.MonthDetails.thirdweek.wednesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.wednesday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.wednesday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.wednesday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.wednesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.wednesday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.wednesday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.wednesday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.wednesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 4) {
                     MonthInformation.MonthDetails.thirdweek.thursday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.thursday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.thursday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.thursday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.thursday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.thursday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.thursday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.thursday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.thursday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day ==5) {
                     MonthInformation.MonthDetails.thirdweek.friday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.friday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.friday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.friday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.friday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.friday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.friday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.friday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.friday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 6) {
                     MonthInformation.MonthDetails.thirdweek.saturday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.saturday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.saturday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.saturday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.saturday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.saturday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.saturday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.saturday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.saturday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day == 7) {
                     MonthInformation.MonthDetails.thirdweek.sunday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                         MonthInformation.MonthDetails.thirdweek.sunday.Night.count += 1;
                         MonthInformation.MonthDetails.thirdweek.sunday.Night.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.sunday.Night.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.sunday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                         MonthInformation.MonthDetails.thirdweek.sunday.Day.count += 1;
                         MonthInformation.MonthDetails.thirdweek.sunday.Day.kilowatts += kwh;
                         MonthInformation.MonthDetails.thirdweek.sunday.Day.watts += filteredReadings[0].CT1_Watts;
                         MonthInformation.MonthDetails.thirdweek.sunday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                
            }

            if (weekMonth ==4) {
                const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                 const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                MonthInformation.MonthDetails.fourthweek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                MonthInformation.MonthDetails.fourthweek.TimeStamp.push({time:sortKeyEpoch/1000,valueAmps:filteredReadings[0].CT1_Amps,valueKwh:kwh,valueWatts:filteredReadings[0].CT1_Watts});
                // MonthInformation.MonthDetails.fourthweek.totalKwhPerWeek += filteredReadings[0].CT1_Watts;
                if (day ==1) {
                    MonthInformation.MonthDetails.fourthweek.monday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                    // to do
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.monday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.monday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.monday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.monday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.monday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.monday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.monday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.monday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day == 2) {
                    MonthInformation.MonthDetails.fourthweek.tuesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.tuesday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.tuesday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.tuesday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.tuesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.tuesday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.tuesday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.tuesday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.tuesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day ==3) {
                    MonthInformation.MonthDetails.fourthweek.wednesday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.wednesday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.wednesday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.wednesday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.wednesday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.wednesday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.wednesday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.wednesday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.wednesday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 4) {
                    MonthInformation.MonthDetails.fourthweek.thursday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.thursday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.thursday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.thursday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.thursday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.thursday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.thursday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.thursday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.thursday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
                if (day ==5) {
                    MonthInformation.MonthDetails.fourthweek.friday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.friday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.friday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.friday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.friday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.friday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.friday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.friday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.friday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }

                    
                }
                if (day == 6) {
                    MonthInformation.MonthDetails.fourthweek.saturday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.saturday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.saturday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.saturday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.saturday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.saturday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.saturday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.saturday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.saturday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                    
                }
                if (day == 7) {

                    MonthInformation.MonthDetails.fourthweek.sunday.Total += filteredReadings[0].CT1_Watts;
                    const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                     const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
                    if (isNight == true) {
                        MonthInformation.MonthDetails.fourthweek.sunday.Night.count += 1;
                        MonthInformation.MonthDetails.fourthweek.sunday.Night.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.sunday.Night.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.sunday.Night.amps += filteredReadings[0].CT1_Amps;
                        break;
                        
                    }else{
                        MonthInformation.MonthDetails.fourthweek.sunday.Day.count += 1;
                        MonthInformation.MonthDetails.fourthweek.sunday.Day.kilowatts += kwh;
                        MonthInformation.MonthDetails.fourthweek.sunday.Day.watts += filteredReadings[0].CT1_Watts;
                        MonthInformation.MonthDetails.fourthweek.sunday.Day.amps += filteredReadings[0].CT1_Amps;
                        break;
                    }
                    
                }
               
            }
            break;
        }
        MonthInformation.allMonthAmps += filteredReadings[0].CT1_Amps;
        MonthInformation.allMonthWatts += filteredReadings[0].CT1_Watts;
         const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
         const kwh = (filteredReadings[0].CT1_Watts * seconds * (1/(60*60)) )/1000;
        MonthInformation.MonthName = LocalDate.toString();
        MonthInformation.allMonthKiloWatts += kwh;
        counter ++ ;
    }
    totalAmpsProm = MonthInformation.allMonthAmps/ fixedParams.length;
    totalWAttsProm = MonthInformation.allMonthWatts/ fixedParams.length;
    const ob = [
       { detail: MonthInformation, count:counter}
    ];
    return ob;
}