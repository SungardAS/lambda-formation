var done = require('./done'),
  _ = require('lodash');

module.exports = function(event,context) {

  var requestType = event.RequestType || event.requestType;

  if (!requestType) {
    done("requestType not defined", event, context);
    throw("requestType not defined it must be set to create|update|delete");
  }

  requestType = requestType.toLowerCase();

  return requestType;
};
