
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Time', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to time', function() {
        var tests = [
                [0,'00:00:00','0:00:00'],
                [null,'00:00:00','0:00:00'],
                [25,'00:00:00','0:00:25'],
                [238,'00:00:00','0:03:58'],
                [63846,'00:00:00','17:44:06'],
                [25.6,'00:00:00','0:00:26'],
                [25.5,'00:00:00.0','0:00:25.5'],
                [25,'00:00:00.0','0:00:25.0'],
                [25.25,'00:00:00.00','0:00:25.25'],
                [3723.456,'0:00:00.000','1:02:03.456'],
                [3723.4567,'00:00:00.000','1:02:03.457'],
                [0.1,'00:00:00.000','0:00:00.100'],
                [null,'00:00:00.0','0:00:00.0'],
                [59.96,'00:00:00.0','0:01:00.0'],
                [3599.9996,'00:00:00.000','1:00:00.000']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to time', function() {
        var tests = [
                ['0:00:00', 0],
                ['0:00:25', 25],
                ['0:03:58', 238],
                ['17:44:06', 63846],
                ['0:00:25.5', 25.5],
                ['0:00:25.25', 25.25],
                ['1:02:03.456', 3723.456],
                ['0:00:00.100', 0.1]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});
