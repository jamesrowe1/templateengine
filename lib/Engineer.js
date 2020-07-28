// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

//Employee.js is extended to this
const Employee = require("./Employee.js");

//create Manager class extended from Employee class
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  //return Engineer's github username
  getGithub() {
    return this.github;
  }
  //return role of Engineer
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
