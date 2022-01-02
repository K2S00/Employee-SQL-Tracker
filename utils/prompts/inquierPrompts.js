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
            {
                type: "input",
                name: "salary",
                message: "Please enter salary.",
                validate: input => {
                    if (input === '') {
                        return "Please enter a role."
                    }
                    else {
                        return true;
                    }
                }
            }
        ])
        .then(async function(answer) {
            let role = answer.roleName;
            let salary = answer.salary;
            let data = await queryDepartments();
            if (data.length === 0) {
                console.log('\n\nMust add department first\n');
                mainMenu();
            }
            else {
                let departments = [];
                let departmentIds = [];
                data.forEach(element => {
                    departments.push(element.name);
                    departmentIds.push(element.id);
                })
                
                inquirer
                .prompt([
                    {
                        type: "list",
                        name: "department",
                        message: "Please select a department for this role.",
                        choices: departments
                    }
                ])
                .then(async function(answer) {
                    let index = departments.indexOf(answer.department);
                    let departmentId = departmentIds[index];
                    let data = await addRole(role, salary, departmentId);
                    console.log(data.message);
                    mainMenu();
                });
            }   
        });
};

// Inquirer prompt to add an employee
let addEmployeePrompt = function() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter employee's first name.",
                validate: input => {
                    if (input === "") {
                        return "Please enter a first name."
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter employee's last name.",
                validate: input => {
                    if (input === "") {
                        return "Please enter a last name."
                    }
                    else {
                        return true;
                    }
                }
            }
        ])
        .then(async function(answer) {
            
            let firstName = answer.firstName;
            let lastName = answer.lastName;
            let roles = [];
            let roleIds = [];
            let roleData = await queryRoles();
            roleData.forEach(element => {
                roles.push(element.title);
                roleIds.push(element.id);
            });
            roles.push("None");
            roleIds.push(null);

            let managers = [];
            let managerIds = [];
            let managerData = await queryEmployees();
            managerData.forEach(element => {
                let fullName = element.first_name + " " + element.last_name;
                managers.push(fullName);
                managerIds.push(element.id);
            })
            managers.push("None");
            managerIds.push(null);

            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "Please select a role for this employee.",
                        choices: roles
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Please select a manager for this employee.",
                        choices: managers
                    }
                ])
                .then(async function(answer) {
                    let index = roles.indexOf(answer.role);
                    let roleId = roleIds[index];
                    index = managers.indexOf(answer.manager);
                    let managerId = managerIds[index];
                    let data = await addEmployee(firstName, lastName, roleId, managerId);
                    console.log(data.message);
                    mainMenu();
                }); 
        });
};

// Inquirer prompt to delete department
let deleteDepartmentPrompt = async function() {
    let departmentData = await queryDepartments();
    if (departmentData.length === 0) {
        console.log('\n\nNo departments to delete\n');
        mainMenu();
    }
    else {
        let departments = [];
        let departmentIds = [];
        departmentData.forEach(element => {
            departments.push(element.name);
            departmentIds.push(element.id);
        })
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department do you want to delete?",
                    choices: departments
                }
            ])
            .then(async function(answer) {
                let index = departments.indexOf(answer.department);
                let id = departmentIds[index];
                let data = await deleteDepartment(id);
                console.log(data.message);
                mainMenu();            
            });
    }
}

// Inquirer prompt to delete department
let deleteRolePrompt = async function() {
    let roleData = await queryRoles();
    if (roleData.length === 0) {
        console.log('\n\nNo roles to delete\n');
        mainMenu();
    }
    else {
        let roles = [];
        let roleIds = [];
        roleData.forEach(element => {
            roles.push(element.title);
            roleIds.push(element.id);
        })
        inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "Which role do you want to delete?",
                choices: roles
            }
        ])
        .then(async function(answer) {
            let index = roles.indexOf(answer.role);
            let id = roleIds[index];
            let data = await deleteRole(id);
            console.log(data.message);
            mainMenu();
        });
    }
}

// Inquirer prompt to delete department
let deleteEmployeePrompt = async function() {
    let employeeData = await queryEmployees();
    if (employeeData.length === 0) {
        console.log('\n\nNo employees to delete\n');
        mainMenu();
    }
    else {
        let employees = [];
        let employeeIds = [];
        employeeData.forEach(element => {
            let fullName = element.first_name + ' ' + element.last_name;
            employees.push(fullName);
            employeeIds.push(element.id);
        })
        inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee do you want to delete?",
                choices: employees
            }
        ])
        .then(async function(answer) {
            let index = employees.indexOf(answer.employee);
            let id = employeeIds[index];
            let data = await deleteEmployee(id);
            console.log(data.message);
            mainMenu();
        });
    }
}
    
// Inquirer prompt to update employee role
let updateEmployeeRolePrompt = async function() {
    let employeeData = await queryEmployees();
    let roleData = await queryRoles();
    if (employeeData.length === 0) {
        console.log('\n\nPlease add an employee before updating\n');
        mainMenu();
    }
    else if (roleData.length === 0) {
        console.log('\n\nPlease add a role before updating\n');
        mainMenu();
    }
    else {
        let employees = [];
        let employeeIds = [];
        employeeData.forEach(element => {
            let fullName = element.first_name + " " + element.last_name;
            employees.push(fullName);
            employeeIds.push(element.id);
        });
        let roles = [];
        let roleIds = [];
        roleData.forEach(element => {
            roles.push(element.title);
            roleIds.push(element.id);
        });

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee's role would you like to change?",
                    choices: employees
                },
                {
                    type: "list",
                    name: "role",
                    message: "What new role will they have?",
                    choices: roles
                }
            ])
            .then(async function(answer) {
                let index = employees.indexOf(answer.employee);
                let employeeId = employeeIds[index];
                index = roles.indexOf(answer.role);
                let roleId = roleIds[index];
                let data = await updateEmployeeRole(roleId, employeeId);
                console.log(data.message);
                mainMenu();
            });
    }
}

// Inquirer prompt to update employee manager
let updateEmployeeManagerPrompt = async function() {
    
    let employeeData = await queryEmployees();
    if (employeeData.length === 0) {
        console.log('\n\nPlease add an employee before updating\n');
        mainMenu();
    }
    else {
        let employees = [];
        let employeeIds = [];
        employeeData.forEach(element => {
            let fullName = element.first_name + " " + element.last_name;
            employees.push(fullName);
            employeeIds.push(element.id);
        });

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee's manager would you like to change?",
                    choices: employees
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who will be their new manager?",
                    choices: employees
                }
            ])
            .then(async function(answer) {
                let index = employees.indexOf(answer.employee);
                let employeeId = employeeIds[index];
                index = employees.indexOf(answer.manager);
                let managerId = employeeIds[index];
                let data = await updateEmployeeManager(managerId, employeeId);
                console.log(data.message);
                mainMenu();
            });
    }
}

// Inquirer prompt to view employees by manager
let viewEmployeesByManager = async function() {
    let employeeData = await queryEmployees();
    if (employeeData.length === 0) {
        console.log('\n\nNo managers to sort by\n');
        mainMenu();
    }
    else {
        let employees = [];
        let employeeIds = [];
        employeeData.forEach(element => {
            let fullName = element.first_name + ' ' + element.last_name;
            employees.push(fullName);
            employeeIds.push(element.id);
        })
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which manager do you want to view employees by?",
                    choices: employees
                }
            ])
            .then(async function(answer) {
                let index = employees.indexOf(answer.employee);
                let id = employeeIds[index];
                let data = await queryEmployeesByManager(id);
                if (data.length === 0) {
                    console.log(`\n${answer.employee} is no one's manager\n`);
                }
                else {
                    console.table(data);
                }
                mainMenu();
            });
    }
}

// Inquirer prompt to view employees by department
let viewEmployeesByDepartment = async function() {
    let departmentData = await queryDepartments();
    if (departmentData.length === 0) {
        console.log('\n\nNo departments to sort by\n');
        mainMenu();
    }
    else {
        let departments = [];
        let departmentIds = [];
        departmentData.forEach(element => {
            departments.push(element.name);
            departmentIds.push(element.id);
        })
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department do you want to view employees by?",
                    choices: departments
                }
            ])
            .then(async function(answer) {
                let index = departments.indexOf(answer.department);
                let id = departmentIds[index];
                let data = await queryEmployeesByDepartment(id);
                if (data.length === 0) {
                    console.log(`\n${answer.department} has no employees\n`);
                }
                else {
                    console.table(data);
                }
                mainMenu();
            });
    }
}

// Inquirer prompt to view department budget
let viewDepartmentsBudget = async function() {
    let departmentData = await queryDepartments();
    if (departmentData.length === 0) {
        console.log('\n\nNo departments to view\n');
        mainMenu();
    }
    else {
        let departments = [];
        let departmentIds = [];
        departmentData.forEach(element => {
            departments.push(element.name);
            departmentIds.push(element.id);
        })
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "department",
                    message: "Which department do you want to view employees by?",
                    choices: departments
                }
            ])
            .then(async function(answer) {
                let index = departments.indexOf(answer.department);
                let id = departmentIds[index];
                let data = await queryBudget(id);
                if (data.length === 0) {
                    console.log(`\n${answer.department} has no employees\n`);
                }
                else {
                    console.table(data);
                }
                mainMenu();
            });
    }
}

module.exports = mainMenu;

