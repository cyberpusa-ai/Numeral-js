// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var locales = require('../../locales');
    var expect = require('chai').expect;
}

describe('Locale: fa-ir', function() {

    before(function() {
        numeral.locale('fa-ir');
    });

    after(function() {
        numeral.reset();
    });

    describe('Number', function() {
        it('should format a number', function() {
            var tests = [
                [10000,'0,0.0000','10,000.0000'],
                [10000.23,'0,0','10,000'],
                [-10000,'0,0.0','-10,000.0'],
                [10000.1234,'0.000','10000.123'],
                [-10000,'(0,0.0000)','(10,000.0000)'],
                [-0.23,'.00','-.23'],
                [-0.23,'(.00)','(.23)'],
                [0.23,'0.00000','0.23000'],
                [1230974,'0.0a','1.2میلیون'],
                [1460,'0a','1هزار'],
                [-104000,'0a','-104هزار'],
                [2500000000,'0.0a','2.5میلیارد'],
                [3000000000000,'0a','3تریلیون'],
                [1,'0o','1ام'],
                [52,'0o','52ام'],
                [23,'0o','23ام'],
                [100,'0o','100ام'],
                [1,'0[.]0','1']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Currency', function() {
        it('should format a currency', function() {
            var tests = [
                [1000.234,'0,0.00 $','1,000.23 ﷼'],
                [1000.234,'$0,0.00','﷼1,000.23'],
                [-1000.234,'(0,0 $)','(1,000 ﷼)'],
                [-1000.234,'0.00 $','-1000.23 ﷼'],
                [1230974,'(0.00a $)','1.23میلیون ﷼']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Percentages', function() {
        it('should format a percentages', function() {
            var tests = [
                [1,'0%','100%'],
                [0.974878234,'0.000%','97.488%'],
                [-0.43,'0%','-43%'],
                [0.43,'(0.000%)','43.000%']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Unformat', function() {
        it('should unformat', function() {
            var tests = [
                ['10,000.123',10000.123],
                ['(0.12345)',-0.12345],
                ['(1.23میلیون﷼)',-1230000],
                ['1.23میلیون﷼',1230000],
                ['1.23 ﷼',1.23],
                ['10هزار',10000],
                ['-10هزار',-10000],
                ['1.5میلیارد',1500000000],
                ['2تریلیون',2000000000000],
                ['23.',23],
                ['10,000﷼',10000],
                ['﷼10,000.00',10000],
                ['-76%',-0.76],
                ['2:23:57',8637]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Round trip', function() {
        it('should unformat what it formats', function() {
            var tests = [
                [1234567.89,'0,0.00'],
                [-1234567.89,'0,0.00 $'],
                [1230000,'0.00a'],
                [-0.43,'0%']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(numeral(tests[i][0]).format(tests[i][1])).value()).to.equal(tests[i][0]);
            }
        });
    });
});
