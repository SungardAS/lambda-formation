var winston = require("winston");

module.exports = new (winston.Logger)({
    level: process.env.CFN_LOG_LEVEL || 'info',
    transports: [
        new (winston.transports.Console)({
            json: true,
            stringify: true,
            timestamp: true
        })
    ]
});
