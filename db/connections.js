const mysqul = require('mysql2');

const db =mysqul.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Br!ggsR!dleyR0nan',
        database: 'employees'
    }

);
module.exports = db;