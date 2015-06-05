'use strict';

var test = require('tape'),
    abbrevWeekdayRange = require('..'),
    weekdays = [0, 1, 2, 3, 4, 5, 6],
    narrow = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    shorter = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
    short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ],
    custom = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

test('no options specified', function(assert) {
    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day]), short[index],
            'should default to "short" format');
    });

    assert.end();
});

test('no format option specified', function(assert) {
    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day], {}), short[index],
            'should default to "short" format');
    });

    assert.end();
});

test('narrow format', function(assert) {
    var format = 'narrow';

    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day], { format: format }), narrow[index]);
    });

    var cases = [
        { input: [], expected: '' },
        { input: [1], expected: 'M' },
        { input: [1, 2, 3], expected: 'M-W' },
        { input: [1, 2, 3, 5], expected: 'M-W, F' },
        { input: [1, 3, 5], expected: 'M, W, F' },
        { input: [0, 1, 2, 4, 5, 6], expected: 'S-T, T-S' },
        { input: [1, 2], expected: 'M, T' }
    ];

    cases.forEach(function(testcase) {
        assert.equal(abbrevWeekdayRange(testcase.input, { format: format }), testcase.expected);
    });

    assert.end();
});

test('shorter format', function(assert) {
    var format = 'shorter';

    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day], { format: format }), shorter[index]);
    });

    var cases = [
        { input: [], expected: '' },
        { input: [1], expected: 'M' },
        { input: [1, 2, 3], expected: 'M-W' },
        { input: [1, 2, 3, 5], expected: 'M-W, F' },
        { input: [1, 3, 5], expected: 'M, W, F' },
        { input: [0, 1, 2, 4, 5, 6], expected: 'Su-Tu, Th-Sa' },
        { input: [1, 2], expected: 'M, Tu' }
    ];

    cases.forEach(function(testcase) {
        assert.equal(abbrevWeekdayRange(testcase.input, { format: format }), testcase.expected);
    });

    assert.end();
});

test('short format', function(assert) {
    var format = 'short',
        cases = [
            { input: [], expected: '' },
            { input: [1], expected: 'Mon' },
            { input: [1, 2, 3], expected: 'Mon-Wed' },
            { input: [1, 2, 3, 5], expected: 'Mon-Wed, Fri' },
            { input: [1, 3, 5], expected: 'Mon, Wed, Fri' },
            { input: [0, 1, 2, 4, 5, 6], expected: 'Sun-Tue, Thu-Sat' },
            { input: [1, 2], expected: 'Mon, Tue' }
        ];

    cases.forEach(function(testcase) {
        assert.equal(abbrevWeekdayRange(testcase.input, { format: format }), testcase.expected);
    });

    assert.end();
});

test('long format', function(assert) {
    var format = 'long';

    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day], { format: format }), long[index]);
    });

    var cases = [
        { input: [], expected: '' },
        { input: [1], expected: 'Monday' },
        { input: [1, 2, 3], expected: 'Monday-Wednesday' },
        { input: [1, 2, 3, 5], expected: 'Monday-Wednesday, Friday' },
        { input: [1, 3, 5], expected: 'Monday, Wednesday, Friday' },
        { input: [0, 1, 2, 4, 5, 6], expected: 'Sunday-Tuesday, Thursday-Saturday' },
        { input: [1, 2], expected: 'Monday, Tuesday' }
    ];

    cases.forEach(function(testcase) {
        assert.equal(abbrevWeekdayRange(testcase.input, { format: format }), testcase.expected);
    });

    assert.end();
});

test('custom array of formats', function(assert) {
    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day], { format: custom }), custom[index]);
    });

    assert.end();
});

test('custom format function', function(assert) {
    var format = function(index) {
        return custom[index];
    };

    weekdays.forEach(function(day, index) {
        assert.equal(abbrevWeekdayRange([day], { format: format }), custom[index]);
    });

    assert.end();
});

test('invalid format', function(assert) {
    var invalid = [
        'invalid',
        []
    ];

    invalid.forEach(function(format) {
        assert.throws(function() {
            abbrevWeekdayRange([0], { format: format });
        }, 'should throw exception if specified format is invalid');
    });

    assert.end();
});
