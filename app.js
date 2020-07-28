//Dependencies/requirements
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//require that does half the work of this project
const render = require("./lib/htmlRenderer");

//output location
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//the employee array that all employees are added to
const employeeArray = new Array();

//questions that are asked every time
const employeeQuestions = [
  { name: "name", message: "Enter employee name:", type: "input" },
  { name: "id", message: "Enter employee ID:", type: "input" },
  {
    name: "email",
    message: "Enter employee email:",
    type: "input",
    validate: function (email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  },
];

//manager specific questions
const managerSpecificQuestions = [
  {
    name: "officeNumber",
    message: "Enter manager office number:",
    type: "input",
    validate: function (officeNumber) {
      var z1 = /^[0-9]*$/;
      return z1.test(officeNumber);
    },
  },
];
//add the manager questions to the employee questions
const managerQuestions = employeeQuestions.concat(managerSpecificQuestions);

//employee specific questions
const engineerSpecificQuestions = [
  {
    name: "githubUsername",
    message: "Enter engineer Github Username:",
    type: "input",
  },
];
//add the engineer questions to the employee questions
engineerQuestions = employeeQuestions.concat(engineerSpecificQuestions);

//intern specific questions
const internSpecificQuestions = [
  { name: "school", message: "Enter intern's school:", type: "input" },
];
//add the intern questions to the employee questions
internQuestions = employeeQuestions.concat(internSpecificQuestions);

//question regarding adding another employee or stopping
const typeOfEmployeeQuestions = [
  {
    name: "addEmployee",
    message: "Which type of employee would you like to add?",
    type: "list",
    choices: ["Engineer", "Intern", "Stop Adding More Employees"],
  },
];

//do at start
async function init() {
  //get questions answers for manager
  console.log("Enter the information about the Manager");
  const managerAnswers = await inquirer.prompt(managerQuestions);
  //create a new manager object called groupManager
  const groupManager = new Manager(
    managerAnswers.name,
    managerAnswers.id,
    managerAnswers.email,
    managerAnswers.officeNumber
  );
  //add groupManager to the employee array
  employeeArray.push(groupManager);
  //add more engineers or interns
  addMoreEmployees();
}

async function addMoreEmployees() {
  //ask which type of employee you are adding
  let addMore = await inquirer.prompt(typeOfEmployeeQuestions);

  //switch case based on answer of addMore
  switch (addMore.addEmployee) {
    //if engineer, ask all the engineer questions and create an engineer object
    case "Engineer":
      console.log("Enter the information about the new Engineer");
      const engineerAnswers = await inquirer.prompt(engineerQuestions);
      const newEngineer = new Engineer(
        engineerAnswers.name,
        engineerAnswers.id,
        engineerAnswers.email,
        engineerAnswers.githubUsername
      );
      //add engineer to employeeArray
      employeeArray.push(newEngineer);
      //ask to add more
      addMoreEmployees();
      break;
    case "Intern":
      //if intern, ask intern questions
      console.log("Enter the information about the new Intern");
      const internAnswers = await inquirer.prompt(internQuestions);
      //create intern object with answers from above
      const newIntern = new Intern(
        internAnswers.name,
        internAnswers.id,
        internAnswers.email,
        internAnswers.school
      );
      //add intern to employee array
      employeeArray.push(newIntern);
      //ask about more employees
      addMoreEmployees();
      break;
    case "Stop Adding More Employees":
      //if no more employees, render
      callRender();
      break;
    default:
      console.log("No switch was found");
      break;
  }
}

//render the html
function callRender() {
  //create html from the render function
  const newHTML = render(employeeArray);

  //write the html to the correct file
  fs.writeFile(outputPath, newHTML, (err) => {
    console.log("HTML Document Generated");
  });
}
//run app.js
init();
