const db = require('../../db/connections');

//query/return deparment table 
let queryDepartments = function() {
    const sql = `SELECT * FROM departments`;

    return new Promise((resolve, reject) => {
        db,query(sql, (err, rows) =>{
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    })
};

//inserts into department table 
