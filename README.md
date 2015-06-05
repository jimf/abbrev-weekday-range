# abbrev-weekday-range

Utility method for abbreviating an array of numeric days of the week.

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install abbrev-weekday-range

## Usage

Note: This function assumes the array of weekdays given contain the values
0 through 6 (0 = Sunday), are in ascending order, and contain no duplicates.

```
var abbrevDays = require('abbrev-weekday-range');

abbrevDays([1, 2, 3, 4, 5]); // 'Mon-Fri'
abbrevDays([0, 6]);         // 'Sun, Sat'
abbrevDays([1, 2, 3, 5]);   // 'Mon-Wed, Fri'

abbrevDays([1, 2, 3, 4, 5], { format: 'narrow' }); // 'M-F'
abbrevDays([1, 2, 3, 4, 5], { format: 'long' });   // 'Monday-Friday'
```

## Options

### `format` (default: *short*)

Format to use when generating range. Supported formats:

 - "narrow" ("S", "M", "T", "W", "T", "F", "S")
 - "shorter" ("Su", "M", "Tu", "W", "Th", "F", "Sa")
 - "short" ("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
 - "long" ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")

For further customization, `format` can also be specified as an array of
abbreviations, or as a function that recieves a numeric weekday and returns
a string.

## License

MIT

[build-badge]: https://img.shields.io/travis/jimf/abbrev-weekday-range/master.svg
[build-status]: https://travis-ci.org/jimf/abbrev-weekday-range
[npm-badge]: https://img.shields.io/npm/v/abbrev-weekday-range.svg
[npm]: https://www.npmjs.org/package/abbrev-weekday-range
[coverage-badge]: https://img.shields.io/coveralls/jimf/abbrev-weekday-range.svg
[coverage-result]: https://coveralls.io/r/jimf/abbrev-weekday-range
[dep-badge]: https://img.shields.io/david/jimf/abbrev-weekday-range.svg
[dep-status]: https://david-dm.org/jimf/abbrev-weekday-range
