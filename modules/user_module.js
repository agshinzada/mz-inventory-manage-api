const { get, post } = require("../connection");
require("dotenv").config();

function login(data) {
  return get(
    `SELECT NAME, ID, SURNAME, USERNAME, ROLE FROM ${process.env.TABLE_USERS} WHERE USERNAME='${data.u}' AND PASSWORD_HASH='${data.p}'`
  );
}

function postLoginActivity(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_USER_ACTIVITY} (USER_ID, LOGIN_TIME)
    OUTPUT Inserted.ID
    VALUES(${data.id},GETDATE())`
  );
}

function postLogoutActivity(data) {
  return post(
    `UPDATE ${process.env.TABLE_USER_ACTIVITY} SET LOGOUT_TIME=GETDATE() WHERE ID=${data.id}`
  );
}

function changePassword(data) {
  return post(
    `UPDATE ${process.env.TABLE_USERS} SET PASSWORD_HASH='${data.p}' WHERE USERNAME='${data.u}'`
  );
}

module.exports = {
  login,
  postLoginActivity,
  postLogoutActivity,
  changePassword,
};
