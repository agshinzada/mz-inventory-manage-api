const { get, post } = require("../connection");
require("dotenv").config();

function getItems() {
  return get(`SELECT * FROM ${process.env.VW_ITEMS} ORDER BY CODE`);
}

function getNewItems(id) {
  return get(
    `SELECT *FROM ${process.env.TABLE_INVOICES} WHERE DATE>(SELECT DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth) AND DOC_ID=3 AND DEPARTMENT_LOCATION_ID=${id}`
  );
}

function filterItems(data) {
  return get(
    `SELECT * FROM ${process.env.VW_ITEMS} WHERE TYPE_ID='${data.t}' AND DEPARTMENT_ID='${data.d}' ORDER BY CODE`
  );
}

function addItem(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_ITEMS} (CODE,NAME,TYPE_ID,DEPARTMENT_ID,DEPARTMENT_LOCATION_ID,CREATEDBY_ID) VALUES ('${data.code}',N'${data.name}',${data.typeId},${data.depId},${data.locationId},${data.userId})`
  );
}

function addItemType(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_ITEM_TYPES}(NAME,CREATEDBY_ID) VALUES(N'${data.name}',${data.userId})`
  );
}

function updateItemType(data) {
  return post(
    `UPDATE  ${process.env.TABLE_ITEM_TYPES} SET NAME=N'${data.name}' WHERE ID=${data.typeId}`
  );
}

function updateItem(data) {
  return post(
    `UPDATE ${process.env.TABLE_ITEMS} SET NAME=N'${data.name}', TYPE_ID=${data.typeId}, DEPARTMENT_ID=${data.departmentId} WHERE ID=${data.id}`
  );
}

function deactiveItemById(id) {
  return post(`UPDATE ${process.env.TABLE_ITEMS} SET STATUS=1 WHERE ID=${id}`);
}

function getItemsByDepartmentId(params) {
  return get(
    `SELECT * FROM ${process.env.VW_ITEMS} WHERE DEPARTMENT_ID=${params.depId} AND LOCATION_ID=${params.locId}`
  );
}

function getLastItemCode(value) {
  if (value == "MT") {
    return get(`SELECT MAX(CODE) AS LAST from ${process.env.TABLE_ITEMS} WHERE CODE LIKE 'MT%'
  `);
  } else if (value == "TG") {
    return get(
      `SELECT MAX(CODE) AS LAST from ${process.env.TABLE_ITEMS} WHERE CODE LIKE 'TG%'`
    );
  }
}

function getItemsBySearch(value) {
  return get(
    `SELECT*FROM ${process.env.VW_ITEMS} WHERE CODE LIKE '%${value.q}%' OR NAME LIKE '%${value.q}%' ORDER BY CODE`
  );
}

function getItemTypes() {
  return get(`SELECT * FROM ${process.env.TABLE_ITEM_TYPES}`);
}

module.exports = {
  getItems,
  addItemType,
  updateItemType,
  filterItems,
  getItemsByDepartmentId,
  deactiveItemById,
  addItem,
  updateItem,
  getItemTypes,
  getItemsBySearch,
  getLastItemCode,
  getNewItems,
};
