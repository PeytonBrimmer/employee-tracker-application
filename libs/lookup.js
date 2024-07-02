const { View, Add, Update } = require('./categories');
const { Departments, Roles, Employees } = require('./queries');
//import the View, Add, and Update classes from the categories file
//creates a lookup map to map our choices to a new action and query
const choices = () => {
    const map = new Map()//create a new map
    map.set('View Departments', new View(new Departments));
    map.set('View Roles', new View(new Roles));
    map.set('View Employees', new View(new Employees));
    map.set('Add Department', new Add(new Departments))
    map.set('Add Employee Role', new Add(new Roles));
    map.set('Add Employee', new Add(new Employees));
    map.set('Update Employee Role', new Update(new Employees));
    return map;
};

//export the choices function
module.exports = choices;