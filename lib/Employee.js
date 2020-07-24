// TODO: Write code to define and export the Employee class
//create Employee class
class Employee {
  //create constructor that takes name, id, and email
  constructor(name, id, email) {
    //set properties
    this.name = name;
    this.id = id;
    this.email = email;
    this.getName = function () {
      return this.name;
    };
    //create methods to return info about object
    this.getId = function () {
      return this.id;
    };
    this.getEmail = function () {
      return this.email;
    };
    this.getRole = function () {
      return "Employee";
    };
  }
}

module.exports = Employee;
