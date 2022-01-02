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

// Query budget by department
let queryBudget = function(departmentId) {
    const sql = `SELECT SUM(roles.salary) AS budget
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                WHERE departments.id = ?`;
    
        return new Promise((resolve, reject) => {
             db.query(sql, departmentId, (err, rows) => {
                    if (err) {
                         reject({ message: err.message });
                     }
                    resolve(rows);
                });
            })
        };
