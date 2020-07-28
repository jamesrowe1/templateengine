// TODO: Write code to define and export the Employee class
//create Employee class
class Employee {
  //create constructor that takes name, id, and email
  constructor(name, id, email) {
    //set properties
    this.name = name;
    this.id = id;
    this.email = email;
  }
  //returns the name
  getName() {
    return this.name;
  }
  //create methods to return info about object
  getId() {
    return this.id;
  }
  //returns the email
  getEmail() {
    return this.email;
  }
  //returns "Employee" as the role
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
