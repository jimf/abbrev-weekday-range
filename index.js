'use strict';

var abbrevRange = require('abbrev-range'),
    formats = {
        narrow: 'SMTWTFS'.split(''),
        shorter: 'Su M Tu W Th F Sa'.split(' '),
        short: 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
        long: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ')
    };

function genReplacer(format) {
    if (typeof format === 'function') { return format; }

    var days;

    if (typeof format === 'string' && format in formats) {
        days = formats[format];
    } else if (Array.isArray(format) && format.length === 7) {
        days = format;
    } else {
        throw new Error('Invalid format specified');
    }

    return function($1) {
        return days[+$1];
    };
}

/**
 * Return abbreviated range of weekdays.
 *
 * E.g., abbrevWeekdayRange([1, 2, 3, 4, 5]) => 'Mon-Fri'
 *
 * @param {Array} weekdays Array of numeric days of the week
 * @param {Object} [options]
 * @param {string|Array|function} [options.format="short"] Output format
 * @return {string}
 */
module.exports = function(weekdays, options) {
    options = options || {};
    options.format = options.format || 'short';

    return abbrevRange(weekdays).replace(/(\d+)/g, genReplacer(options.format));
};
