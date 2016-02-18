var create = require('../../../../../../lib/resource/create')
  util = require('../../../../../../lib/util');

// Bad function, no callback
module.exports.handler = function(event, context) {
  create.apply(this, [event, context]);
};
