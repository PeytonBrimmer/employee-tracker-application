const readline = require('readline');
const mainMenu = require('../libs/prompts');

const keyexit = () => {
  readline.emitKeypressEvents(process.stdin);
  console.log('use ESC to exit');
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  };

  process.stdin.on('keypress', (chunk, key) => {
    if (key && key.name == 'escape') 
      process.exit();
    });
    };

module.exports = keyexit;