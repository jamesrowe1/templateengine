// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

//Employee.js is extended to this
const Employee = require("./Employee.js");

//create Manager class extended from Employee class
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.getRole = function () {
      return "Intern";
    };
    this.getSchool = function () {
      return school;
    };
  }
}

module.exports = Intern;
