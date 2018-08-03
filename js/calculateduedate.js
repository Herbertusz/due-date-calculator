/**
 * DueDate module
 */

/**
 * Convert string to Date object
 * @param {String} dateTimeString - the date-time in string format
 * @return {Date} date or current date if the string is invalid
 */
const parseDate = function(dateTimeString){
    const timestamp = Date.parse(dateTimeString);
    return Number.isNaN(timestamp) ? new Date() : new Date(timestamp);
};

/**
 * Convert Date object to string
 * @param {Date} date - the Date object
 * @param {String} format - customizable format (placeholders: Y, m, d, H, i, s)
 * @return {String} formatted string
 */
const formatDate = function(date, format){
    let formattedDate = format;
    const placeholders = new Map([
        ['Y', date.getFullYear().toString()],
        ['m', String(date.getMonth() + 1).padStart(2, '0')],
        ['d', String(date.getDate()).padStart(2, '0')],
        ['H', String(date.getHours()).padStart(2, '0')],
        ['i', String(date.getMinutes()).padStart(2, '0')],
        ['s', String(date.getSeconds()).padStart(2, '0')]
    ]);
    placeholders.forEach((value, placeholder) => {
        formattedDate = formattedDate.replace(RegExp(placeholder, 'g'), value);
    });
    return formattedDate;
};

/**
 * Determines if the Date is inside working time
 * @param {Date} date - Date object
 * @return {Boolean} true if the Date is working time
 */
const isWorkingTime = function(date){
    return [1, 2, 3, 4, 5].includes(date.getDay()) && date.getHours() >= 9 && date.getHours() < 17;
};

/**
 * Add working hours to a Date object
 * @param {Date} fromDate - start Date
 * @param {Number} workingHours - working hours to add
 * @return {Date} end Date
 */
const addWorkingHours = function(fromDate, workingHours){
    let date = new Date(fromDate.getTime());
    let elapsedHours = 0;

    while (elapsedHours < workingHours){
        date = new Date(date.setHours(date.getHours() + 1));
        if (isWorkingTime(date)){
            elapsedHours++;
        }
    }
    return date;
};

/**
 * Add working hours to a date-time string
 * @param {String} startDateStr - start date-time
 * @param {Number} workingHours - working hours to add
 * @param {String} [format] - customizable format (placeholders: Y, m, d, H, i, s)
 * @return {String} end date-time
 */
const calculateDueDate = function(startDateStr, workingHours, format = 'Y-m-d H:i:s'){
    const startDate = parseDate(startDateStr);
    const endDate = addWorkingHours(startDate, workingHours);
    const endDateStr = formatDate(new Date(endDate), format);
    return endDateStr;
};

/*
// for unit testing
module.exports = {
    parseDate,
    formatDate,
    addWorkingHours,
    calculateDueDate
};
*/

export default calculateDueDate;
