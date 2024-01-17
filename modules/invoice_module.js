const { get, post } = require("../connection");
require("dotenv").config();

function getInvoices() {
  return get(
    `SELECT*FROM ${process.env.VW_INVOICES} WHERE DATE>DATENAME(YEAR, GETDATE()) ORDER BY DATE DESC`
  );
}

function getInvoiceDocCodes() {
  return get(`SELECT*FROM ${process.env.TABLE_INVOICE_REASONS}`);
}

function getInvoiceBySearch(value) {
  return get(
    `SELECT * FROM ${process.env.VW_INVOICES} WHERE (CODE LIKE '%${value.q}%' OR ID LIKE '%${value.q}%') AND DATE>DATENAME(YEAR, GETDATE()) ORDER BY DATE DESC`
  );
}

function getInvoiceByRange(value) {
  return get(
    `SELECT * FROM ${process.env.VW_INVOICES} WHERE DATE BETWEEN '${value.f}'AND '${value.t}' ORDER BY DATE`
  );
}

function getInvoicesByItemId(value) {
  return get(
    `SELECT ID.ID, ID.CODE,ID.NAME,ID.DOCCODE,ID.DATE, P.AMOUNT,P.EXPLANATION,P.FICHEDATE,P.FICHENO FROM ${process.env.VW_INVOICES} ID
    LEFT JOIN 
    ${process.env.TABLE_PAYMENTS} P ON ID.ID=P.INVOICE_ID 
	WHERE ID.ITEM_ID=${value.id} ORDER BY P.FICHEDATE DESC`
  );
}

function getNewItemsInvoice(id) {
  return get(
    `SELECT *FROM ${process.env.TABLE_INVOICES} 
    WHERE DATE>(SELECT DATEADD(month, DATEDIFF(month, 0, GETDATE()), 0) AS StartOfMonth) 
    AND DOC_ID=3 AND DEPARTMENT_LOCATION_ID=${id}`
  );
}

function getNonPaymentInvoices(status) {
  if (status == 0) {
    return get(
      `SELECT ID.ID, ID.CODE,ID.NAME,ID.DOCCODE,ID.EXPLANATION,ID.DATE FROM ${process.env.VW_INVOICES} ID
      LEFT JOIN 
      ${process.env.TABLE_PAYMENTS} P ON ID.ID=P.INVOICE_ID 
       WHERE P.INVOICE_ID IS NULL AND ID.DATE>DATENAME(YEAR, GETDATE())`
    );
  }
}

function addInvoice(data) {
  return post(
    `INSERT INTO ${process.env.TABLE_INVOICES}(DOC_ID,DEPARTMENT_LOCATION_ID,DATE,EXPLANATION,ITEM_ID,CREATEDBY_ID) 
    VALUES (${data.docId},${data.locId},'${data.date}',N'${data.exp}',${data.itemId},${data.userId})`
  );
}

function updateInvoice(data) {
  return post(
    `UPDATE ${process.env.TABLE_INVOICES} SET DOC_ID=${data.docId}, DATE='${data.date}', EXPLANATION=N'${data.explanation}' where ID=${data.id}`
  );
}

function deleteInvoice(id) {
  return post(`DELETE FROM ${process.env.TABLE_INVOICES} WHERE ID=${id}`);
}

module.exports = {
  getInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceBySearch,
  getInvoiceDocCodes,
  getInvoiceByRange,
  getNewItemsInvoice,
  getInvoicesByItemId,
  getNonPaymentInvoices,
};
