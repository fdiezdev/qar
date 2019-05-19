const mysql = require("mysql");
const { promisify } = require("util");
const chalk = require("chalk");

const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error(chalk.bgRed("Database connection was closed."));
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error(chalk.bgRed("Database has to many connections"));
    }
    if (err.code === "ECONNREFUSED") {
      console.error(chalk.bgRed("Database connection was refused"));
    }
  }

  if (connection) connection.release();
  console.log(chalk.bgCyan("DB is connected, Happy Hacking!"));
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
