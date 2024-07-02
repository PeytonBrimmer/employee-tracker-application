const db =require('../helpers/db.js');
const titleCase = (str) => str.replace(/\b[a-z]/gi, (cahr) => cahr.toUpperCase()).replace(/Tv/gi, 'TV');
//lookup table for the main menu

//queries, query type, methods db.query
class Query {
    checkDepartment(department) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM department WHERE name = ?`, titleCase(department), (err, results) => {
                if (err) {
                    reject(err);
                } //if the results are empty
                if (results[0] === undefined) {
                    resolve(null);
                } else {
                    resolve(results[0]?.id);
            };
        });
    });
};
//check the employee
checkEmployee(employee) {
//title case the employee name
    const name = titleCase(employee);
    const nameSplit = name.split('');
    const firstName = nameSplit[0];
    const lastName = nameSplit[1];
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, [firstName, lastName], (err, results) => {
                        if (err) {
                            reject(err);
                        }//if the results are empty
                        if (results.length === 0) {
                            resolve(null)
                        } else {
                            resolve(results[0]?.id);
                        };
                    });
                });
            };
    //check the role
    checkRole(role) {
        const roleTitle = titleCase(role);
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM employee_role WHERE title = ?`, roleTitle, (err, results) => {
                if (err) {
                    reject(err);
                }//if the results are empty
                if (results.length === 0) {
                    resolve(null);
                } else {
                    resolve(results[0]?.id);
                };
            });
        });
    };
//check the manager
    checkManager(manager) {
        const managerName = titleCase(manager);
        const splitName = managerName.split
        const firstName = splitName[0]; 
        const lastName = splitName[1];
//check if the manager exists
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, [firstName, lastName], (err, results) => {
                if (results.length === 0) {
                    resolve(null);
                } else {
                    resolve(results[0]?.id);
                };
            });
        });
    };

    // get employee name and id
    async getEmployeeNameId() {
        cosnt arr = await this.queryEmployeeNameAndId();
        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                name: `${arr[i].first_name} ${arr[i].last_name}`,
                value: arr[i].id
            };
        }
        return arr;
    }
//query employee name and id
    queryEmployeeNameAndId() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, first_name, last_name FROM employee`, (err, results) => {//if there is an error
                if (err) {
                    reject(err);
                } else { 
                resolve(results);
                }
            });//end of query
        });
    };

    async getRoleNameId() {
        cosnt arr = await this.queryRolenameandId();
        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                name: '${arr[i].title}',
                value: arr[i].id
            };
        }
    return arr;
    }
    //query role name and id
    queryRoleNameAndId() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT title, id FROM employee_role`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    //get department name and id
    async getDepartmentNameId() {
        const arr = await this.queryDepartmentNameId();
        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                name: `${arr[i].name}`,
                value: arr[i].id
            };
        }
        return arr;
    }

    //query department name and id
    queryDepartmentNameId() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT name, id FROM department`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    //query manager name and id
    queryManagerNameId() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };
}

//class departments extends query
viewAll() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM department`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            };
        });
    });
};
//create a department
async create(name) {
    const departmentExist = await this.checkDepartment(name);
    if (departmentExist) {
        throw new Error('Department already exists');
    }//if the department does not exist
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, titleCase(name), (err, results) => {//if there is an error
            if (err) {
                reject(err);
            } else {
                resolve(results);
            };
        });
    });
};
//may need to add }; here if broken 
//class roles extends query
class Roles extends Query {
    viewAll() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM employee_role`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                };
            });
        });
    };

    //create a role
    async create(name, salary, department) {
       const roleId = await this.checkRole(name);
       if (!department || roleId) {
        throw new Error('Role already exists Department ID returned: ${department} Role ID returned: ${roleId}');
       };
       //if the role does not exist
       //return a promise
       return new Promise((resolve, reject) => {
        db.query('insert into employee_role (title, salary, department_id) values (?, ?, ?)', [titleCase(name), salary, department], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            };
        });
       });
    };
};

//class employees extends query
class Employees extends Query {
    async viewAll() {
        const managers = await this.getManagernameId();
        const managerMap = new Map();
        managers.forEach((i) => managerMap.set(i.value, i.name));
//return a promise
        return new Promise((resolve, reject) => {
            db.query('select e.id, e.first_name, e.last_name, e.manager_id, employee_role.title as title, employee_role.salary, department.name AS deoartment FROM employee e RIGHT JOIN employee_role ON e.role_id = employee_role.id RIGHT JOIN department ON employee_role.department_id = department.id', (err, results) => {//if there is an error
                if (err) {
                    reject(err);
                } else {//if there are results
                    const sortedResults = results.sort((a , b) => a.id - b.id);
                    for (let i of sortedResults) {
                        if (i.manager_id) {
                            i.manager = managerMap.get(i.manager_id);
                            delete i.manager_id;
                        }
                        else {
                            i.manager = 'department lead';
                            delete i.manager_id;
                        };
                    };
                    resolve(sortedResults);
                    //end of else
                };
            });
        });
    };

    // create an employee
    async create(name, role, manager) {

        const employeeExist = await this.checkEmployee(name);
        if (employeeExist || !role || !manager) {
            throw new Error('error creating employee. check for errorP: Employee ID: ${employeeExist} if not null employee already exists. Role ID: ${role} if not number value role does not exists. Manager ID: ${manager} if not number value manager does not exist')
        }
        const splitName = titleCase(name).split(' ');
        const firstName = splitName[0];
        const lastName = splitName[1];
        return new Promise((resolve, reject) => {
            db.query('insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)', [firstName, lastName, role, manager], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                };
            });
        });
    };

    //update an employeeId and roleId
    async update(employeeId, roleId) {
//if the employee ID or role ID is not a number value
        If (!employeeId || !roleId) {
        throw new Error('error updating employee. check for error: Employee ID: ${employeeId} if not number value employee does not exist. Role ID: ${roleId} if not number value role does not exist');
    } //return a promise
    return new Promise((resolve, reject) => {
        db.query('update employee set role_id = ? where id = ?', [roleId, employeeId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            };
        });//end of query
    });
    };
};
//export the classes
module.exports = { Query, Departments, Roles, Employees };