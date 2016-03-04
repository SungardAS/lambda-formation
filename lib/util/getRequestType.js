var done = require('./done'),
  _ = require('lodash');

var RequestTypeNotFound = function() {
  this.message = "requestType not defined it must be set to create|update|delete";
  this.name = "RequestTypeNotFound";
};

module.exports = function(event,context) {

  var requestType = event.RequestType || event.requestType;

  if (!requestType) {
    throw(new RequestTypeNotFound());
  }

  requestType = requestType.toLowerCase();

  return requestType;
};
