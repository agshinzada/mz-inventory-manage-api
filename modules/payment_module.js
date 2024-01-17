const { get, post } = require("../connection");
require("dotenv").config();

function getPayments() {
  return get(
    `SELECT*FROM ${process.env.VW_PAYMENTS} WHERE DATE>DATENAME(YEAR, GETDATE()) ORDER BY DATE`
  );
}

function getPaymentByFicheId(id) {
  return get(`SELECT*FROM ${process.env.VW_PAYMENTS} WHERE FICHE_ID=${id}`);
}

function getFiches() {
  return get(
    `SELECT PF.ID, PF.CODE, PF.STATUS, PF.LOCK_STATUS, PF.PAY_DATE, PF.TOTAL,PF.DATE,PFT.NAME FROM ${process.env.TABLE_FICHES} PF
    LEFT JOIN ${process.env.TABLE_FICHE_TYPES} PFT ON PF.FICHE_TYPE_ID=PFT.ID
    WHERE DATE>DATENAME(YEAR, GETDATE()) ORDER BY PF.CODE`
  );
}

function getFichesBySearch(value) {
  return get(
    `SELECT PF.ID, PF.CODE, PF.STATUS, PF.LOCK_STATUS, PF.PAY_DATE, PF.TOTAL,PF.DATE,PFT.NAME FROM ${process.env.TABLE_FICHES} PF
    LEFT JOIN ${process.env.TABLE_FICHE_TYPES} PFT ON PF.FICHE_TYPE_ID=PFT.ID
    WHERE (PF.CODE LIKE N'%${value}%' OR PFT.NAME LIKE N'%${value}%') AND PF.DATE>DATENAME(YEAR, GETDATE()) ORDER BY DATE
   `
  );
}

function getFichesByStatus(value) {
  return get(
    `SELECT PF.ID, PF.CODE, PF.STATUS, PF.LOCK_STATUS, PF.PAY_DATE, PF.TOTAL,PF.DATE,PFT.NAME FROM ${process.env.TABLE_FICHES} PF
    LEFT JOIN ${process.env.TABLE_FICHE_TYPES} PFT ON PF.FICHE_TYPE_ID=PFT.ID
    WHERE PF.STATUS=${value} AND DATE>DATENAME(YEAR, GETDATE()) ORDER BY PF.CODE`
  );
}

function getLastFicheCode() {
  return get(`SELECT MAX(CODE) LAST FROM ${process.env.TABLE_FICHES}`);
}

function getPaymentsBySearch(value) {
  return get(
    `SELECT*FROM ${process.env.VW_PAYMENTS} WHERE (CODE LIKE '%${value}%' OR ID LIKE '%${value}%') AND DATE>DATENAME(YEAR, GETDATE())`
  );
}

function getFichesByDateRange(value) {
  return get(
    `SELECT PF.ID, PF.CODE, PF.STATUS, PF.LOCK_STATUS, PF.PAY_DATE, PF.TOTAL,PF.DATE,PFT.NAME FROM ${process.env.TABLE_FICHES} PF
    LEFT JOIN ${process.env.TABLE_FICHE_TYPES} PFT ON PF.FICHE_TYPE_ID=PFT.ID
    WHERE PF.DATE BETWEEN '${value.f}' AND '${value.t}'
   `
  );
}

function getPaymentById(id) {
  return get(
    `SELECT*FROM ${process.env.VW_PAYMENTS} WHERE ID=${id} AND DATE>DATENAME(YEAR, GETDATE())`
  );
}

function addPayment(data) {
  return post(`INSERT INTO ${process.env.TABLE_PAYMENTS}(INVOICE_ID,FICHE_ID,AMOUNT,EXPLANATION,DATE,CREATEDBY_ID) VALUES
  (${data.invoiceId},${data.ficheId},${data.price},N'${data.explanation}','${data.date}',${data.userId}) `);
}

function addPaymentBulk(obj) {
  let query = "";
  for (const iterator of obj.arr) {
    query += `INSERT INTO ${process.env.TABLE_PAYMENTS}(INVOICE_ID,FICHE_ID,AMOUNT,EXPLANATION,DATE,CREATEDBY_ID) VALUES
    (${iterator.invoiceId},${obj.ficheId},${iterator.price},N'${iterator.expl}',GETDATE(),${obj.userId}) `;
  }
  return post(query);
}

function addFiche(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_FICHES}(CODE,FICHE_TYPE_ID,STATUS,DATE,CREATEDBY_ID) 
    OUTPUT Inserted.ID
    VALUES ('${data.code}',${data.type},0,'${data.date}',${data.userId})`
  );
}

function updatePaymentBulk(obj) {
  let query = "";
  for (const iterator of obj) {
    query += `UPDATE ${process.env.TABLE_PAYMENTS}
    SET AMOUNT=${iterator.price} , EXPLANATION=N'${iterator.expl}' WHERE ID=${iterator.id} `;
  }
  return post(query);
}

function updatePayment(data) {
  return get(
    `UPDATE ${process.env.TABLE_PAYMENTS} 
    SET DATE='${data.date}', AMOUNT=${data.amount} , EXPLANATION=N'${data.explanation}' 
    WHERE ID=${data.id}`
  );
}

function deletePayment(id) {
  return post(`DELETE FROM ${process.env.TABLE_PAYMENTS} WHERE ID=${id}`);
}

function removeFiche(id) {
  return post(`
  DELETE FROM ${process.env.TABLE_PAYMENTS} WHERE FICHE_ID=${id}
  DELETE FROM ${process.env.TABLE_FICHES} WHERE ID=${id}
  `);
}

function updateFicheStatus(data) {
  return post(
    `UPDATE ${process.env.TABLE_FICHES} SET STATUS=1, PAY_DATE='${data.date}' WHERE ID='${data.id}'`
  );
}

function getPaymentsByDateRange(data) {
  return get(
    `SELECT * FROM ${process.env.VW_PAYMENTS} WHERE DATE BETWEEN '${data.f}' AND '${data.t}' ORDER BY DATE`
  );
}

function getTotalAmountByMonth(params) {
  return get(
    `SELECT STATUS, SUM(TOTAL) TOTAL FROM ${process.env.TABLE_FICHES} WHERE YEAR(DATE)='2023' AND MONTH(DATE)='${params.month}' AND FICHE_TYPE_ID=${params.locId} GROUP BY STATUS
    `
  );
}

function putFicheLockStatus(params) {
  return get(
    `UPDATE ${process.env.TABLE_FICHES} SET LOCK_STATUS=${params.status} WHERE ID=${params.ficheId}
    `
  );
}

function putPaymentLockStatus(params) {
  return get(
    `UPDATE ${process.env.TABLE_PAYMENTS} SET LOCK_STATUS=${params.status} WHERE ID=${params.paymentId}
    `
  );
}

function getMonthlyFiches(locId) {
  if (locId !== "null") {
    return get(
      `SELECT PF.ID, PF.CODE, PF.FICHE_TYPE_ID, PF.STATUS, PF.LOCK_STATUS, PF.PAY_DATE, PF.TOTAL,PF.DATE,PFT.NAME FROM ${process.env.TABLE_FICHES} PF
      LEFT JOIN ${process.env.TABLE_FICHE_TYPES} PFT ON PF.FICHE_TYPE_ID=PFT.ID
      WHERE DATE>DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AND PF.FICHE_TYPE_ID=${locId} ORDER BY DATE DESC`
    );
  } else {
    return get(
      `SELECT PF.ID, PF.CODE, PF.STATUS, PF.LOCK_STATUS, PF.PAY_DATE, PF.TOTAL,PF.DATE,PFT.NAME FROM ${process.env.TABLE_FICHES} PF
      LEFT JOIN ${process.env.TABLE_FICHE_TYPES} PFT ON PF.FICHE_TYPE_ID=PFT.ID
      WHERE DATE>DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) ORDER BY DATE DESC`
    );
  }
}

function getPreviousMonthPayments() {
  return get(
    `	SELECT*FROM ${process.env.VW_PAYMENTS} WHERE STATUS=0 AND DATE>(select DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE())-1, 0)) ORDER BY FICHENO    `
  );
}

module.exports = {
  getPayments,
  getFiches,
  getFichesByStatus,
  getLastFicheCode,
  getPaymentsBySearch,
  getFichesBySearch,
  getPaymentById,
  addPayment,
  addPaymentBulk,
  addFiche,
  updatePayment,
  updatePaymentBulk,
  deletePayment,
  removeFiche,
  getPaymentsByDateRange,
  getFichesByDateRange,
  getTotalAmountByMonth,
  getMonthlyFiches,
  updateFicheStatus,
  getPaymentByFicheId,
  getPreviousMonthPayments,
  putFicheLockStatus,
  putPaymentLockStatus,
};
