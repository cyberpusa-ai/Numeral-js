// numeral.js locale configuration
// locale : swedish sweden (sv-se)
// author : Michael Lopez : https://github.com/michaellopez
// author : Alex Schenkman : https://github.com/alesch

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'sv-se', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 't',
            million: 'mn',
            billion: 'md',
            trillion: 'bn'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? ':e' :
                (b === 1 || b === 2) ? ':a' : ':e';
        },
        currency: {
            symbol: 'kr'
        }
    });
}));
