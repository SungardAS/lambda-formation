var done = require('./done'),
  _ = require('lodash');

var PhysicalResourceIdNotFound = function() {
  this.message = "physicalResourceId|physicalResourceId|id must be defined";
  this.name = "PhysicalResourceIdNotFound";
};

module.exports = function(event,context) {

  var id  = event.PhysicalResourceId || event.physicalResourceId || event.id;

  if (!id) {
    throw(new PhysicalResourceIdNotFound());
  }

  return id;
};
