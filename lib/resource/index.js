var create = require('./create'),
destroy = require('./delete'),
handler = require('./handler'),
update = require('./update');

module.exports = {
  create: create,
  delete: destroy,
  handler: handler,
  update: update
};
