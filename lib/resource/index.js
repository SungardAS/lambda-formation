var create = require("./create");
var destroy = require("./delete");
var handler = require("./handler");
var update = require("./update");

module.exports = {
  create: create,
  delete: destroy,
  handler: handler,
  update: update
};
