// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

//Employee.js is extended to this
const Employee = require("./Employee.js");

//create Manager class extended from Employee class
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    //set properties according to parent class Employee
    super(name, id, email);
    //set unique properties
    this.officeNumber = officeNumber;
  }
  //return the role of Manager
  getRole() {
    return "Manager";
  }
  //return the office number
  getOfficeNumber() {
    return officeNumber;
  }
}

module.exports = Manager;
