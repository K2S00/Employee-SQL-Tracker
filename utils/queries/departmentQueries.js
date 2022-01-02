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
let addDepartment = function(params) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;

    return new Promise((resolve, reject) =>{
        db.query(sql, prams, (err,result) =>{
            if (err){
                reject({ error: err.message});
            }
            resolve({
                message: '\n Success! you added a department\n',
                data: result
            });
        });
    });
};

//delete a department from the table 
let deleteDepartment = function(id) {
    const sql = `DELETE FROM departments WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, id, (err, result) => {
            if (err) {
                reject({ message: err.message });
            }
            resolve({
                message: '\nSuccessfully deleted department\n',
                changes: result.affectedRows,
                id: id
            });
        });
    });
}
module.exports = {
    queryDepartments,
    addDepartment,
    deleteDepartment
}