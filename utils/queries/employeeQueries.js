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