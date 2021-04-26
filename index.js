// PACKAGE REQUIREMENTS
const mysql = require('mysql');
const inquirer = require('inquirer');

// mySQL CONNECTION
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Trance673&',
  database: 'employeesDB',
});

// ESTABLISH CONNECTION
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});

// MENU FUNCTION
const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: '\n\n\nWelcome to UT Bootcamp Employee Tracker\nMain Menu:',
      choices: [
        'Create',
        'Review',
        'Update',
        'Delete',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Create':
                // ADD SubMenu      
                inquirer
                .prompt({
                  name: 'action',
                  type: 'list',
                  message: '\n\nUT Bootcamp Employee Tracker\nCreate a new:',
                  choices: [
                    'Department',
                    'Role',
                    'Employee',
                    'Return to Main Menu',
                    'Exit',
                  ],
                })
                .then((answer) => {
                  switch (answer.action) {
                    case 'Department':
                      addDepartment();
                      break;

                    case 'Role':
                      addRole();
                      break;

                    case 'Employee':
                      addEmployee();
                      break;

                    case 'Return to Main Menu':
                      start();
                      break;

                    case 'Exit':
                      connection.end();
                      return;

                    default:
                      console.log(`Invalid action: ${answer.action}`);
                      break;
                  }
                });
          break;

        case 'Review':
                // VIEW SubMenu      
                inquirer
                .prompt({
                  name: 'action',
                  type: 'list',
                  message: '\n\nUT Bootcamp Employee Tracker\nSelect to view:',
                  choices: [
                    'Department',
                    'Role',
                    'Employee',
                    'Return to Main Menu',
                    'Exit',
                  ],
                })
                .then((answer) => {
                  switch (answer.action) {
                    case 'Department':
                      viewDepartment();
                      break;

                    case 'Role':
                      viewRole();
                      break;

                    case 'Employee':
                      viewEmployee();
                      break;

                    case 'Return to Main Menu':
                      start();
                      break;

                    case 'Exit':
                      connection.end();
                      return;

                    default:
                      console.log(`Invalid action: ${answer.action}`);
                      break;
                  }
                });
                break;
          

        case 'Update':
                // UPDATE SubMenu      
                inquirer
                .prompt({
                  name: 'action',
                  type: 'list',
                  message: '\n\nUT Bootcamp Employee Tracker\nSelect to update:',
                  choices: [
                    'Department',
                    'Role',
                    'Employee',
                    'Return to Main Menu',
                    'Exit',
                  ],
                })
                .then((answer) => {
                  switch (answer.action) {
                    case 'Department':
                      updateDepartment();
                      break;

                    case 'Role':
                      updateRole();
                      break;

                    case 'Employee':
                      updateEmployee();
                      break;

                    case 'Return to Main Menu':
                      start();
                      break;

                    case 'Exit':
                      connection.end();
                      return;

                    default:
                      console.log(`Invalid action: ${answer.action}`);
                      break;
                  }
                });
                break;

        case 'Delete':
                // DELETE SubMenu      
                inquirer
                .prompt({
                  name: 'action',
                  type: 'list',
                  message: '\n\nUT Bootcamp Employee Tracker\nSelect to delete:',
                  choices: [
                    'Department',
                    'Role',
                    'Employee',
                    'Return to Main Menu',
                    'Exit',
                  ],
                })
                .then((answer) => {
                  switch (answer.action) {
                    case 'Department':
                      deleteDepartment();
                      break;

                    case 'Role':
                      deleteRole();
                      break;

                    case 'Employee':
                      deleteEmployee();
                      break;

                    case 'Return to Main Menu':
                      start();
                      break;

                    case 'Exit':
                      connection.end();
                      return;

                    default:
                      console.log(`Invalid action: ${answer.action}`);
                      break;
                  }
                });
                break;

        case 'Exit':
          return;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};



// MENU FUNCTIONS

function addDepartment(){
  console.log("Add a department:");
  inquirer
  .prompt([
    {
    type: 'input',
    name: 'deptName',
    message: 'Please enter the name of the new department:',
    },
  ])
  .then((deptInput) => {
    const query = `INSERT INTO department (name) VALUES ('${deptInput.deptName}')`
      connection.query(query, (err, res) => {
        if (err) throw err
        console.log(`\nNew department '${deptInput.deptName}' added`);
        })
    start();
  })
};

function addRole(){
  console.log("addRole");
};

function addEmployee(){
  console.log("addEmployee");
};

function viewDepartment(){
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.log("Current Departments:")
    console.table(res);
    start();
  });
};

function viewRole(){
  console.log("viewRole");
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.log("Current Roles:")
    console.table(res);
    start();
  });
};

function viewEmployee(){
  console.log("viewEmployee");
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.log("Current Employees:")
    console.table(res);
    start();
  });
};

function updateDepartment(){
  console.log("updateDepartment");
};

function updateRole(){
  console.log("updateRole");
};

function updateEmployee(){
  console.log("updateEmployee");
};