# Employee Tracker App
![GitHub License](https://img.shields.io/github/license/mmoncayo/Employee-Tracker) ![GitHub License](https://img.shields.io/github/repo-size/mmoncayo/Employee-Tracker) ![GitHub License](https://img.shields.io/github/package-json/dependency-version/mmoncayo/Employee-Tracker/mysql) ![GitHub License](https://img.shields.io/github/package-json/dependency-version/mmoncayo/Employee-Tracker/console.table) ![GitHub License](https://img.shields.io/github/package-json/dependency-version/mmoncayo/Employee-Tracker/inquirer) ![GitHub License](https://img.shields.io/github/followers/mmoncayo?style=social)

## Description
​
This Node app serves as a Content Management System that is to be used to manage employees, departments, and roles from any given company. This app is built using Node, MySQL, &amp; Inquirer.

## Table of Contents 

* [Demo](#demo)

* [Prerequisites](#prerequisites)

* [Installation](#installation)

* [Getting Started](#getting-started)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)
​
* [Questions](#questions)

## Demo

![Employee Tracker Demo](./Employee-Tracker_Demo.gif)

## Prerequisites

* [Node.js](https://nodejs.dev/)
* [MySQL and MySQL Workbench](https://dev.mysql.com/downloads/mysql)

## Installation

You can clone the repository remotely with the following command line

```
git clone https://github.com/mmoncayo/Employee-Tracker.git
```

To install the necessary and relevant dependencies using Node.js, run the following command:

```
npm install
```

## Getting Started

Once you have the GitHub repository locally stored, Node.js, MySQL, & MySQL Workbench installed, you can then take the following steps:

1. In your "Employee-Tracker" directory there is a "db" directory. In that database directory there are two primary SQL files: schema.sql and seeds.sql. 
    * Open your MySQL Workbench and run schema.sql to create the database and tables.
    * Run the seeds.sql file to populate the database with some data.
2. Now that your database is ready to be queried, open cms.js and replace the placeholder MySQL root password on line 40 with the your personal MySQL password, see for reference a code snippet below:
```javascript
    // password and database to access MySQL Workbench files schema.sql & seeds.sql
    password: "p@ssw0rd1", // replace this password with your own 
    database: "company_db"
```

## Usage

To use the app from the terminal, be sure you're under the Employee-Tracker directory and use your CLI to run the following command:

```
node cms.js
```

You are then prompted with a welcome message and a main menu of options to choose from. 

The options you may select from include:

* Add an employee, role or department
* View all employees, roles or department
* Update an employee's role or manager
* Delete an employee, role or department

If you selected any of the options to view the data, then you are prompted with the results formatted in a user friendly table. Otherwise, if you selected to either add, update or delete any entries in the database, you then follow a series of questions that need to be answered to fulfill your request. Once you are satisfied with viewing or editing the employee tracker system, there is an option in the main menu to exit the program.

## License

This project is licensed under the MIT license.

## Contributing

If you'd like to contribute to the repo, there is potential growth to add more options on how to interpret the data and what information exactly you'd like to see based on all the parameters of the company (e.g., view department budget based on employee's salaries, viewing employees by manager, etc.). 

If interested in contributing, please reach out to me via GitHub or e-mail to contribute or discuss collaborations.

## Questions

If you have any questions about the repo, open an issue or contact [mmoncayo](https://github.com/mmoncayo) directly at matthew.moncayo@gmail.com.