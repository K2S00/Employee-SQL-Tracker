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

// INSERTS role into roles table
let addRole = function(title, salary, departmentId) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    let params = [title, salary, departmentId];
    
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ error: err.message });
            }
            resolve({
                message: '\n Congratulations! You successfully added a role\n',
                data: result
            });
        });
    });
};

// DELETE role from roles table
let deleteRole = function(id) {
    const sql = `DELETE FROM roles WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, id, (err, result) => {
            if (err) {
                reject({ error: err.message });
            }
            resolve({
                message: '\nSuccessfully deleted role\n',
                changes: result.affectedRows,
                id: id
            });
        });
    });
}

// DELETE role from roles table
let deleteRole = function(id) {
    const sql = `DELETE FROM roles WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, id, (err, result) => {
            if (err) {
                reject({ error: err.message });
            }
            resolve({
                message: '\nCongratulations! You successfully deleted role\n',
                changes: result.affectedRows,
                id: id
            });
        });
    });
}

module.exports = {
    queryRoles,
    queryBudget,
    addRole,
    deleteRole
}