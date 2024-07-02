const sql = require('mysql12');

const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_cms'
    },
    console.log('Connected to the employee_cms database')
)

module.exports = db;