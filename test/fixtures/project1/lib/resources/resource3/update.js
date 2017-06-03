var update = require('../../../../../../lib/resource/update')
  util = require('../../../../../../lib/util');

// Bad function, no callback
module.exports.handler = function(event, context) {
  update.apply(this, [event, context]);
};
