// Description: This file is the entry point of the app. It starts the app by calling the start function from the prompts.js file.
const exitPromptByKey = require('./helpers/exit');
const start = require('./libs/prompts');

// Exit the app if the user presses Ctrl+C
exitPromptByKey();

// Start the app
start();