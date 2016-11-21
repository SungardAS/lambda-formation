var request = require("request");
var response = require("cfn-responder");

module.exports = function(err, event, context, obj, physicalResourceId, options) {
  options = options || {};

  if (event && event.StackId) {
    var responseStatus = response.SUCCESS;
    if (err) {
      event.Reason = err;
      responseStatus = response.FAILED;
    }
    response.send(event, context, responseStatus, obj, physicalResourceId, options.cfn_responder);
  }
  else {
    context.done(err,obj,physicalResourceId);
  }
};
