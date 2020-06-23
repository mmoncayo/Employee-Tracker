// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// establishing connection template
const connection = mysql.createConnection({
  host: "localhost",

  // port to reach MySQL Workbench
  port: 3306,

  // username
  user: "root",

  // password and database to access
  password: "p@ssw0rd1",
  database: "company_db"
});

// establishing connection to MySQL Workbench
connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});