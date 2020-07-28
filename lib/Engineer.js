// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

//Employee.js is extended to this
const Employee = require("./Employee.js");

//create Manager class extended from Employee class
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    this.getRole = function () {
      return "Engineer";
    };
    this.getGithub = function () {
      return this.github;
    };
  }
}

module.exports = Engineer;
