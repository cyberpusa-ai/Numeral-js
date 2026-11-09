// numeral.js locale configuration
// locale : indonesian (id)
// author : w- : https://github.com/w-
// author : Yudhi Satrio : http://lab.linkaran.com

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'id', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'rb',
            million: 'jt',
            billion: 'M',
            trillion: 'T'
        },
        ordinal: function (number) {
            // Indonesian ordinals are a prefix ("ke-2", "pertama"), which a suffix cannot express
            return '';
        },
        currency: {
            symbol: 'Rp'
        }
    });
}));
