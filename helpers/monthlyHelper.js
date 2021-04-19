/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
module.exports.convertEpochDateToHumanDate = function(epochDate){
    var epoch = new Date(epochDate);
    return epoch;
}
/**
 * This function determines if the given date is in the current year
 * @function isInCurrentYear
 * @param {*} date date Object
 * @returns boolean
 */
module.exports.isInCurrentYear = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isThisYear = (now.year() == input.year());
    return isThisYear;
}

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

/**
 * 
 * @param {} params parameter's object
 * @returns <Array<any>>
 * @function getMonthlyHelper
 * @author Claudio Raul Brito Mercedes
 */
module.exports.getMonthlyHelper =  async function(params){
    const moment = require('moment');
    let counter = 0;
    var totalWatts = 0;
    var januaryWatts = 0;
    var januaryWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
        }

    }
    var februaryWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    }
    //March
    var MarchWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    }// April
    var aprilWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    //May
    var MayWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    //June
    var JuneWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    // July
    var JulyWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    // August
    var AugustWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    //September
    var SeptemberWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    //October
    var OctoberWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    //November
    var NovemberWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };

    //December
    var DecemberWeekDays = {
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0
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
            totalKwhPerWeek:0

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
            totalKwhPerWeek:0

        }

    };
    //Variables
    var FebruaryWatts = 0;
    var MarchWatts = 0;
    var AprilWatts = 0
    var MayWatts  = 0;
    var JuneWatts = 0;
    var JulyWatts = 0;
    var AugustWatts = 0;
    var SeptemberWatts = 0;
    var OctoberWatts = 0;
    var  NovemberWatts = 0;
    var DecemberWatts = 0;
    var totalWAttsProm = 0;
    // Amps
    var totalAmps = 0;
    var januaryAmps = 0
    var FebruaryAmps = 0;
    var MarchAmps = 0;
    var AprilAmps = 0
    var MayAmps  = 0;
    var JuneAmps = 0;
    var JulyAmps = 0;
    var AugustAmps = 0;
    var SeptemberAmps = 0;
    var OctoberAmps = 0;
    var  NovemberAmps = 0;
    var DecemberAmps = 0;
    var totalAmpsProm = 0;

    for (let index = 0; index < params.length - 1; index++) {
        var dataElement = params[index];
        var secondDataElement = params[index + 1];
        var sortkeyDate = dataElement.sortkey;
        var seconkeyDate = secondDataElement.sortkey;
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch =  module.exports.convertEpochDateToHumanDate(seconkeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = params[index].readings;
        var month = LocalDate.month();
        
        var year = isInCurrentYear(sortKeyEpoch);
        if (year === false) {
            break;
            
        }
        if (readings2 == undefined) {
            break;
        }
        

        var day = LocalDate.isoWeekday();
        var weekMonth = (LocalDate.week() - (month* 4));
        var isNight = module.exports.isNightTarif(sortKeyEpoch);
        for (let j = 0; j < Object.keys(readings2).length; j++) {
            //january
            if (month ==0) { 

                januaryAmps += readings2.device_amps;
                januaryWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    januaryWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        januaryWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.monday.Night.count += 1;
                            januaryWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.monday.Day.count += 1;
                            januaryWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        januaryWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.tuesday.Night.count += 1;
                            januaryWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.tuesday.Day.count += 1;
                            januaryWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        januaryWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.wednesday.Night.count += 1;
                            januaryWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.wednesday.Day.count += 1;
                            januaryWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        januaryWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.thursday.Night.count += 1;
                            januaryWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.thursday.Day.count += 1;
                            januaryWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        januaryWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.friday.Night.count += 1;
                            januaryWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.friday.Day.count += 1;
                            januaryWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        januaryWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.saturday.Night.count += 1;
                            januaryWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.saturday.Day.count += 1;
                            januaryWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        januaryWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.sunday.Night.count += 1;
                            januaryWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.sunday.Day.count += 1;
                            januaryWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    januaryWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        januaryWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.monday.Night.count += 1;
                            januaryWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.monday.Day.count += 1;
                            januaryWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        januaryWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.tuesday.Night.count += 1;
                            januaryWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.tuesday.Day.count += 1;
                            januaryWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        januaryWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.wednesday.Night.count += 1;
                            januaryWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.wednesday.Day.count += 1;
                            januaryWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        januaryWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.thursday.Night.count += 1;
                            januaryWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.thursday.Day.count += 1;
                            januaryWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        januaryWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.friday.Night.count += 1;
                            januaryWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.friday.Day.count += 1;
                            januaryWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        januaryWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.saturday.Night.count += 1;
                            januaryWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.saturday.Day.count += 1;
                            januaryWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        januaryWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.secondWeek.sunday.Night.count += 1;
                            januaryWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            januaryWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.secondWeek.sunday.Day.count += 1;
                            januaryWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            januaryWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            januaryWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    januaryWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        januaryWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.monday.Night.count += 1;
                            januaryWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.monday.Day.count += 1;
                            januaryWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        januaryWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.tuesday.Night.count += 1;
                            januaryWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.tuesday.Day.count += 1;
                            januaryWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        januaryWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.wednesday.Night.count += 1;
                            januaryWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.wednesday.Day.count += 1;
                            januaryWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        januaryWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.thursday.Night.count += 1;
                            januaryWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.thursday.Day.count += 1;
                            januaryWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        januaryWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.friday.Night.count += 1;
                            januaryWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.friday.Day.count += 1;
                            januaryWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        januaryWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.saturday.Night.count += 1;
                            januaryWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.saturday.Day.count += 1;
                            januaryWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        januaryWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.thirdweek.sunday.Night.count += 1;
                            januaryWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            januaryWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.thirdweek.sunday.Day.count += 1;
                            januaryWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            januaryWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            januaryWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    januaryWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        januaryWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.monday.Night.count += 1;
                            januaryWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.monday.Day.count += 1;
                            januaryWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        januaryWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.tuesday.Night.count += 1;
                            januaryWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.tuesday.Day.count += 1;
                            januaryWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        januaryWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.wednesday.Night.count += 1;
                            januaryWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.wednesday.Day.count += 1;
                            januaryWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        januaryWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.thursday.Night.count += 1;
                            januaryWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.thursday.Day.count += 1;
                            januaryWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        januaryWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.friday.Night.count += 1;
                            januaryWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.friday.Day.count += 1;
                            januaryWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        januaryWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.saturday.Night.count += 1;
                            januaryWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.saturday.Day.count += 1;
                            januaryWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        januaryWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.fourthweek.sunday.Night.count += 1;
                            januaryWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            januaryWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.fourthweek.sunday.Day.count += 1;
                            januaryWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            januaryWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            januaryWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                     
                   
                }
                
                
            }
            if (month ==1) {

                FebruaryAmps += readings2.device_amps;
                FebruaryWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    februaryWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        februaryWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.firstWeek.monday.Night.count += 1;
                            februaryWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            februaryWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.monday.Day.count += 1;
                            februaryWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        februaryWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.firstWeek.tuesday.Night.count += 1;
                            februaryWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            februaryWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.tuesday.Day.count += 1;
                            februaryWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        februaryWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.firstWeek.wednesday.Night.count += 1;
                            februaryWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            februaryWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.wednesday.Day.count += 1;
                            februaryWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        februaryWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.firstWeek.thursday.Night.count += 1;
                            februaryWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            februaryWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.thursday.Day.count += 1;
                            februaryWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        februaryWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.firstWeek.friday.Night.count += 1;
                            februaryWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            februaryWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.friday.Day.count += 1;
                            februaryWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        februaryWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.firstWeek.saturday.Night.count += 1;
                            februaryWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            februaryWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.saturday.Day.count += 1;
                            februaryWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        januaryWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            januaryWeekDays.firstWeek.sunday.Night.count += 1;
                            januaryWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            januaryWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            januaryWeekDays.firstWeek.sunday.Day.count += 1;
                            januaryWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            januaryWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            januaryWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    februaryWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        februaryWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.monday.Night.count += 1;
                            februaryWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.monday.Day.count += 1;
                            februaryWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        februaryWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.tuesday.Night.count += 1;
                            februaryWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.tuesday.Day.count += 1;
                            februaryWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        februaryWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.wednesday.Night.count += 1;
                            februaryWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.wednesday.Day.count += 1;
                            februaryWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        februaryWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.thursday.Night.count += 1;
                            februaryWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.thursday.Day.count += 1;
                            februaryWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        februaryWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.friday.Night.count += 1;
                            februaryWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.friday.Day.count += 1;
                            februaryWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        februaryWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.saturday.Night.count += 1;
                            februaryWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.saturday.Day.count += 1;
                            februaryWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        februaryWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.secondWeek.sunday.Night.count += 1;
                            februaryWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            februaryWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.secondWeek.sunday.Day.count += 1;
                            februaryWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            februaryWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            februaryWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    februaryWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        februaryWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.monday.Night.count += 1;
                            februaryWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.monday.Day.count += 1;
                            februaryWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        februaryWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.tuesday.Night.count += 1;
                            februaryWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.tuesday.Day.count += 1;
                            februaryWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        februaryWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.wednesday.Night.count += 1;
                            februaryWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.wednesday.Day.count += 1;
                            februaryWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        februaryWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.thursday.Night.count += 1;
                            februaryWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.thursday.Day.count += 1;
                            februaryWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        februaryWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.friday.Night.count += 1;
                            februaryWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.friday.Day.count += 1;
                            februaryWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        februaryWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.saturday.Night.count += 1;
                            februaryWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.saturday.Day.count += 1;
                            februaryWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        februaryWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.sunday.Night.count += 1;
                            februaryWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.sunday.Day.count += 1;
                            februaryWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {


                    februaryWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        februaryWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.monday.Night.count += 1;
                            februaryWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.monday.Day.count += 1;
                            februaryWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        februaryWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.tuesday.Night.count += 1;
                            februaryWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.tuesday.Day.count += 1;
                            februaryWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        februaryWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.wednesday.Night.count += 1;
                            februaryWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.wednesday.Day.count += 1;
                            februaryWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        februaryWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.thursday.Night.count += 1;
                            februaryWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.thursday.Day.count += 1;
                            februaryWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        februaryWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.friday.Night.count += 1;
                            februaryWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.friday.Day.count += 1;
                            februaryWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        februaryWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.saturday.Night.count += 1;
                            februaryWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.saturday.Day.count += 1;
                            februaryWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        februaryWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.sunday.Night.count += 1;
                            februaryWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.sunday.Day.count += 1;
                            februaryWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                     
                   
                }
                
                
            }
            //feb
   
            //march
            if (month ==2) {

                MarchAmps += readings2.device_amps;
                MarchWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    MarchWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MarchWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.monday.Night.count += 1;
                            MarchWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.monday.Day.count += 1;
                            MarchWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MarchWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.tuesday.Night.count += 1;
                            MarchWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.tuesday.Day.count += 1;
                            MarchWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MarchWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.wednesday.Night.count += 1;
                            MarchWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.firstWeek.wednesday.Day.count += 1;
                            februaryWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MarchWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.thursday.Night.count += 1;
                            MarchWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.thursday.Day.count += 1;
                            MarchWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MarchWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.friday.Night.count += 1;
                            MarchWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.friday.Day.count += 1;
                            MarchWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MarchWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.saturday.Night.count += 1;
                            MarchWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.saturday.Day.count += 1;
                            MarchWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MarchWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.sunday.Night.count += 1;
                            MarchWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.sunday.Day.count += 1;
                            MarchWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    MarchWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MarchWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.monday.Night.count += 1;
                            MarchWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.monday.Day.count += 1;
                            MarchWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MarchWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.tuesday.Night.count += 1;
                            MarchWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.tuesday.Day.count += 1;
                            MarchWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MarchWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.wednesday.Night.count += 1;
                            MarchWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.wednesday.Day.count += 1;
                            MarchWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MarchWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.thursday.Night.count += 1;
                            MarchWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.thursday.Day.count += 1;
                            MarchWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MarchWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.friday.Night.count += 1;
                            MarchWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.friday.Day.count += 1;
                            MarchWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MarchWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.saturday.Night.count += 1;
                            MarchWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.saturday.Day.count += 1;
                            MarchWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MarchWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.secondWeek.sunday.Night.count += 1;
                            MarchWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            MarchWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.secondWeek.sunday.Day.count += 1;
                            MarchWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            MarchWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            MarchWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    februaryWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        februaryWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.monday.Night.count += 1;
                            februaryWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.monday.Day.count += 1;
                            februaryWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        februaryWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.tuesday.Night.count += 1;
                            februaryWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.tuesday.Day.count += 1;
                            februaryWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        februaryWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.wednesday.Night.count += 1;
                            februaryWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.wednesday.Day.count += 1;
                            februaryWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        februaryWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.thursday.Night.count += 1;
                            februaryWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.thursday.Day.count += 1;
                            februaryWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        februaryWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.friday.Night.count += 1;
                            februaryWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.friday.Day.count += 1;
                            februaryWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        februaryWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.saturday.Night.count += 1;
                            februaryWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.saturday.Day.count += 1;
                            februaryWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        februaryWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.thirdweek.sunday.Night.count += 1;
                            februaryWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            februaryWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.thirdweek.sunday.Day.count += 1;
                            februaryWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            februaryWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            februaryWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    februaryWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        februaryWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.monday.Night.count += 1;
                            februaryWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.monday.Day.count += 1;
                            februaryWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        februaryWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.tuesday.Night.count += 1;
                            februaryWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.tuesday.Day.count += 1;
                            februaryWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        februaryWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.wednesday.Night.count += 1;
                            februaryWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.wednesday.Day.count += 1;
                            februaryWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        februaryWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.thursday.Night.count += 1;
                            februaryWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.thursday.Day.count += 1;
                            februaryWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        februaryWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.friday.Night.count += 1;
                            februaryWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.friday.Day.count += 1;
                            februaryWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        februaryWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.saturday.Night.count += 1;
                            februaryWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.saturday.Day.count += 1;
                            februaryWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        februaryWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            februaryWeekDays.fourthweek.sunday.Night.count += 1;
                            februaryWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            februaryWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            februaryWeekDays.fourthweek.sunday.Day.count += 1;
                            februaryWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            februaryWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            februaryWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                     
                   
                }
                }
            }
            //april
            if (month ==3) {
                AprilAmps += readings2.device_amps;
                AprilWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    aprilWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MarchWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MarchWeekDays.firstWeek.monday.Night.count += 1;
                            MarchWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            MarchWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MarchWeekDays.firstWeek.monday.Day.count += 1;
                            MarchWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            MarchWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            MarchWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        aprilWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.firstWeek.tuesday.Night.count += 1;
                            aprilWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            aprilWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.firstWeek.tuesday.Day.count += 1;
                            aprilWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            aprilWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        aprilWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.firstWeek.wednesday.Night.count += 1;
                            aprilWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            aprilWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.firstWeek.wednesday.Day.count += 1;
                            aprilWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            aprilWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        aprilWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.firstWeek.thursday.Night.count += 1;
                            aprilWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            aprilWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.firstWeek.thursday.Day.count += 1;
                            aprilWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            aprilWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        aprilWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.firstWeek.friday.Night.count += 1;
                            aprilWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            aprilWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.firstWeek.friday.Day.count += 1;
                            aprilWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            aprilWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        aprilWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.firstWeek.saturday.Night.count += 1;
                            aprilWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            aprilWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.firstWeek.saturday.Day.count += 1;
                            aprilWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            aprilWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        aprilWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.firstWeek.sunday.Night.count += 1;
                            aprilWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            aprilWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.firstWeek.sunday.Day.count += 1;
                            aprilWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            aprilWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            aprilWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    aprilWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        aprilWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.monday.Night.count += 1;
                            aprilWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.monday.Day.count += 1;
                            aprilWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        aprilWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.tuesday.Night.count += 1;
                            aprilWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.tuesday.Day.count += 1;
                            aprilWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        aprilWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.wednesday.Night.count += 1;
                            aprilWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.wednesday.Day.count += 1;
                            aprilWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        aprilWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.thursday.Night.count += 1;
                            aprilWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.thursday.Day.count += 1;
                            aprilWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        aprilWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.friday.Night.count += 1;
                            aprilWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.friday.Day.count += 1;
                            aprilWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        aprilWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.saturday.Night.count += 1;
                            aprilWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.saturday.Day.count += 1;
                            aprilWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        aprilWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.secondWeek.sunday.Night.count += 1;
                            aprilWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            aprilWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.secondWeek.sunday.Day.count += 1;
                            aprilWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            aprilWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            aprilWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    aprilWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        aprilWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.monday.Night.count += 1;
                            aprilWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.monday.Day.count += 1;
                            aprilWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        aprilWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.tuesday.Night.count += 1;
                            aprilWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.tuesday.Day.count += 1;
                            aprilWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        aprilWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.wednesday.Night.count += 1;
                            aprilWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.wednesday.Day.count += 1;
                            aprilWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        aprilWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.thursday.Night.count += 1;
                            aprilWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.thursday.Day.count += 1;
                            aprilWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        aprilWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.friday.Night.count += 1;
                            aprilWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.friday.Day.count += 1;
                            aprilWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        aprilWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.saturday.Night.count += 1;
                            aprilWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.saturday.Day.count += 1;
                            aprilWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        aprilWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.thirdweek.sunday.Night.count += 1;
                            aprilWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            aprilWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.thirdweek.sunday.Day.count += 1;
                            aprilWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            aprilWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            aprilWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    aprilWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        aprilWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.monday.Night.count += 1;
                            aprilWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.monday.Day.count += 1;
                            aprilWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        aprilWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.tuesday.Night.count += 1;
                            aprilWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.tuesday.Day.count += 1;
                            aprilWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        aprilWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.wednesday.Night.count += 1;
                            aprilWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.wednesday.Day.count += 1;
                            aprilWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        aprilWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.thursday.Night.count += 1;
                            aprilWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.thursday.Day.count += 1;
                            aprilWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        aprilWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.friday.Night.count += 1;
                            aprilWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.friday.Day.count += 1;
                            aprilWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        aprilWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.saturday.Night.count += 1;
                            aprilWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.saturday.Day.count += 1;
                            aprilWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        aprilWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            aprilWeekDays.fourthweek.sunday.Night.count += 1;
                            aprilWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            aprilWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            aprilWeekDays.fourthweek.sunday.Day.count += 1;
                            aprilWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            aprilWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            aprilWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                     
                   
                }
                }
            }
            //may
            if (month ==4) {
                

                MayAmps += readings2.device_amps;
                MayWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    MayWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MayWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.monday.Night.count += 1;
                            MayWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.monday.Day.count += 1;
                            MayWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MayWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.tuesday.Night.count += 1;
                            MayWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.tuesday.Day.count += 1;
                            MayWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MayWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.wednesday.Night.count += 1;
                            MayWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.wednesday.Day.count += 1;
                            MayWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MayWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.thursday.Night.count += 1;
                            MayWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.thursday.Day.count += 1;
                            MayWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MayWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.friday.Night.count += 1;
                            MayWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.friday.Day.count += 1;
                            MayWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MayWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.saturday.Night.count += 1;
                            MayWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.saturday.Day.count += 1;
                            MayWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MayWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.firstWeek.sunday.Night.count += 1;
                            MayWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            MayWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.firstWeek.sunday.Day.count += 1;
                            MayWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            MayWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            MayWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    MayWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MayWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.monday.Night.count += 1;
                            MayWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.monday.Day.count += 1;
                            MayWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MayWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.tuesday.Night.count += 1;
                            MayWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.tuesday.Day.count += 1;
                            MayWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MayWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.wednesday.Night.count += 1;
                            MayWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.wednesday.Day.count += 1;
                            MayWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MayWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.thursday.Night.count += 1;
                            MayWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.thursday.Day.count += 1;
                            MayWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MayWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.friday.Night.count += 1;
                            MayWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.friday.Day.count += 1;
                            MayWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MayWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.saturday.Night.count += 1;
                            MayWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.saturday.Day.count += 1;
                            MayWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MayWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.secondWeek.sunday.Night.count += 1;
                            MayWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            MayWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.secondWeek.sunday.Day.count += 1;
                            MayWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            MayWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            MayWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    MayWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MayWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.monday.Night.count += 1;
                            MayWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.monday.Day.count += 1;
                            MayWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MayWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.tuesday.Night.count += 1;
                            MayWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.tuesday.Day.count += 1;
                            MayWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MayWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.wednesday.Night.count += 1;
                            MayWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.wednesday.Day.count += 1;
                            MayWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MayWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.thursday.Night.count += 1;
                            MayWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.thursday.Day.count += 1;
                            MayWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MayWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.friday.Night.count += 1;
                            MayWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.friday.Day.count += 1;
                            MayWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MayWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.saturday.Night.count += 1;
                            MayWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.saturday.Day.count += 1;
                            MayWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MayWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.thirdweek.sunday.Night.count += 1;
                            MayWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            MayWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.thirdweek.sunday.Day.count += 1;
                            MayWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            MayWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            MayWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    MayWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MayWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.monday.Night.count += 1;
                            MayWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.monday.Day.count += 1;
                            MayWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        MayWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.tuesday.Night.count += 1;
                            MayWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.tuesday.Day.count += 1;
                            MayWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        MayWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.wednesday.Night.count += 1;
                            MayWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.wednesday.Day.count += 1;
                            MayWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        MayWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.thursday.Night.count += 1;
                            MayWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.thursday.Day.count += 1;
                            MayWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        MayWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.friday.Night.count += 1;
                            MayWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.friday.Day.count += 1;
                            MayWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        MayWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.saturday.Night.count += 1;
                            MayWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.saturday.Day.count += 1;
                            MayWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        MayWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            MayWeekDays.fourthweek.sunday.Night.count += 1;
                            MayWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            MayWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            MayWeekDays.fourthweek.sunday.Day.count += 1;
                            MayWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            MayWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            MayWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                     
                   
                }
                }
            }
            //june
            if (month ==5) {
                JuneAmps += readings2.device_amps;
                JuneWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    JuneWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        JuneWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.monday.Night.count += 1;
                            JuneWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.monday.Day.count += 1;
                            JuneWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JuneWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.tuesday.Night.count += 1;
                            JuneWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.tuesday.Day.count += 1;
                            JuneWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JuneWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.wednesday.Night.count += 1;
                            JuneWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.wednesday.Day.count += 1;
                            JuneWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JuneWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.thursday.Night.count += 1;
                            JuneWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.thursday.Day.count += 1;
                            JuneWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JuneWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.friday.Night.count += 1;
                            JuneWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.friday.Day.count += 1;
                            JuneWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JuneWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.saturday.Night.count += 1;
                            JuneWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.saturday.Day.count += 1;
                            JuneWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JuneWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.firstWeek.sunday.Night.count += 1;
                            JuneWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            JuneWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.firstWeek.sunday.Day.count += 1;
                            JuneWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            JuneWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            JuneWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    JuneWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        JuneWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.monday.Night.count += 1;
                            JuneWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.monday.Day.count += 1;
                            JuneWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JuneWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.tuesday.Night.count += 1;
                            JuneWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.tuesday.Day.count += 1;
                            JuneWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JuneWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.wednesday.Night.count += 1;
                            JuneWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.wednesday.Day.count += 1;
                            JuneWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JuneWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.thursday.Night.count += 1;
                            JuneWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.thursday.Day.count += 1;
                            JuneWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JuneWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.friday.Night.count += 1;
                            JuneWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.friday.Day.count += 1;
                            JuneWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JuneWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.saturday.Night.count += 1;
                            JuneWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.saturday.Day.count += 1;
                            JuneWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JuneWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.secondWeek.sunday.Night.count += 1;
                            JuneWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            JuneWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.secondWeek.sunday.Day.count += 1;
                            JuneWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            JuneWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            JuneWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    JuneWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MayWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.monday.Night.count += 1;
                            JuneWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.monday.Day.count += 1;
                            JuneWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JuneWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.tuesday.Night.count += 1;
                            JuneWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.tuesday.Day.count += 1;
                            JuneWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JuneWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.wednesday.Night.count += 1;
                            JuneWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.wednesday.Day.count += 1;
                            JuneWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JuneWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.thursday.Night.count += 1;
                            JuneWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.thursday.Day.count += 1;
                            JuneWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JuneWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.friday.Night.count += 1;
                            JuneWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.friday.Day.count += 1;
                            JuneWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JuneWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.saturday.Night.count += 1;
                            JuneWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.saturday.Day.count += 1;
                            JuneWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JuneWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.sunday.Night.count += 1;
                            JuneWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.sunday.Day.count += 1;
                            JuneWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    JuneWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        JuneWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.monday.Night.count += 1;
                            JuneWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.monday.Day.count += 1;
                            JuneWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JuneWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.tuesday.Night.count += 1;
                            JuneWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.tuesday.Day.count += 1;
                            JuneWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JuneWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.wednesday.Night.count += 1;
                            JuneWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.wednesday.Day.count += 1;
                            JuneWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JuneWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.thursday.Night.count += 1;
                            JuneWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.thursday.Day.count += 1;
                            JuneWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JuneWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.friday.Night.count += 1;
                            JuneWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.friday.Day.count += 1;
                            JuneWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JuneWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.saturday.Night.count += 1;
                            JuneWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.saturday.Day.count += 1;
                            JuneWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JuneWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.fourthweek.sunday.Night.count += 1;
                            JuneWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            JuneWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.fourthweek.sunday.Day.count += 1;
                            JuneWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            JuneWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            JuneWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
            //july
            if (month ==6) {
                JulyAmps += readings2.device_amps;
                JulyWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    JulyWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        JulyWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.monday.Night.count += 1;
                            JulyWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.monday.Day.count += 1;
                            JulyWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JulyWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.tuesday.Night.count += 1;
                            JulyWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.tuesday.Day.count += 1;
                            JulyWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JulyWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.wednesday.Night.count += 1;
                            JulyWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.wednesday.Day.count += 1;
                            JulyWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JulyWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.thursday.Night.count += 1;
                            JulyWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.thursday.Day.count += 1;
                            JulyWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JulyWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.friday.Night.count += 1;
                            JulyWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.friday.Day.count += 1;
                            JulyWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JulyWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.saturday.Night.count += 1;
                            JulyWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.saturday.Day.count += 1;
                            JulyWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JulyWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.firstWeek.sunday.Night.count += 1;
                            JulyWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            JulyWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.firstWeek.sunday.Day.count += 1;
                            JulyWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            JulyWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            JulyWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    JulyWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        JulyWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.monday.Night.count += 1;
                            JulyWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.monday.Day.count += 1;
                            JulyWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JulyWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.tuesday.Night.count += 1;
                            JulyWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.tuesday.Day.count += 1;
                            JulyWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JulyWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.wednesday.Night.count += 1;
                            JulyWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.wednesday.Day.count += 1;
                            JulyWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JulyWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.thursday.Night.count += 1;
                            JulyWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.thursday.Day.count += 1;
                            JulyWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JulyWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.friday.Night.count += 1;
                            JulyWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.friday.Day.count += 1;
                            JulyWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JulyWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.saturday.Night.count += 1;
                            JulyWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.saturday.Day.count += 1;
                            JulyWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JulyWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.secondWeek.sunday.Night.count += 1;
                            JulyWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            JulyWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.secondWeek.sunday.Day.count += 1;
                            JulyWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            JulyWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            JulyWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    JulyWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        MayWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JuneWeekDays.thirdweek.monday.Night.count += 1;
                            JuneWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            JuneWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JuneWeekDays.thirdweek.monday.Day.count += 1;
                            JuneWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            JuneWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            JuneWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JulyWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.thirdweek.tuesday.Night.count += 1;
                            JulyWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            JulyWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.thirdweek.tuesday.Day.count += 1;
                            JulyWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            JulyWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JulyWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.thirdweek.wednesday.Night.count += 1;
                            JulyWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            JulyWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.thirdweek.wednesday.Day.count += 1;
                            JulyWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            JulyWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JulyWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.thirdweek.thursday.Night.count += 1;
                            JulyWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            JulyWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.thirdweek.thursday.Day.count += 1;
                            JulyWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            JulyWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JulyWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.thirdweek.friday.Night.count += 1;
                            JulyWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            JulyWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.thirdweek.friday.Day.count += 1;
                            JulyWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            JulyWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JulyWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.thirdweek.saturday.Night.count += 1;
                            JulyWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            JulyWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.thirdweek.saturday.Day.count += 1;
                            JulyWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            JulyWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JulyWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.thirdweek.sunday.Night.count += 1;
                            JulyWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            JulyWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.thirdweek.sunday.Day.count += 1;
                            JulyWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            JulyWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            JulyWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    JulyWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        JulyWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.monday.Night.count += 1;
                            JulyWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.monday.Day.count += 1;
                            JulyWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        JulyWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.tuesday.Night.count += 1;
                            JulyWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.tuesday.Day.count += 1;
                            JulyWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        JulyWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.wednesday.Night.count += 1;
                            JulyWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.wednesday.Day.count += 1;
                            JulyWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        JulyWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.thursday.Night.count += 1;
                            JulyWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.thursday.Day.count += 1;
                            JulyWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        JulyWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.friday.Night.count += 1;
                            JulyWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.friday.Day.count += 1;
                            JulyWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        JulyWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.saturday.Night.count += 1;
                            JulyWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.saturday.Day.count += 1;
                            JulyWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        JulyWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            JulyWeekDays.fourthweek.sunday.Night.count += 1;
                            JulyWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            JulyWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            JulyWeekDays.fourthweek.sunday.Day.count += 1;
                            JulyWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            JulyWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            JulyWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
            //august
            if (month ==7) {
                AugustAmps += readings2.device_amps;
                AugustWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    AugustWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        AugustWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.monday.Night.count += 1;
                            AugustWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.monday.Day.count += 1;
                            AugustWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        AugustWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.tuesday.Night.count += 1;
                            AugustWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.tuesday.Day.count += 1;
                            AugustWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        AugustWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.wednesday.Night.count += 1;
                            AugustWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.wednesday.Day.count += 1;
                            AugustWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        AugustWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.thursday.Night.count += 1;
                            AugustWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.thursday.Day.count += 1;
                            AugustWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        AugustWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.friday.Night.count += 1;
                            AugustWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.friday.Day.count += 1;
                            AugustWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        AugustWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.saturday.Night.count += 1;
                            AugustWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.saturday.Day.count += 1;
                            AugustWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        AugustWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.firstWeek.sunday.Night.count += 1;
                            AugustWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            AugustWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.firstWeek.sunday.Day.count += 1;
                            AugustWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    AugustWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        AugustWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.monday.Night.count += 1;
                            AugustWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.monday.Day.count += 1;
                            AugustWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        AugustWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.tuesday.Night.count += 1;
                            AugustWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.tuesday.Day.count += 1;
                            AugustWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        AugustWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.wednesday.Night.count += 1;
                            AugustWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.wednesday.Day.count += 1;
                            AugustWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        AugustWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.thursday.Night.count += 1;
                            AugustWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.thursday.Day.count += 1;
                            AugustWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        AugustWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.friday.Night.count += 1;
                            AugustWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.friday.Day.count += 1;
                            AugustWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        AugustWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.saturday.Night.count += 1;
                            AugustWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.saturday.Day.count += 1;
                            AugustWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        AugustWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.secondWeek.sunday.Night.count += 1;
                            AugustWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            AugustWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.secondWeek.sunday.Day.count += 1;
                            AugustWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            AugustWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            AugustWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    AugustWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        AugustWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.monday.Night.count += 1;
                            AugustWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.monday.Day.count += 1;
                            AugustWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        AugustWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.tuesday.Night.count += 1;
                            AugustWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.tuesday.Day.count += 1;
                            AugustWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        AugustWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.wednesday.Night.count += 1;
                            AugustWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.wednesday.Day.count += 1;
                            AugustWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        AugustWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.thursday.Night.count += 1;
                            AugustWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.thursday.Day.count += 1;
                            AugustWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        AugustWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.friday.Night.count += 1;
                            AugustWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.friday.Day.count += 1;
                            AugustWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        AugustWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.saturday.Night.count += 1;
                            AugustWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.saturday.Day.count += 1;
                            AugustWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        AugustWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.thirdweek.sunday.Night.count += 1;
                            AugustWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            AugustWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.thirdweek.sunday.Day.count += 1;
                            AugustWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            AugustWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            AugustWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    AugustWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        AugustWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.monday.Night.count += 1;
                            AugustWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.monday.Day.count += 1;
                            AugustWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        AugustWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.tuesday.Night.count += 1;
                            AugustWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.tuesday.Day.count += 1;
                            AugustWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        AugustWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.wednesday.Night.count += 1;
                            AugustWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.wednesday.Day.count += 1;
                            AugustWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        AugustWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.thursday.Night.count += 1;
                            AugustWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.thursday.Day.count += 1;
                            AugustWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        AugustWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.friday.Night.count += 1;
                            AugustWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.friday.Day.count += 1;
                            AugustWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        AugustWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.saturday.Night.count += 1;
                            AugustWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.saturday.Day.count += 1;
                            AugustWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        AugustWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            AugustWeekDays.fourthweek.sunday.Night.count += 1;
                            AugustWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            AugustWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            AugustWeekDays.fourthweek.sunday.Day.count += 1;
                            AugustWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            AugustWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            AugustWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
            //september
            if (month ==8) {
                SeptemberWatts += readings2.device_amps;
                SeptemberWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    SeptemberWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        SeptemberWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.monday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.monday.Day.count += 1;
                            SeptemberWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        SeptemberWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.tuesday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.tuesday.Day.count += 1;
                            AugustWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            AugustWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            AugustWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        SeptemberWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.wednesday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.wednesday.Day.count += 1;
                            SeptemberWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        SeptemberWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.thursday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.thursday.Day.count += 1;
                            SeptemberWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        SeptemberWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.friday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.friday.Day.count += 1;
                            SeptemberWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        SeptemberWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.saturday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.saturday.Day.count += 1;
                            SeptemberWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        SeptemberWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.firstWeek.sunday.Night.count += 1;
                            SeptemberWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.firstWeek.sunday.Day.count += 1;
                            SeptemberWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            SeptemberWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    SeptemberWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        SeptemberWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.monday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.monday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        SeptemberWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.tuesday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.tuesday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        SeptemberWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.wednesday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.wednesday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        SeptemberWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.thursday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.thursday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        SeptemberWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.friday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.friday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        SeptemberWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.saturday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.saturday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        SeptemberWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.secondWeek.sunday.Night.count += 1;
                            SeptemberWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.secondWeek.sunday.Day.count += 1;
                            SeptemberWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            SeptemberWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    SeptemberWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        SeptemberWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.monday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.monday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        SeptemberWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.tuesday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.tuesday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        SeptemberWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.wednesday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.wednesday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        SeptemberWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.thursday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.thursday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        SeptemberWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.friday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.friday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        SeptemberWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.saturday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.saturday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        SeptemberWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.thirdweek.sunday.Night.count += 1;
                            SeptemberWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.thirdweek.sunday.Day.count += 1;
                            SeptemberWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            SeptemberWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    SeptemberWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        SeptemberWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.monday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.monday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        SeptemberWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.tuesday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.tuesday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        SeptemberWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.wednesday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.wednesday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        SeptemberWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.thursday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.thursday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        SeptemberWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.friday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.friday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        SeptemberWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.saturday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.saturday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        SeptemberWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            SeptemberWeekDays.fourthweek.sunday.Night.count += 1;
                            SeptemberWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            SeptemberWeekDays.fourthweek.sunday.Day.count += 1;
                            SeptemberWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            SeptemberWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            SeptemberWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
             //october
             if (month ==9) {
                OctoberAmps += readings2.device_amps;
                OctoberWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    OctoberWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        OctoberWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.monday.Night.count += 1;
                            OctoberWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.monday.Day.count += 1;
                            OctoberWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        OctoberWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.tuesday.Night.count += 1;
                            OctoberWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.tuesday.Day.count += 1;
                            OctoberWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        OctoberWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.wednesday.Night.count += 1;
                            OctoberWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.wednesday.Day.count += 1;
                            OctoberWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        OctoberWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.thursday.Night.count += 1;
                            OctoberWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.thursday.Day.count += 1;
                            OctoberWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        OctoberWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.friday.Night.count += 1;
                            OctoberWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.friday.Day.count += 1;
                            OctoberWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        OctoberWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.saturday.Night.count += 1;
                            OctoberWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.saturday.Day.count += 1;
                            OctoberWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        OctoberWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.firstWeek.sunday.Night.count += 1;
                            OctoberWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.firstWeek.sunday.Day.count += 1;
                            OctoberWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            OctoberWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    OctoberWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        OctoberWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.monday.Night.count += 1;
                            OctoberWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.monday.Day.count += 1;
                            OctoberWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        OctoberWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.tuesday.Night.count += 1;
                            OctoberWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.tuesday.Day.count += 1;
                            OctoberWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        OctoberWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.wednesday.Night.count += 1;
                            OctoberWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.wednesday.Day.count += 1;
                            OctoberWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        OctoberWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.thursday.Night.count += 1;
                            OctoberWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.thursday.Day.count += 1;
                            OctoberWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        OctoberWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.friday.Night.count += 1;
                            OctoberWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.friday.Day.count += 1;
                            OctoberWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        OctoberWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.saturday.Night.count += 1;
                            OctoberWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.saturday.Day.count += 1;
                            OctoberWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        OctoberWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.secondWeek.sunday.Night.count += 1;
                            OctoberWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.secondWeek.sunday.Day.count += 1;
                            OctoberWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            OctoberWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    OctoberWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        OctoberWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.monday.Night.count += 1;
                            OctoberWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.monday.Day.count += 1;
                            OctoberWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        OctoberWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.tuesday.Night.count += 1;
                            OctoberWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.tuesday.Day.count += 1;
                            OctoberWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        OctoberWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.wednesday.Night.count += 1;
                            OctoberWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.wednesday.Day.count += 1;
                            OctoberWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        OctoberWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.thursday.Night.count += 1;
                            OctoberWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.thursday.Day.count += 1;
                            OctoberWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        OctoberWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.friday.Night.count += 1;
                            OctoberWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.friday.Day.count += 1;
                            OctoberWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        OctoberWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.saturday.Night.count += 1;
                            OctoberWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.saturday.Day.count += 1;
                            OctoberWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        OctoberWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.thirdweek.sunday.Night.count += 1;
                            OctoberWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.thirdweek.sunday.Day.count += 1;
                            OctoberWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            OctoberWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    OctoberWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        OctoberWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.monday.Night.count += 1;
                            OctoberWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.monday.Day.count += 1;
                            OctoberWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        OctoberWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.tuesday.Night.count += 1;
                            OctoberWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.tuesday.Day.count += 1;
                            OctoberWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        OctoberWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.wednesday.Night.count += 1;
                            OctoberWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.wednesday.Day.count += 1;
                            OctoberWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        OctoberWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.thursday.Night.count += 1;
                            OctoberWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.thursday.Day.count += 1;
                            OctoberWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        OctoberWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.friday.Night.count += 1;
                            OctoberWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.friday.Day.count += 1;
                            OctoberWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        OctoberWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.saturday.Night.count += 1;
                            OctoberWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.saturday.Day.count += 1;
                            OctoberWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        OctoberWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            OctoberWeekDays.fourthweek.sunday.Night.count += 1;
                            OctoberWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            OctoberWeekDays.fourthweek.sunday.Day.count += 1;
                            OctoberWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            OctoberWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            OctoberWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
            //november
            if (month ==10) {
                NovemberAmps += readings2.device_amps;
                NovemberWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    NovemberWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        NovemberWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.monday.Night.count += 1;
                            NovemberWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.monday.Day.count += 1;
                            NovemberWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        NovemberWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.tuesday.Night.count += 1;
                            NovemberWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.tuesday.Day.count += 1;
                            NovemberWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        NovemberWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.wednesday.Night.count += 1;
                            NovemberWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.wednesday.Day.count += 1;
                            NovemberWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        NovemberWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.thursday.Night.count += 1;
                            NovemberWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.thursday.Day.count += 1;
                            NovemberWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        NovemberWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.friday.Night.count += 1;
                            NovemberWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.friday.Day.count += 1;
                            NovemberWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        NovemberWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.saturday.Night.count += 1;
                            NovemberWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.saturday.Day.count += 1;
                            NovemberWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        NovemberWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.firstWeek.sunday.Night.count += 1;
                            NovemberWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.firstWeek.sunday.Day.count += 1;
                            NovemberWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            NovemberWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    NovemberWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        NovemberWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.monday.Night.count += 1;
                            NovemberWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.monday.Day.count += 1;
                            NovemberWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        NovemberWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.tuesday.Night.count += 1;
                            NovemberWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.tuesday.Day.count += 1;
                            NovemberWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        NovemberWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.wednesday.Night.count += 1;
                            NovemberWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.wednesday.Day.count += 1;
                            NovemberWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        NovemberWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.thursday.Night.count += 1;
                            NovemberWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.thursday.Day.count += 1;
                            NovemberWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        NovemberWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.friday.Night.count += 1;
                            NovemberWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.friday.Day.count += 1;
                            NovemberWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        NovemberWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.saturday.Night.count += 1;
                            NovemberWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.saturday.Day.count += 1;
                            NovemberWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        NovemberWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.secondWeek.sunday.Night.count += 1;
                            NovemberWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.secondWeek.sunday.Day.count += 1;
                            NovemberWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            NovemberWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    NovemberWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        NovemberWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.monday.Night.count += 1;
                            NovemberWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.monday.Day.count += 1;
                            NovemberWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        NovemberWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.tuesday.Night.count += 1;
                            NovemberWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.tuesday.Day.count += 1;
                            NovemberWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        NovemberWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.wednesday.Night.count += 1;
                            NovemberWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.wednesday.Day.count += 1;
                            NovemberWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        NovemberWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.thursday.Night.count += 1;
                            NovemberWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.thursday.Day.count += 1;
                            NovemberWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        NovemberWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.friday.Night.count += 1;
                            NovemberWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.friday.Day.count += 1;
                            NovemberWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        NovemberWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.saturday.Night.count += 1;
                            NovemberWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.saturday.Day.count += 1;
                            NovemberWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        NovemberWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.thirdweek.sunday.Night.count += 1;
                            NovemberWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.thirdweek.sunday.Day.count += 1;
                            NovemberWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            NovemberWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    NovemberWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        NovemberWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.monday.Night.count += 1;
                            NovemberWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.monday.Day.count += 1;
                            NovemberWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        NovemberWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.tuesday.Night.count += 1;
                            NovemberWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.tuesday.Day.count += 1;
                            NovemberWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        NovemberWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.wednesday.Night.count += 1;
                            NovemberWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.wednesday.Day.count += 1;
                            NovemberWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        NovemberWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.thursday.Night.count += 1;
                            NovemberWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.thursday.Day.count += 1;
                            NovemberWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        NovemberWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.friday.Night.count += 1;
                            NovemberWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.friday.Day.count += 1;
                            NovemberWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        NovemberWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.saturday.Night.count += 1;
                            NovemberWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.saturday.Day.count += 1;
                            NovemberWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        NovemberWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            NovemberWeekDays.fourthweek.sunday.Night.count += 1;
                            NovemberWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            NovemberWeekDays.fourthweek.sunday.Day.count += 1;
                            NovemberWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            NovemberWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            NovemberWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
             //december
             if (month ==11) {
                DecemberAmps += readings2.device_amps;
                DecemberWatts += readings2.device_watts;
                if (weekMonth ==1) {
                    DecemberWeekDays.firstWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        DecemberWeekDays.firstWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.monday.Night.count += 1;
                            DecemberWeekDays.firstWeek.monday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.monday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.monday.Day.count += 1;
                            DecemberWeekDays.firstWeek.monday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.monday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        DecemberWeekDays.firstWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.tuesday.Night.count += 1;
                            DecemberWeekDays.firstWeek.tuesday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.tuesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.tuesday.Day.count += 1;
                            DecemberWeekDays.firstWeek.tuesday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.tuesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        DecemberWeekDays.firstWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.wednesday.Night.count += 1;
                            DecemberWeekDays.firstWeek.wednesday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.wednesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.wednesday.Day.count += 1;
                            DecemberWeekDays.firstWeek.wednesday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.wednesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        DecemberWeekDays.firstWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.thursday.Night.count += 1;
                            DecemberWeekDays.firstWeek.thursday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.thursday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.thursday.Day.count += 1;
                            DecemberWeekDays.firstWeek.thursday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.thursday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        DecemberWeekDays.firstWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.friday.Night.count += 1;
                            DecemberWeekDays.firstWeek.friday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.friday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.friday.Day.count += 1;
                            DecemberWeekDays.firstWeek.friday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.friday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        DecemberWeekDays.firstWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.saturday.Night.count += 1;
                            DecemberWeekDays.firstWeek.saturday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.saturday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.saturday.Day.count += 1;
                            DecemberWeekDays.firstWeek.saturday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.saturday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        DecemberWeekDays.firstWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.firstWeek.sunday.Night.count += 1;
                            DecemberWeekDays.firstWeek.sunday.Night.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.sunday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.firstWeek.sunday.Day.count += 1;
                            DecemberWeekDays.firstWeek.sunday.Day.kilowatts += kwh;
                            DecemberWeekDays.firstWeek.sunday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.firstWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }
                if (weekMonth ==2) {
                    DecemberWeekDays.secondWeek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        DecemberWeekDays.secondWeek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.monday.Night.count += 1;
                            DecemberWeekDays.secondWeek.monday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.monday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.monday.Day.count += 1;
                            DecemberWeekDays.secondWeek.monday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.monday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        DecemberWeekDays.secondWeek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.tuesday.Night.count += 1;
                            DecemberWeekDays.secondWeek.tuesday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.tuesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.tuesday.Day.count += 1;
                            DecemberWeekDays.secondWeek.tuesday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.tuesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        DecemberWeekDays.secondWeek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.wednesday.Night.count += 1;
                            DecemberWeekDays.secondWeek.wednesday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.wednesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.wednesday.Day.count += 1;
                            DecemberWeekDays.secondWeek.wednesday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.wednesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        DecemberWeekDays.secondWeek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.thursday.Night.count += 1;
                            DecemberWeekDays.secondWeek.thursday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.thursday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.thursday.Day.count += 1;
                            DecemberWeekDays.secondWeek.thursday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.thursday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        DecemberWeekDays.secondWeek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.friday.Night.count += 1;
                            DecemberWeekDays.secondWeek.friday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.friday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.friday.Day.count += 1;
                            DecemberWeekDays.secondWeek.friday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.friday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        DecemberWeekDays.secondWeek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.saturday.Night.count += 1;
                            DecemberWeekDays.secondWeek.saturday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.saturday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.saturday.Day.count += 1;
                            DecemberWeekDays.secondWeek.saturday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.saturday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        DecemberWeekDays.secondWeek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.secondWeek.sunday.Night.count += 1;
                            DecemberWeekDays.secondWeek.sunday.Night.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.sunday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.secondWeek.sunday.Day.count += 1;
                            DecemberWeekDays.secondWeek.sunday.Day.kilowatts += kwh;
                            DecemberWeekDays.secondWeek.sunday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.secondWeek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==3) {
                    DecemberWeekDays.thirdweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        DecemberWeekDays.thirdweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.monday.Night.count += 1;
                            DecemberWeekDays.thirdweek.monday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.monday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.monday.Day.count += 1;
                            DecemberWeekDays.thirdweek.monday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.monday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        DecemberWeekDays.thirdweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.tuesday.Night.count += 1;
                            DecemberWeekDays.thirdweek.tuesday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.tuesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.tuesday.Day.count += 1;
                            DecemberWeekDays.thirdweek.tuesday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.tuesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        DecemberWeekDays.thirdweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.wednesday.Night.count += 1;
                            DecemberWeekDays.thirdweek.wednesday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.wednesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.wednesday.Day.count += 1;
                            DecemberWeekDays.thirdweek.wednesday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.wednesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        DecemberWeekDays.thirdweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.thursday.Night.count += 1;
                            DecemberWeekDays.thirdweek.thursday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.thursday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.thursday.Day.count += 1;
                            DecemberWeekDays.thirdweek.thursday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.thursday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        DecemberWeekDays.thirdweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.friday.Night.count += 1;
                            DecemberWeekDays.thirdweek.friday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.friday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.friday.Day.count += 1;
                            DecemberWeekDays.thirdweek.friday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.friday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        DecemberWeekDays.thirdweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.saturday.Night.count += 1;
                            DecemberWeekDays.thirdweek.saturday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.saturday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.saturday.Day.count += 1;
                            DecemberWeekDays.thirdweek.saturday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.saturday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        DecemberWeekDays.thirdweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.thirdweek.sunday.Night.count += 1;
                            DecemberWeekDays.thirdweek.sunday.Night.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.sunday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.thirdweek.sunday.Day.count += 1;
                            DecemberWeekDays.thirdweek.sunday.Day.kilowatts += kwh;
                            DecemberWeekDays.thirdweek.sunday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.thirdweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    
                }

                if (weekMonth ==4) {
                    DecemberWeekDays.fourthweek.totalKwhPerWeek += readings2.device_watts;
                    if (day ==1) {
                        DecemberWeekDays.fourthweek.monday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        // to do
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.monday.Night.count += 1;
                            DecemberWeekDays.fourthweek.monday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.monday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.monday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.monday.Day.count += 1;
                            DecemberWeekDays.fourthweek.monday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.monday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.monday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day == 2) {
                        DecemberWeekDays.fourthweek.tuesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.tuesday.Night.count += 1;
                            DecemberWeekDays.fourthweek.tuesday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.tuesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.tuesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.tuesday.Day.count += 1;
                            DecemberWeekDays.fourthweek.tuesday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.tuesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.tuesday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day ==3) {
                        DecemberWeekDays.fourthweek.wednesday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.wednesday.Night.count += 1;
                            DecemberWeekDays.fourthweek.wednesday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.wednesday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.wednesday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.wednesday.Day.count += 1;
                            DecemberWeekDays.fourthweek.wednesday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.wednesday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.wednesday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 4) {
                        DecemberWeekDays.fourthweek.thursday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.thursday.Night.count += 1;
                            DecemberWeekDays.fourthweek.thursday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.thursday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.thursday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.thursday.Day.count += 1;
                            DecemberWeekDays.fourthweek.thursday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.thursday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.thursday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                    }
                    if (day ==5) {
                        DecemberWeekDays.fourthweek.friday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.friday.Night.count += 1;
                            DecemberWeekDays.fourthweek.friday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.friday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.friday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.friday.Day.count += 1;
                            DecemberWeekDays.fourthweek.friday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.friday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.friday.Day.amps += readings2.device_amps;
                            break;
                        }
    
                        
                    }
                    if (day == 6) {
                        DecemberWeekDays.fourthweek.saturday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.saturday.Night.count += 1;
                            DecemberWeekDays.fourthweek.saturday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.saturday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.saturday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.saturday.Day.count += 1;
                            DecemberWeekDays.fourthweek.saturday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.saturday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.saturday.Day.amps += readings2.device_amps;
                            break;
                        }
                        
                        
                    }
                    if (day == 7) {
                        DecemberWeekDays.fourthweek.sunday.Total += readings2.device_watts;
                        const seconds = (secondSortKeyEpoch.getTime() - sortKeyEpoch.getTime()) / 1000;
                        const kwh = (readings2.device_watts * seconds * (1/(60*60)) )/1000;
                        if (isNight == true) {
                            DecemberWeekDays.fourthweek.sunday.Night.count += 1;
                            DecemberWeekDays.fourthweek.sunday.Night.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.sunday.Night.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.sunday.Night.amps += readings2.device_amps;
                            break;
                            
                        }else{
                            DecemberWeekDays.fourthweek.sunday.Day.count += 1;
                            DecemberWeekDays.fourthweek.sunday.Day.kilowatts += kwh;
                            DecemberWeekDays.fourthweek.sunday.Day.watts += readings2.device_watts;
                            DecemberWeekDays.fourthweek.sunday.Day.amps += readings2.device_amps;
                            break;
                        }
                   
                    }
                }
            }
       
        }
    }
}
        counter++;
        totalAmps += readings2.device_amps;
        totalWatts += readings2.device_watts;
        
        

        
    totalAmpsProm = totalAmps/ params.length;
        totalWAttsProm = totalWatts/ params.length;
        const ob = [
            {registros:counter,
                year:LocalDate.year(),
                totalAmpsProm:totalAmpsProm,
                totalWattsProm:totalWAttsProm,
            january:{
                amps:januaryAmps,
                watts:januaryWatts,
                januaryDetail: [
                    januaryWeekDays
                ]
            },
            February:{
                amps:FebruaryAmps,
                watts:FebruaryWatts,
                februaryDetails:[februaryWeekDays]
            },
            march:{
                amps:MarchAmps,
                watts:MarchWatts,
                marchDetails: [MarchWeekDays]
            },
            april:{
                amps:AprilAmps,
                watts:AprilWatts,
                aprilDetails:[aprilWeekDays]
            },
            may:{
                amps:MayAmps,
                watts:MayWatts,
                mayDetails:[MayWeekDays]
            },
            june:{
                amps:JuneAmps
            },
            july:{
                amps:JulyAmps,
                watts:JulyWatts,
                julyDetails:[JulyWeekDays]                
                
            },
            augustus:{
                amps:AugustAmps,
                watts:AugustWatts,
                augustDetails:[AugustWeekDays]

            },
            September:{
                amps:SeptemberAmps,
                watts:SeptemberAmps,
                SeptemberDetails:[SeptemberWeekDays]

            },
            october:{
                amps:OctoberAmps,
                watts:OctoberWatts,
                OctoberDetails:[OctoberWeekDays]

            },
            november:{
                amps:NovemberAmps,
                watts:NovemberWatts,
                NovemberDetails:[NovemberWeekDays]

            },
            december:{
                amps:DecemberAmps,
                watts:DecemberWatts,
                DecemberDetails:[DecemberWeekDays]
            }

            
        }
        
        ];

        return ob;
}
}

