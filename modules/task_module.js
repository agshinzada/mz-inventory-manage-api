const { get } = require("../connection");

function getTasks() {
  return get("SELECT * FROM task");
}

module.exports = {
  getTasks,
};
