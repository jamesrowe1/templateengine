// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

//Employee.js is extended to this
const Employee = require("./Employee.js");

//create Manager class extended from Employee class
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
}
