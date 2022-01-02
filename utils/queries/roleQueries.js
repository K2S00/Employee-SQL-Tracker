const db = require('../../db/connections');

//query & return roles table
let queryRoles = function() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department
                 FROM roles
                 INNER JOIN departments ON roles.department_id = departments.id`;

    
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
             }
            resolve(rows);
        });
    })
};