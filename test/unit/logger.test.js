var lf = require('../../');
var winston = require('winston');
var vows = require('vows'),
    assert = require('assert');

describe("logger", function () {
    before(function() {
        lf.logger.clear();
        lf.logger.add(winston.transports.Memory);
    });

    it("should exist in lambda-formation", function () {
        assert.isObject(lf.logger);
        assert.isFunction(lf.logger.log);
    });

    it("should log only info messages by default", function () {
        lf.logger.log('debug', 'foobar1');
        lf.logger.log('debug', 'foobar2');

        lf.logger.log('info', 'foobar1');
        lf.logger.log('info', 'foobar2');

        assert.include(lf.logger.transports['memory'].writeOutput, 'info: foobar1');
        assert.notInclude(lf.logger.transports['memory'].writeOutput, 'debug: foobar1');
    });
});
