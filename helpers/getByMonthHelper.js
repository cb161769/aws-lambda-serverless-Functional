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
