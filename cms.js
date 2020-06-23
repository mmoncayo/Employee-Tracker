// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

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

// establishing connection to MySQL Workbench when starting program and prompts user what action to take
connection.connect(function (err) {
    if (err) throw err;
    runCMS();
});


// main menu of options for the user to select to do with the Company Content Management System (CMS)
function runCMS() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Add an Employee",
                "Add a Role",
                "Add a Department",
                "Update an Employee's Role",
                "Update an Employee's Manager",
                "View Employees by Manager",
                "Delete an Employee",
                "Delete a Role",
                "Delete a Department",
                "View Total Utilized Budget by Department",
                "EXIT"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Update an Employee's Role":
                    updateEmployeeRole();
                    break;
                case "Update an Employee's Manager":
                    updateEmployeeManager();
                    break;
                case "View Employees by Manager":
                    viewEmployeesByManager();
                    break;
                case "Delete an Employee":
                    delEmployee();
                    break;
                case "Delete a Role":
                    delRole();
                    break;
                case "Delete a Department":
                    delDepartment();
                    break;
                case "View Total Utilized Budget by Department":
                    viewDeptBudget();
                    break;
                case "EXIT":
                    connection.end();
                    break;
            }
        });
};

// function for viewing employee roster
function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if(err) throw err;
            console.table(res);
        runCMS();
    });
}
