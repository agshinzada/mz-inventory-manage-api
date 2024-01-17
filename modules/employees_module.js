const { get, post } = require("../connection");
require("dotenv").config();

function getEmployees() {
  return get(`SELECT TOP 30 *FROM  ${process.env.VW_EMPLOYEES}`);
}
function getNumberByEmployeeId(id) {
  return get(
    `SELECT*FROM ${process.env.TABLE_NUMBERS} WITH (NOLOCK) WHERE EMPLOYEE_ID=${id}`
  );
}
function getEmployeeByValue(value) {
  switch (parseInt(value.m)) {
    case 1:
      return get(
        `SELECT TOP 30 *FROM ${process.env.VW_EMPLOYEES} WHERE NAME LIKE N'%${value.q}%' OR SURNAME LIKE N'%${value.q}%'`
      );
    case 2:
      return get(
        `SELECT TOP 30 *FROM ${process.env.VW_EMPLOYEES} WHERE EXPLANATION LIKE N'%${value.q}%'`
      );
    case 3:
      return get(
        `SELECT TOP 30 e.ID,E.NAME,E.SURNAME,D.NAME DEPARTMENT ,r.NAME REGION
        from ${process.env.TABLE_EMPLOYEES} E 
        join ${process.env.TABLE_NUMBERS} NL 
        on e.ID = nl.EMPLOYEE_ID 
        Join ${process.env.TABLE_DEPARTMENTS} D
        On E.DEPARTMENT_ID = D.ID
        jOIN ${process.env.TABLE_REGIONS} R
        oN E.REGION_ID = r.ID
        where nl.NUMBER like '%${value.q}%'`
      );
    case 4:
      return get(
        `SELECT TOP 30 *FROM ${process.env.VW_EMPLOYEES} WHERE DEPARTMENT LIKE N'%${value.q}%'`
      );
  }
}

function addEmployee(data) {
  return get(`
  INSERT INTO ${process.env.TABLE_EMPLOYEES}(NAME,SURNAME,REGION_ID,DEPARTMENT_ID,EXPLANATION,CREATEDBY_ID)
  OUTPUT Inserted.ID
  VALUES (N'${data.name}',N'${data.surname}',${data.regionId},${data.departmentId},N'${data.explanation}',${data.userId})
   `);
}

function addEmployeeNumber(data) {
  return get(`
  INSERT INTO ${process.env.TABLE_NUMBERS}(NUMBER,EMPLOYEE_ID,CREATEDBY_ID) 
  VALUES ('${data.num1}',${data.employeeId},${data.userId}),
         ('${data.num2}',${data.employeeId},${data.userId})
`);
}

function putEmployee(data) {
  return get(`
  UPDATE ${process.env.TABLE_EMPLOYEES} SET NAME=N'${data.name}', SURNAME=N'${data.surname}', 
  REGION_ID=${data.regionId}, DEPARTMENT_ID=${data.departmentId}, EXPLANATION=N'${data.explanation}' 
  WHERE ID=${data.employeeId}
`);
}

function putEmployeeNumber(data) {
  if (data.obj.length > 1) {
    return get(`
    UPDATE ${process.env.TABLE_NUMBERS} SET NUMBER='${data.num1}' WHERE ID=${data.obj[0].ID}
    UPDATE ${process.env.TABLE_NUMBERS} SET NUMBER='${data.num2}' WHERE ID=${data.obj[1].ID}
  `);
  } else {
    return get(`
    UPDATE ${process.env.TABLE_NUMBERS} SET NUMBER='${data.num1}' WHERE ID=${data.obj[0].ID}
  `);
  }
}

function removeEmployee(id) {
  return post(`
  DELETE FROM ${process.env.TABLE_NUMBERS} WHERE EMPLOYEE_ID=${id}
  DELETE FROM ${process.env.TABLE_EMPLOYEES} WHERE ID=${id}`);
}

module.exports = {
  getEmployees,
  getEmployeeByValue,
  getNumberByEmployeeId,
  addEmployee,
  addEmployeeNumber,
  removeEmployee,
  putEmployee,
  putEmployeeNumber,
};
