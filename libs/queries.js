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

async create(name) {
    const departmentExist = await this.checkDepartment(name);
}