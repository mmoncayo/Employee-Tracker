-- Establish the use of the company database
USE company_db;

-- Queries to ADD departments, roles, and/or employees
-- (i.e., adds rows with values in each column into the respective table)

INSERT INTO department(name) VALUES(?);
INSERT INTO role(title, salary, deparment_id) VALUES(?, ?, ?);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?);


-- Queries to VIEW departments, roles, and/or employees

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


-- Query to UPDATE employee roles

UPDATE employee SET role_id = ? WHERE employee(id) = ?;


-- IF TIME PERMITS: BONUS CONTENT -- 

-- Query to UPDATE employee managers

-- Query to VIEW employees by manager

-- Query to DELETE departments, roles, and/or employee

-- Query to view overall budget per department (i.e., combined salaries of all employees in that department)

