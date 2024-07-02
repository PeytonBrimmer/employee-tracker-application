const { Console } = require('console');
const { Transform } = require('stream');
// printTable function to print the table

//edit the printTable function to take in the data and the headers
const table = (input) => {
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } });
    const logger = new Console({ stdout: ts });
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = ''; // loop through the table and replace the characters
    for (let row of table.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, '┌');
        r = r.replace(/^├─*┼/, '├');
        r = r.replace(/│[^│]*/, '');
        r = r.replace(/^└─*┴/, '└');
        r = r.replace(/'/g, ' ');
        result += `${r}\n`;
    } // return the result
    console.log(result);
};

module.exports = table;
// export the printTable function