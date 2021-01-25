
/**
 * this function determines wether or not the given date
 * was between 21:00 and 06:00 and every weekend day
 * @param {*} date date
 */
module.exports.dateFare = function (date) {
    if (typeof date === 'number') {
       date = new Date(date * 1000); 
    }
    if ((date.getHours() >= 21 && date.getHours() <= 23)
        || (date.getHours() >= 0 && date.getHours() <= 5 )
        )
         {
         return true;   
         }
    if (date.getDay() === 0 || date.getDay() === 6) {
        return true;
        
    }
    return false;
    
}