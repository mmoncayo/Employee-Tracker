### Schema

-- Drops the company_db if it already exists --
DROP DATABASE IF EXISTS company_db;

-- Create the database company_db and specified it for use.
CREATE DATABASE company_db;
USE company_db;

-- Create the table department
CREATE TABLE department(
  id int AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

-- Create the table role
CREATE TABLE role(
  id int AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id int,
  PRIMARY KEY (id)
);

-- Create table employee
CREATE TABLE employee(
  id int AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);

-- Shows values for selected tables
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
