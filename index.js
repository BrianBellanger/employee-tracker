// PACKAGE REQUIREMENTS
const mysql = require('mysql');
const inquirer = require('inquirer');

// mySQL CONNECTION
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Trance673&',
  database: 'employeesdb',
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
      message: '\n\n\nWelcome to UT Bootcamp Employee Tracker\nCRUD Menu:',
      choices: [
        'Create',
        'Review',
        'Update',
        // 'Delete',
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


                // UPDATE Employee Roles      
                // inquirer
                // .prompt({
                //   name: 'action',
                //   type: 'list',
                //   message: '\n\nUT Bootcamp Employee Tracker\nSelect employee to update:',
                //   choices: []
                // })
                // .then((answer) => {
                //   switch (answer.action) {
                //     case 'Department':
                //       updateDepartment();
                //       break;

                //     case 'Role':
                //       updateRole();
                //       break;

                //     case 'Employee':
                       updateEmployee();
                //       break;

                //     default:
                //       console.log(`Invalid action: ${answer.action}`);
                //       break;
                //   }
                // });
                break;

        // case 'Delete':
        //         // DELETE SubMenu      
        //         inquirer
        //         .prompt({
        //           name: 'action',
        //           type: 'list',
        //           message: '\n\nUT Bootcamp Employee Tracker\nSelect to delete:',
        //           choices: [
        //             'Department',
        //             'Role',
        //             'Employee',
        //             'Return to Main Menu',
        //             'Exit',
        //           ],
        //         })
        //         .then((answer) => {
        //           switch (answer.action) {
        //             case 'Department':
        //               deleteDepartment();
        //               break;

        //             case 'Role':
        //               deleteRole();
        //               break;

        //             case 'Employee':
        //               deleteEmployee();
        //               break;

        //             case 'Return to Main Menu':
        //               start();
        //               break;

        //             case 'Exit':
        //               connection.end();
        //               return;

        //             default:
        //               console.log(`Invalid action: ${answer.action}`);
        //               break;
        //           }
        //         });
        //         break;

        case 'Exit':
          connection.end();
          return;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};



// MENU FUNCTIONS

// Add Department
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
        start();  
      })
    
  })
};

// Add Role
function addRole(){
  console.log("Add a role:");
  //Get department choices
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw (err);
    const deptChoices = res.map((department) => {
      return {
        name: department.name,
        value: department.id
      }
    })
  inquirer
  .prompt([
    {
    type: 'input',
    name: 'roleTitle',
    message: 'Please enter the title of the new role:',
    },
    {
    type: 'input',
    name: 'roleSalary',
    message: 'Please enter the salary of the new role:',
    },
    {
      type: 'list',
      name: 'department',
      message: 'Please select the department for the new role:',
      choices: deptChoices
    },
  ])
  .then((roleInput) => {
    const query = `INSERT INTO role (title, salary, department_id) VALUES ('${roleInput.roleTitle}', '${roleInput.roleSalary}', '${roleInput.department}')`
      connection.query(query, (err, res) => {
        if (err) throw err
        console.log(`\nNew role '${roleInput.roleTitle}' added`);
        start();
        });
    })
  });
};

// Add Employee
function addEmployee(){
  console.log("Add an employee:");
  //Get role choices
  connection.query('SELECT role.id, role.title, department.name FROM role INNER JOIN department ON role.department_id=department.id', (err, res) => {
    if (err) throw (err);
    const roleChoices = res.map((role) => {
      //console.log('current ROLE:  ', role);
      return {
        name: role.title + ' - ' + role.name,
        value: role.id
      }
    })
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw (err);
    const managerChoices = res.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    })
    managerChoices.push("None")
  inquirer
  .prompt([
    {
    type: 'input',
    name: 'empFirst',
    message: 'Please enter the first name of the new employee:',
    },
    {
      type: 'input',
      name: 'empLast',
      message: 'Please enter the last name of the new employee:',
      },
    {
      type: 'list',
      name: 'role',
      message: 'Please select the role for the new employee:',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'mgr',
      message: 'Please select the manager for the new employee:',
      choices: managerChoices
    },
  ])
  .then((empInput) => {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${empInput.empFirst}', '${empInput.empLast}', '${empInput.role}', '${empInput.mgr}')`
      connection.query(query, (err, res) => {
        if (err) throw err
        console.log(`\nNew employee '${empInput.empFirst} ${empInput.empLast}' added`);
        start();
        });
      })
    });
  })
};

// View Department
function viewDepartment(){
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.log("Current Departments:")
    console.table(res);
    start();
  });
};

// View Role
function viewRole(){
  console.log("viewRole");
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.log("Current Roles:")
    console.table(res);
    start();
  });
};

// View Employee
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
    //Get role choices
  connection.query('SELECT role.id, role.title, department.name FROM role INNER JOIN department ON role.department_id=department.id', (err, res) => {
    if (err) throw (err);
    const roleChoices = res.map((role) => {
      //console.log('current ROLE:  ', role);
      return {
        name: role.title + ' - ' + role.name,
        value: role.id
      }
    })
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw (err);
    const empChoices = res.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    })

    // console.log('empChoices', empChoices)
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'emp',
      message: 'Please select the employee to update:',
      choices: empChoices
    },
    {
      type: 'list',
      name: 'role',
      message: 'Please select the new role for the employee:',
      choices: roleChoices
    }
  ])
  .then((empInput) => {
    //console.log(empInput);
    const query = `UPDATE employee SET role_id=${empInput.role} WHERE id=${empInput.emp}`
      connection.query(query, (err, res) => {
        if (err) throw err
        console.log(`\nEmployee Role Updated!`);
        start();
        });
      })
    });
  })
};