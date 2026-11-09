// numeral.js locale configuration
// locale : traditional chinese (zh-tw)
// author : sufuf3 : https://github.com/sufuf3
// author : Peter Dave Hello : https://github.com/PeterDaveHello

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'zh-tw', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百萬',
            billion: '十億',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'NT$'
        }
    });
}));
