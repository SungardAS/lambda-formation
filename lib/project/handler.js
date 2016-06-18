var _ = require("lodash");
var _s = require("underscore.string");
var callerId = require("caller-id");
var fs = require("fs");
var path = require("path");
var util = require("../util");


module.exports = function(event,context) {
  var ev;

  try {
    ev = util.normalizeEvent(event,context);
  }
  catch(e) {
    util.done(e,event,context);
  }

  var resourceType = ev ? (ev.resourceType || ev.ResourceType) : undefined;

  if (!resourceType)
    return util.done("resourceType|ResourceType must be defined in the event object", ev, context);

  if (_s.startsWith(resourceType, 'Custom', ev,context))
    resourceType = _s.strRight(resourceType, 'Custom::');

  var caller = callerId.getData();
  var resourcePath = path.join(caller.filePath,'..','lib','resources');

  if (!_.includes(getDirectories(resourcePath), resourceType))
    return util.done("Invalid resourceType:" + resourceType, ev, context);

  require(path.join(resourcePath,resourceType)).handler(ev,context);
};

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
