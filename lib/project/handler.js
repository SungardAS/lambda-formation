var _ = require('lodash'),
  callerId = require('caller-id'),
  _s = require('underscore.string'),
  fs = require('fs'),
  path = require('path'),
  util = require('../util');


module.exports = function(event,context) {

  var resourceType = event ? (event.resourceType || event.ResourceType) : undefined;

  if (!resourceType)
    return util.done("resourceType|ResourceType must be defined in the event object", event, context);

  if (_s.startsWith(resourceType, 'Custom', event,context))
    resourceType = _s.strRight(resourceType, 'Custom::');

  var caller = callerId.getData();
  var resourcePath = path.join(caller.filePath,'..','lib','resources');

  if (!_.includes(getDirectories(resourcePath), resourceType))
    return util.done("Invalid resourceType:" + resourceType, event, context);

  require(path.join(resourcePath,resourceType)).handler(event,context);
};

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
