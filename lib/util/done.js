var getErrorString = require("./getErrorString");
var request = require("request");
var response = require("cfn-responder");


module.exports = function(err, event, context, obj, physicalResourceId, options) {
  options = options || {};

  /*
   * Is this request from CloudFormation
   */
  if (event && event.StackId) {
    /*
     * If CloudFormation sent a physicalReourceId and none has been passed here, use what CloudFormation sent.
     * this will ensure that updates and deletes will continute to be correlated in CloudFormation
     */
    physicalResourceId = physicalResourceId || event.PhysicalResourceId;

    var responseStatus = response.SUCCESS;
    if (err) {
      event.Reason = getErrorString(err);
      responseStatus = response.FAILED;
    }
    response.send(event, context, responseStatus, obj, physicalResourceId, options.cfn_responder);
  }
  else {
    context.done(err,obj,physicalResourceId);
  }
};
