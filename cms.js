// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// establishing connection template and utilizing Promises for async await methods in the program
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

// including credentials to log-in to db
const db = new Database({
    host: "localhost",
    // port to reach MySQL Workbench
    port: 3306,
    // username
    user: "root",
    // password and database to access
    password: "p@ssw0rd1",
    database: "company_db"
});

// main menu of options for the user to select to do with the Company Content Management System (CMS)
function runCMS() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
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
                    db.close();
                    break;
            }
        });
};

// insert welcome message/ascii art to start the app off

// then initiate the program
runCMS();


// async function for viewing employee roster
async function viewEmployees() {
    const query = 'SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id';
    await db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runCMS();
    });
}

// async function for viewing all roles available
async function viewRoles() {
    const query = "SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id";
    await db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runCMS();
    });
}

// async function for viewing all departments available
async function viewDepartments() {
    const query = "SELECT id, name AS department FROM department";
    await db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runCMS();
    });
}

// validation function to be called inside inquirer to check that user input isn't left blank
async function confirmUserInput(input) {
    if (input.trim() != "") {
        return true;
    }
    return "Invalid input. Entries must not be left blank."
}

// async function for adding an employee to employee roster
async function addEmployee() {
    // query the company database for all managers available to provide option to select and assign manager to an employee
    let positions = await db.query("SELECT id, title FROM role");
    let managers = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employee');
    managers.unshift({ id: null, Manager: "None" });

    // once managers have been selected, prompt user for all information to add new employee 
    inquirer
        .prompt([
            {
                name: "empFirstname",
                type: "input",
                message: "What is the employee's first name?",
                validate: confirmUserInput
            },
            {
                name: "empLastname",
                type: "input",
                message: "What is the employee's last name?",
                validate: confirmUserInput
            },
            {
                name: "empRole",
                type: "list",
                message: "What is the employee's role?",
                choices: positions.map(obj => obj.title)
            },
            {
                name: "empManager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: managers.map(obj => obj.Manager)
            }
        ])
        .then(answers => {
            let positionDetails = positions.find(obj => obj.title === answers.empRole);
            let manager = managers.find(obj => obj.Manager === answers.empManager);
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [[answers.empFirstname.trim(), answers.empLastname.trim(), positionDetails.id, manager.id]]);
            console.log("\x1b[32m", `${answers.empFirstname} was added to the employee CMS!`);
            runCMS();
        });
};

// async function for removing employee
async function delEmployee() {
    let employees = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    employees.push({ id: null, name: "Cancel"});

    inquirer
    .prompt([
        {
            name: "employeeName",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: employees.map(obj => obj.name)
        }
    ])
    .then(response => {
        if(response.employeeName != "Cancel") {
            let removeEmployee= employees.find(obj => obj.name === response.employeeName);
            db.query("DELETE FROM employee WHERE id = ?", removeEmployee.id);
            console.log("\x1b[32m", `${response.employeeName} has been removed.`);
        }
        runCMS();
    });
};

// update the employee's manager
// and to take it one step further, prevents the employee from being their own manager
async function updateEmployeeManager() {
    let employees = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    employees.push({ id: null, name: "Cancel" });

    inquirer
    .prompt([
        {
            name: "employeeName",
            type: "list",
            message: "For which employee would you like to update their manager?",
            choices: employees.map(obj => obj.name)
        }
    ])
    .then(employeeInfo => {
        if(employeeInfo.employeeName == "Cancel") {
            runCMS();
            return;
        }
        let managers= employees.filter(currentEmp => currentEmp.name != employeeInfo.employeeName);
        for(i in managers) {
            if(managers[i].name === "Cancel") {
                managers[i].name = "None";
            }
        };

        inquirer
        .prompt([
            {
                name: "managerName",
                type: "list",
                message: "Which manager should the employee be assigned to?",
                choices: managers.map(obj => obj.name)
            }
        ])
        .then(managerInfo => {
            let employeeID = employees.find(obj => obj.name === employeeInfo.employeeName).id;
            let managerID = managers.find(obj => obj.name === managerInfo.managerName).id;
            db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerID, employeeID]);
            console.log("\x1b[32m", `${employeeInfo.employeeName} has been assigned to ${managerInfo.managerName} as manager.`);
            runCMS();
        });
    });
};


