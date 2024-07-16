const mysql = require('mysql2');
const inquirer = require('inquirer');
// connect to databases

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: 'root',  
    database: 'employee_tracker'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// initial app start
function startApp() {
    inquirer.prompt({
      type: 'list',
      name: 'options',
      message: 'What would you like to do? Choose below',
      choices: [
        'View All Departments',
        'Add Department',
        'View All Roles',
        'Add Role',
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ],
    }).then((response) => {

    switch (response.options) {
      case 'View All Departments':
         allDepartment();
        break;
      case 'Add Department':
         addDepartment();
        break;
      case 'View All Roles':
         allRoles();
        break;
      case 'Add Role':
         addRole();
        break;
      case 'View All Employees':
         allEmployees();
        break;
      case 'Add Employee':
         addEmployee();
        break;
      case 'Update Employee Role':
         updateRole();
        break;
      case 'Exit':
        console.log('Exited successfully! Goodbye!');
        process.exit();
      }
  }) 
};

// view all table from departments
function allDepartment() {
  db.query('SELECT * FROM departments' , function(err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    startApp();
  });
}

// view all roles
async function allRoles() {
 db.query('SELECT roles.title, roles.id, departments.department_name, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id', function(err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    startApp();
  });
}


// view all employees
async function allEmployees() {
db.query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    ` , function(err, results) {
    if (err) {
      console.error(err);
      return; 
    } else {
      console.table(results);
      startApp();
    };
});
};

//add department
function addDepartment() {
inquirer.prompt({
    type: 'input',
    name: 'department_name',
    message: 'Enter the name of the department you would like to add:'
}).then((response) => {
  let departmentName = response.department_name;
    db.query('INSERT INTO departments (department_name) VALUES (?)',[departmentName], function(err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`You have successfully added ${departmentName} to the database!`);
        allDepartment();
    });
})
  
}

//add roles
 function addRole() {
  db.query('SELECT * FROM departments', function(err, results) {
    if (err) {
      console.error(err);
      return;
    } else {
      const departments = results.map(department => ({ name: department.department_name, value: department.id }));
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role you would like to add:'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role you would like to add:'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for this role:',
          choices: departments
        }
      ]).then((response) => {
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [response.title, response.salary, response.department_id], function(err, results) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`You have successfully added the role ${response.title} to the database!`);
          allRoles();
        });
      });
    }
  });

};
  
//add employee
 function addEmployee() {
  db.query('select * from roles', function(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  const roles = results.map(role => ({ name: role.title, value: role.id }));
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee you would like to add:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee you would like to add:'
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for this employee:',
      choices: roles
    }
  ]).then((response) => {
    db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [response.first_name, response.last_name, response.role_id], function(err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`You have successfully added the employee ${response.first_name} ${response.last_name} to the database!`);
      allEmployees();
    });
  });
});
};

//update employee
 function updateRole() {
  db.query('SELECT * FROM employee', async function(err, results) {
    if (err) {
      console.error(err);
      return;
    }
    const employees = results.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
    db.query('SELECT * FROM roles', async function(err, results) {

      if (err) {
        console.error(err);
        return;
      }
      const roles = results.map(role => ({ name: role.title, value: role.id }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee you would like to update:',
          choices: employees
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role for this employee:',
          choices: roles
        }
      ]).then((response) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.role_id, response.employee_id], function(err, results) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('You have successfully updated the employee role!');
          allEmployees();
        });
      });
    });
  });
 };


startApp();