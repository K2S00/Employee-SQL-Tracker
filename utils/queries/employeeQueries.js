const db = require ('../../db/connections');

//return employees table query 
let queryEmployees = function() {
    const sql = `SELECT employees.id,
                        employees.first_name,
                        employees.last_name,
                        roles.title
                        department.name AS department
                        roles. salary
                        CONCAT(m.first_name, ' ', m.last_name) AS manager
                    FROM employees
                    LEFT JOIN roles ON employees.role_id = roles.role_id
                    LEFT JOIN departments ON roles.department_id = department.role_id
                    LEFT JOIN employees m ON employees.manager_id = m.id;`;
                   
     return new Promise((resolve, reject) => {
         db.query(sql, (err, rows) => {
            if (err) {
                reject({ message: err.message });
            }
            resolve(rows);
            });
        })
    };
    
    //query for manager 
   // Query employees by Manager
let queryEmployeesByManager = function(managerId) {
    const sql = `SELECT employees.id,
                        employees.first_name,
                        employees.last_name,
                        roles.title,
                        departments.name AS department,
                        roles. salary,
                        CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees m ON employees.manager_id = m.id
                WHERE employees.manager_id = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, managerId, (err, rows) => {
            if (err) {
                reject({ message: err.message });
            }
            resolve(rows);
        });
    })
}; 
// Query employees by department
let queryEmployeesByDepartment = function(departmentId) {
    const sql = `SELECT employees.id,
                        employees.first_name,
                        employees.last_name,
                        roles.title,
                        departments.name AS department,
                        roles. salary,
                        CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees m ON employees.manager_id = m.id
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

// INSERT employee into employee table
let addEmployee = function(firstName, lastName, roleId, managerId) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    let params = [firstName, lastName, roleId, managerId];
    
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ message: err.message });
            }
            resolve({
                message: '\nSuccessfully added employee\n',
                data: result
            });
        });
    });
};

// UPDATE an employee's role
let updateEmployeeRole = function(roleId, employeeId) {
    const sql = `UPDATE employees SET role_id = ?
                 WHERE id = ?`;
    let params = [roleId, employeeId];
    
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ message: err.message });
            }
            else if (!result.affectedRows) {
                reject({
                    message: '\nEmployee not found\n'
                });
            }
            else {
                resolve({
                    message: '\nSuccessfully updated employee role\n',
                    data: result,
                    changes: result.affectedRows
                });
            }
        });
    });
};

// UPDATE an employee's manager
let updateEmployeeManager = function(managerId, employeeId) {
    const sql = `UPDATE employees SET manager_id = ?
                 WHERE id = ?`;
    let params = [managerId, employeeId];
    
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject({ message: err.message });
            }
            else if (!result.affectedRows) {
                reject({
                    message: '\nEmployee not found\n'
                });
            }
            else {
                resolve({
                    message: '\nSuccessfully updated employee manager\n',
                    data: result,
                    changes: result.affectedRows
                });
            }
        });
    });
};

// DELETE employee from employees table
let deleteEmployee = function(id) {
    const sql = `DELETE FROM employees WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(sql, id, (err, result) => {
            if (err) {
                reject({ message: err.message });
            }
            resolve({
                message: '\nSuccessfully deleted employee\n',
                changes: result.affectedRows,
                id: id
            });
        });
    });
}
module.exports = {
    queryEmployees,
    queryEmployeesByManager,
    queryEmployeesByDepartment,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEmployee
}