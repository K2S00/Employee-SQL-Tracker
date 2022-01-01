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