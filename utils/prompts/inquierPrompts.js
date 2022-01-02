const inquirer = require('inquirer');
const db = require('../../db/connections');
const cTable = require('console.table');
const { queryDepartments,
        addDepartment,
        deleteDepartment } = require('../queries/departmentQueries');
const { queryRoles,
        queryBudget,
        addRole,
        deleteRole } = require('../queries/roleQueries');
const { queryEmployees,
        queryEmployeesByManager,
        queryEmployeesByDepartment,
        addEmployee,
        updateEmployeeRole,
        updateEmployeeManager,
        deleteEmployee } = require('../queries/employeeQueries');

let mainMenu = async function() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "mainMenu",
                message: "Main Menu",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Delete a department",
                    "Delete a role",
                    "Delete an employee",
                    "Update an employee role",
                    "Update an employee manager",
                    "View employees by manager",
                    "View employees by department",
                    "View department budget",
                    "Exit"
                ]
            }
        ])
        .then(async function(answer) {          
            switch (answer.mainMenu) {
                case 'View all departments':
                    let departmentData = await queryDepartments();
                    if (departmentData.length === 0) {
                        console.log('\nThere are currently no departments\n');
                    }
                    else {
                        console.table(departmentData);
                    }
                    mainMenu();
                    break;
                case 'View all roles':
                    let roleData = await queryRoles();
                    if (roleData.length === 0) {
                        console.log('\nThere are currently no roles\n');
                    }
                    else {
                        console.table(roleData);
                    }
                    mainMenu();
                    break;
                case 'View all employees':
                    let employeeData = await queryEmployees();
                    if (employeeData.length === 0) {
                        console.log('\nThere are currently no employees\n');
                    }
                    else {
                        console.table(employeeData);
                    }
                    mainMenu();
                    break;
                case 'Add a department':
                    addDepartmentPrompt();
                    break;
                case 'Add a role':
                    addRolePrompt();
                    break;
                case 'Add an employee':
                    addEmployeePrompt();
                    break;
                case 'Delete a department':
                    deleteDepartmentPrompt();
                    break;
                case 'Delete a role':
                    deleteRolePrompt();
                    break;
                case 'Delete an employee':
                    deleteEmployeePrompt();
                    break;
                case 'Update an employee role':
                    updateEmployeeRolePrompt();
                    break;
                case 'Update an employee manager':
                    updateEmployeeManagerPrompt();
                    break;
                case 'View employees by manager':
                    viewEmployeesByManager();
                    break;
                case 'View employees by department':
                    viewEmployeesByDepartment();
                    break;
                case 'View department budget':
                    viewDepartmentsBudget();
                    break;
                case 'Exit':
                    db.end();
            }
        });
};

// Inquirer prompt; add a department
let addDepartmentPrompt = function() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "Please enter new department.",
                validate: input => {
                    if (input === '') {
                        return "Please enter a department."
                    }
                    else {
                        return true;
                    }
                }
            }
        ])
        .then(async function(answer) {
            let data = await addDepartment(answer.departmentName);
            console.log(data.message);
            mainMenu();
        });
};

// Inquirer prompt to add a role
let addRolePrompt = function() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleName",
                message: "Please enter new role.",
                validate: input => {
                    if (input === '') {
                        return "Please enter a role."
                    }
                    else {
                        return true;
                    }
                }
            },

