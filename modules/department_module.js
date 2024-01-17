const { get, post } = require("../connection");
require("dotenv").config();

function getDepartments() {
  return get(`SELECT * FROM ${process.env.TABLE_DEPARTMENTS} WITH (NOLOCK)`);
}

function getRegions() {
  return get(`SELECT*FROM ${process.env.TABLE_REGIONS} WITH (NOLOCK)`);
}

function addDepartment(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_DEPARTMENTS} (NAME,CREATEDBY_ID) VALUES(N'${data.name}',${data.userId})`
  );
}

function updateDepartment(data) {
  return post(
    `UPDATE ${process.env.TABLE_DEPARTMENTS} SET NAME=N'${data.name}' WHERE ID=${data.id}`
  );
}

module.exports = {
  getDepartments,
  getRegions,
  addDepartment,
  updateDepartment,
};
