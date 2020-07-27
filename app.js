const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = new Array();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
  const managerAnswers = await inquirer.prompt(managerQuestions);
  //create a new manager object called groupManager
  const groupManager = new Manager(
    managerAnswers.name,
    managerAnswers.id,
    managerAnswers.email,
    managerAnswers.officeNumber
  );
  employeeArray.push(groupManager);
  addMoreEmployees();

  //render employeeArray
}

async function addMoreEmployees() {
  let addMore = await inquirer.prompt(typeOfEmployeeQuestions);

  switch (addMore.addEmployee) {
    case "Engineer":
      const engineerAnswers = await inquirer.prompt(engineerQuestions);
      const newEngineer = new Engineer(
        engineerAnswers.name,
        engineerAnswers.id,
        engineerAnswers.email,
        engineerAnswers.githubUsername
      );
      employeeArray.push(newEngineer);
      addMoreEmployees();
      break;
    case "Intern":
      const internAnswers = await inquirer.prompt(internQuestions);
      const newIntern = new Intern(
        internAnswers.name,
        internAnswers.id,
        internAnswers.email,
        internAnswers.school
      );
      employeeArray.push(newIntern);
      addMoreEmployees();
      break;
    case "Stop Adding More Employees":
      console.log(employeeArray);
      callRender();
      break;
    default:
      console.log("No switch was found");
      console.log(addMore[0]);
      break;
  }
}

function callRender() {
  const newHTML = render(employeeArray);
  console.log(newHTML);
  fs.writeFile(outputPath, newHTML, (err) => {
    console.log(err);
  });
}
//run app.js
init();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
