// insert into department table
INSERT INTO department (name)
VALUES ("web development"),
("customer service"),
("marketing"),
("human resources");

// insert into employee_role table
INSERT INTO employee_role (title, salary, department_id)
VALUES ("junior developer", 50000, 1),
("senior developer", 80000, 1),
("customer service representative", 40000, 2),
("customer service manager", 60000, 2),
("marketing coordinator", 45000, 3),
("marketing director", 75000, 3),
("human resources assistant", 40000, 4),
("human resources director", 70000, 4);

// insert into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
("Jane", "Smith", 2, 1),
("Mike", "Jones", 3, NULL),
("Sarah", "Johnson", 4, 3),
("Tom", "Brown", 5, NULL),
("Sally", "Green", 6, 5),
("Chris", "White", 7, NULL),
("Emily", "Black", 8, 7);