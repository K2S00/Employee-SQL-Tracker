//npm install inquirer
const inquirer = require('inquirer');
const db = require('../../db/connections');
const cTable = require('console.table');

const { queryDepartments,
        addDepartment,
        deleteDepartment } = require ('../queries/departmentQueries');

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
    inquirer.prompt([
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


    

