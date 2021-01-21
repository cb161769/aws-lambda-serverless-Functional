/**
 * this function gets the yesterday's Date
 */

module.exports.getYesterdayDate = () =>{
    const yesterday = new Date();
    yesterday.setHours(0);
    yesterday.setMinutes(0);
    yesterday.setSeconds(0);
    yesterday.setDate(yesterday.getDate() -1);
    const string = yesterday
          .toISOString()
          .substring(0,10)
          .replace(/-/g,'');
    return{
        date: yesterday,
        timeStamp: parseInt(yesterday.getTime()/ 1000),
        string: string,
        year: string.substring(0,4),
        month: string.substring(4,6),
        day: string.substring(6,8)

    }

};
/**
 * this function gets the today's Date
 */
module.exports.getTodaysDate = () =>{
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setDate(today.getDate() -1);
        const string = today
          .toISOString()
          .substring(0,10)
          .replace(/-/g,'');
    return{
        date: today,
        timeStamp: parseInt(today.getTime()/ 1000),
        string: string,
        year: string.substring(0,4),
        month: string.substring(4,6),
        day: string.substring(6,8)

    }

};
/**
 * this function gets the dates between to dates
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns {date}
 */
module.exports.getDatesBetween = function(startDate, endDate){
	const dateArray = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }

    return dateArray;
}