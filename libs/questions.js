// Export a class that will be used to create questions for inquirer
class Questions {
    constructor(type, name, message, validate, choices = []) {
        if (validate = true) {
            this.data = {
            type: type, 
            name: name,
            message: message,
            validate: (input) => {
                if (input.length > 30) {
                    console.log("Please enter a shorter name Max 30 characters");
                    return false;
                }
                else if (input.length < 1) {
                    console.log("Please enter a name");
                    return false;
                }
                else {
                    return true;
                };
            }
        };// If no validation is required, add the data object without the validate key
    } else {
        this.data = {
        type: type, 
        name: name,
        message: message,
    };
};
// If choices are provided, add them to the data object
if (choices.length > 0) {
    this.data = {
        type: type, 
        name: name,
        message: message,
        choices: choices
            };
        };
    };
};
// Export the class
module.exports = Questions;