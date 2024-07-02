const inq = require('inquirer');
const lookupTable = require('./lookup');

//prompts for returning to main menu
    const returnPrompt = {
        type: 'confirm',
        name: 'restart',
        message: 'Would you like to return to the main menu?',
        default: true
    };

    //prompt for main menu
    const menu = {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    };

    //function for input true or false 
    const returnToMain = (input) => {
        if (!input) {
            console.log('exiting program');
            return process.exit();
        }
        return mainMenu();
}

//define lookup table, then see if the user option is in the table which then calls the options action, then propmts the user to return to the main menu    
const mainMenu = async () => {
    const map = lookupTable();
    const choice = await inq.prompt(menu);
    const action = map.get[choice.mainMenu];
    try{
        await action.run();
    }

//catch error and return to main menu
catch (e) {
    console.log(e);
    console.log('Error, e.message');
};
const input = await inq.prompt(returnPrompt);
returnToMain(input.restart);
};

module.exports = mainMenu;
// Path: libs/lookup.js