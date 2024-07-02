const printTable = require('./formatTable');
const Questions = require('./questions');
const inq = require('inquirer');

// Categories class to get the categories for the user
class Categories{
    constructor(query){
        this.query = query;
    };
// getQuestions method to get the questions for the user
    async getQuestions() {
        if (this.constuctor.name === 'update') {
            return [new Questions('list, 'name, 'enter the employee name you want to add',
             false, await this.query.getEmployeeNameId()).data, new Questions('list', 'role', 'enter the role for the employee', false, await this.query.getRoleNameID()).data];
        };
        // if the constructor is equal to add and the query is equal to departments
        if (this.constructor.name === 'Add' && this.query.constructor.name === 'departments') {
            return new Questions
        }
        }
    }
// export the class
module.exports = Categories;