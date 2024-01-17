const { get, post } = require("../connection");
require("dotenv").config();

function getReplacements() {
  return get(
    `SELECT * FROM ${process.env.VW_REPLACEMENTS} WHERE DATE>DATENAME(YEAR, GETDATE()) ORDER BY DATE DESC`
  );
}

function deleteReplacement(id) {
  return post(`DELETE FROM ${process.env.TABLE_REPLACEMENTS} WHERE ID=${id}`);
}

function addReplacement(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_REPLACEMENTS}(FROM_ID,PLACED_ID,DATE,ITEM_ID,CREATEDBY_ID) 
    VALUES (${data.fromId}, ${data.toId}, '${data.date}',${data.itemId},${data.userId});`
  );
}

function putReplacement(data) {
  return post(
    `UPDATE ${process.env.TABLE_REPLACEMENTS} SET DATE='${data.date}', PLACED_ID=${data.placedId} where ID=${data.id}`
  );
}

function getReplByItemId(value) {
  return get(
    `SELECT R.ID,R.ITEM_ID, R.DATE, D.NAME AS [FROM], DS.NAME AS PLACED FROM ${process.env.TABLE_REPLACEMENTS} AS R
    LEFT OUTER JOIN ${process.env.TABLE_DEPARTMENTS} AS D ON D.ID=R.FROM_ID
    LEFT OUTER JOIN ${process.env.TABLE_DEPARTMENTS} AS DS ON DS.ID=R.PLACED_ID
    WHERE ITEM_ID=${value} ORDER BY R.DATE DESC`
  );
}

function getReplBySearch(value) {
  return get(
    `SELECT * FROM ${process.env.VW_REPLACEMENTS} WHERE (CODE LIKE '%${value.q}%' OR ID LIKE '%${value.q}%') AND DATE>DATENAME(YEAR, GETDATE()) `
  );
}

function getReplByDateRange(params) {
  return get(
    `SELECT*FROM ${process.env.VW_REPLACEMENTS} WHERE DATE BETWEEN '${params.f}' AND '${params.t}' ORDER BY DATE`
  );
}

module.exports = {
  getReplacements,
  addReplacement,
  deleteReplacement,
  getReplBySearch,
  putReplacement,
  getReplByItemId,
  getReplByDateRange,
};
