var _ = require("lodash");
var callerId = require("caller-id");
var path = require("path");
var util = require("../util");
var logger = require("../logger");

/**
 * Entrypoint for a ResourceType
 * @param {Object} event - The event object
 * @param {string} event.RequestType - Create|Update|Delete for the resource
 * @param {Object} context - Context passed by Lambda
 * @returns {undefined}
 */
module.exports = function(event, context) {

  var ev;

  logger.debug('Lambda-formation resource entrypoint', { event: event, context: context });

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
