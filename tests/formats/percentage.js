
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Percentage', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to percentages with 100 upscale default', function() {
        var tests = [
                [0,'0%','0%'],
                [null,'0 %','0 %'],
                [1,'0%','100%'],
                [0.974878234,'0.000%','97.488%'],
                [-0.43,'0 %','-43 %'],
                [0.43,'(0.00[0]%)','43.00%'],
                [0.0000000092,'0%','0%']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to percentages with 100 downscale default', function() {
        var tests = [
                ['0%', 0],
                ['100%', 1],
                ['97.488%', 0.97488],
                ['-43 %', -0.43],
                ['43.00%', 0.43]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });

    it('should format to percentages with 100 upscale enforced', function() {
        var tests = [
                [0,'0%','0%'],
                [null,'0 %','0 %'],
                [1,'0%','100%'],
                [0.974878234,'0.000%','97.488%'],
                [-0.43,'0 %','-43 %'],
                [0.43,'(0.00[0]%)','43.00%'],
                [0.0000000092,'0%','0%']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            numeral.options.scalePercentBy100 = true;
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to percentages with 100 downscale enforced', function() {
        var tests = [
                ['0%', 0],
                ['100%', 1],
                ['97.488%', 0.97488],
                ['-43 %', -0.43],
                ['43.00%', 0.43]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            numeral.options.scalePercentBy100 = true;
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });

    it('should format to percentages without 100 upscale', function() {
        var tests = [
                [0,'0%','0%'],
                [null,'0 %','0 %'],
                [1,'0%','1%'],
                [97.4878234,'0.000%','97.488%'],
                [-43.0,'0 %','-43 %'],
                [43.0,'(0.00[0]%)','43.00%'],
                [0.00000074,'0%','0%']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            numeral.options.scalePercentBy100 = false;
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to percentages without 100 downscale', function() {
        var tests = [
                ['0%', 0],
                ['100%', 100.0],
                ['97.488%', 97.488],
                ['-43 %', -43.0],
                ['43.00%', 43.0]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            numeral.options.scalePercentBy100 = false;
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });

    it('should set scalePercentBy100 with the setter', function() {
        var tests = [
                [false, 0.5, '0.00%', '0.50%', '50%', 50],
                [true, 0.5, '0.00%', '50.00%', '50%', 0.5],
                [null, 0.5, '0.00%', '50.00%', '50%', 0.5],
                [undefined, 0.5, '0.00%', '50.00%', '50%', 0.5],
                ['false', 0.5, '0.00%', '50.00%', '50%', 0.5],
                [0, 0.5, '0.00%', '50.00%', '50%', 0.5]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            numeral.scalePercentBy100(tests[i][0]);
            expect(numeral.options.scalePercentBy100).to.equal(tests[i][0] === false ? false : true);
            expect(numeral(tests[i][1]).format(tests[i][2])).to.equal(tests[i][3]);
            expect(numeral(tests[i][4]).value()).to.equal(tests[i][5]);
        }
    });

    it('should restore scalePercentBy100 on reset', function() {
        numeral.scalePercentBy100(false);
        numeral.reset();

        expect(numeral.options.scalePercentBy100).to.equal(true);
        expect(numeral(0.5).format('0%')).to.equal('50%');
    });
});
