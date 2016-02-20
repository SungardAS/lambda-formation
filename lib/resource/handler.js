var util = require('../util'),
  callerId = require('caller-id'),
  path = require('path'),
  _ = require('lodash');

module.exports = function(event, context) {

  try {
    var requestType = util.getRequestType(event,context);
  }
  catch(e) {
    return util.done(e.message, event, context);
  }

  if (!_.includes(['create','update','delete'],requestType))
    return util.done("Invalid requestType: " + requestType,event,context);

  var caller = callerId.getData();
  var requirePath = path.join(caller.filePath,'..',requestType);
  require(requirePath).handler(event,context);
}
