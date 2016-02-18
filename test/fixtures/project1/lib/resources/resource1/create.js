var create = require('../../../../../../lib/resource/create')
  util = require('../../../../../../lib/util');

module.exports.handler = function(event,context) {
  create.apply(this,[event,context,myCreate]);
};

var myCreate = function(err,event,context) {
  if (err)
    return util.done(err);

  util.done(null,event,context,{id: 1, name: "First Resource"},1);
};
