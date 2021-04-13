

module.exports.getWeeklyHelper = async function  (dynamoDBArray) {
    const moment = require('moment');
    let counter = 0;
    var totalWatts = 0;
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
    for (let index = 0; index < dynamoDBArray.length; index++) {
        var dataElement = dynamoDBArray[index];
        var sortKeyDate = dataElement.sortkey;
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortKeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = dynamoDBArray[index].readings;
        var week = module.exports.isInCurrentWEEK(sortKeyEpoch);
        if (week === false) {
            break;
        }
        var weekDay = LocalDate.isoWeekday();
        for (let j = 0; j <= Object.keys(readings2).length; j++) {
            if (weekDay == 1) {
                monday +=1;
                mondayAmps += readings2.device_amps;
                mondayWatts += readings2.device_watts;
                break;
                // totalWatts += Object.keys(readings2).length;
                    
            }
            if (weekDay == 2) {
                tuesday +=1;
                tuesdayWatts += readings2.device_watts;
                tuesdayAmps += readings2.device_amps;
                break;
                totalWatts += Object.keys(readings2).length;
                    
            }
            if (weekDay == 3) {
                wednesday +=1;
                wednesdayWatts += readings2.device_watts;
                wednesdayAmps += readings2.device_amps;
                break;
                totalWatts += Object.keys(readings2).length;
                    
            }
            if (weekDay == 4) {
                thursday +=1;
                thursdayWatts += readings2.device_watts;
                thursdayAmps = readings2.device_amps;
                break;
                // totalWatts += Object.keys(readings2).length;
                    
            }
            if (weekDay == 5) {
                friday +=1;
                fridayWatts += readings2.device_watts;
                fridayAmps += readings2.device_amps;
                break;
                totalWatts += Object.keys(readings2).length;
                    
            }
            if (weekDay == 6) {
                saturday +=1;
                saturdayWatts += readings2.device_watts;
                saturdayAmps += readings2.device_amps;
                break;
                totalWatts += Object.keys(readings2).length;
                    
            }

            if (weekDay == 7) {
                sunday +=1;
                sundayWatts += readings2.device_watts;
                sundayAmps += readings2.device_amps;
                break;
                totalWatts += Object.keys(readings2).length;
                    
            }
            


            
            
            
        }
        counter ++;
        totalWatts += readings2.device_watts;
        totalAmps += readings2.device_amps;
        
        
    }
    totalAmpsProm = totalAmps/ dynamoDBArray.length
    totalWAttsProm = totalWatts/ dynamoDBArray.length;
    const ob =  [ 
        {registros:counter,lunes:{registros:monday || 0, amperios: mondayAmps || 0,watts:mondayWatts || 0}
        ,martes:{registros:tuesday || 0, amperios: tuesdayAmps || 0,watts:tuesdayWatts || 0}
        ,miercoles:{registros:wednesday || 0, amperios: wednesdayAmps || 0,watts:wednesdayWatts || 0}
        ,jueves:{registros:thursday || 0, amperios: thursdayAmps || 0,watts:thursdayWatts || 0}
        ,viernes:{registros:friday || 0 , amperios: fridayAmps || 0,watts:fridayWatts || 0}
        ,sabado:{registros:saturday || 0 , amperios: saturdayAmps || 0 ,watts:saturdayWatts | 0 }
        ,domingo:{registros:sunday || 0, amperios: sundayAmps || 0,watts:sundayWatts ||0  },
        totalWatts:totalWatts || 0, totalAmps:totalAmps || 0 , diaConsulta: new Date().toISOString(),
        promedioWattsSemanal: totalWAttsProm ||0, promedioAmpsSemanal: totalAmpsProm || 0
    }];
    return ob;
}
/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
module.exports.convertEpochDateToHumanDate = function (epochDate)   {
    var epoch = new Date(epochDate * 1000);
    return epoch;
}

/**
 * function Taken from Stack Overflow
 * Font: https://stackoverflow.com/questions/36787908/how-to-check-if-date-is-in-this-week-in-javascript 
 * @param {*} weekDay 
 */
module.exports.isInCurrentWEEK =  function (date){
const moment = require('moment');
 
  var now = moment();
  var input = moment(date);
  var isThisWeek = (now.isoWeek() == input.isoWeek());
  return isThisWeek;
}

