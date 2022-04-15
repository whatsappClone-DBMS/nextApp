const { createPool } = require("mysql");
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database: "project",
});

pool.getConnection((err) => {
  if (err) {
    console.log("Error connecting to database...");
  }
  console.log("Connected to database...");
});

const executeQuery = (query, arraParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arraParams, (err, data) => {
        if (err) {
          console.log("Error in executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { executeQuery };
