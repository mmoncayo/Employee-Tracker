-- Create starter data for department table
INSERT INTO department (name) 
VALUES 
('Engineering'),
('Finance'),
('Legal'), 
('Operations'), 
('Sales');

-- Create starter data for role table
INSERT INTO role (title, salary, department_id) 
VALUES
("Lead Engineer", 135000, 1),
("Engineer", 95000, 1),
("Accountant", 75000, 2),
("Counsel", 90000, 3),
("Head Counsel", 125000, 3),
("Office Manager", 75000, 4),
("Director of Operations", 110000, 4),
("Sales Associate", 70000, 5),
("Lead Sales Associate", 85000, 5);

-- Create starter data for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Stanley", "Hudson", 1),
("Kevin", "Malone", 2, 1),
("Angela", "Martin", 3),
("Kelly", "Kapoor", 4, 5),
("Toby", "Flenderson", 5),
("Pam", "Beasley", 6, 7),
("Michael", "Scott", 7),
("Dwight", "Schrute", 8, 9),
("Jim", "Halpert", 9);