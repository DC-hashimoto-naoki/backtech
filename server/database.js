const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'backtech'
});

connection.connect();

connection.query('SHOW databases;', (err, results, fields) => {
    if(err) throw err;
    console.log(results);
});

connection.end();