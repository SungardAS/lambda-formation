var util = require('../util'),
  callerId = require('caller-id'),
  path = require('path'),
  _ = require('lodash');

module.exports = function(event, context) {

  var ev;

  try {
    if (event._normalized !== true) {
      ev = util.normalizeEvent(event,context);
    }
    else {
      ev = event;
    }

    var requestType = util.getRequestType(ev,context);
  }
  catch(e) {
    return util.done(e.message, ev, context);
  }

  if (!_.includes(['create','update','delete'],requestType))
    return util.done("Invalid requestType: " + requestType,ev,context);

  var caller = callerId.getData();
  var requirePath = path.join(caller.filePath,'..',requestType);
  require(requirePath).handler(ev,context);
}
