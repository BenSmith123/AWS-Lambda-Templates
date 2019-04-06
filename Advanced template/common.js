/**
 * This file contains all the common functions used by the index, this does NOT contain async functions to avoid the complexity of async lambda!
 */


// check if an object is null, undefined or an instance of an error
function validResponse(obj) {

    if (!obj) { return false }
    if (obj === null) { return false }
    if (obj instanceof Error) { return false }

    return true;
}


// set timezone to NZ and return a date object
function getDate() {
    process.env.TZ = 'Pacific/Auckland';

    const d = new Date();

    return d.getDate(); // TODO: format date - no. of days? if days < 1 then x hours, if hours < 1, x minutes
    // ^^ maybe store a proper date and then do the last_active upon returning the data, not storing it 
}


function getTimeStamp() {
    process.env.TZ = 'Pacific/Auckland';

    const d = new Date();

    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}   ${d.getHours()}:${d.getMinutes()}`;
}


// returns string '00:00:00' if no time was passed in, otherwise return string 'HH:MM:SS'
function convertSecondsToTime(secs) {

    if (!secs) { return "00:00:00" }

    const date = new Date(null);
    date.setSeconds(secs);

    return date.toISOString().substr(11, 8);
}


 // return true or false if the string is json or not
function isJsonString(str) {
    try {
        JSON.stringify(str);
    } catch (e) {
        return false;
    }
    return true;
}


function isPopulated(variable) {

    if (variable !== undefined && variable !== null && variable !== "") {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    getDate,
    validResponse,
    getTimeStamp,
    isJsonString,
    isPopulated,
    convertSecondsToTime
}