// numeral.js format configuration
// format : time
// author : Adam Draper : https://github.com/adamwdraper
// fractional seconds based on adamwdraper/Numeral-js#614 by Bruno Porto : https://github.com/brunoporto

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('format', 'time', {
        regexps: {
            format: /(:)/,
            unformat: /(:)/
        },
        format: function(value, format, roundingFunction) {
            var precision = format.match(/:0*\.(0+)/),
                fraction = '',
                rounded,
                hours,
                minutes,
                seconds;

            // fractional seconds (e.g. '00:00:00.000'): round the total once, then split it
            if (precision) {
                rounded = numeral._.toFixed(value || 0, precision[1].length, roundingFunction).split('.');
                value = Number(rounded[0]);
                fraction = '.' + rounded[1];
            }

            hours = Math.floor(value / 60 / 60);
            minutes = Math.floor((value - (hours * 60 * 60)) / 60);
            seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + fraction;
        },
        unformat: function(string) {
            var timeArray = string.split(':'),
                seconds = 0;

            // turn hours and minutes into seconds and add them all up
            if (timeArray.length === 3) {
                // hours
                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
                // minutes
                seconds = seconds + (Number(timeArray[1]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
                // minutes
                seconds = seconds + (Number(timeArray[0]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
        }
    });
}));
