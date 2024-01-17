require("dotenv").config();
const sql = require("mssql");
const sqlConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.HOST,
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
sql.connect(sqlConfig);

let get = async (value) => {
  try {
    const result = await sql.query(value);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

let post = async (value) => {
  try {
    const result = await sql.query(value);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  get,
  post,
  sqlConfig,
};
