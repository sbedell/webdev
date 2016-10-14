// Demonstrating "protected"
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function () {
    function Person(theName) {
        this.name = theName;
    }
    return Person;
}());
// Employee can extend Person
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        _super.call(this, name);
        this.department = department;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee;
}(Person));
var howard = new Employee("Howard", "Sales");
var john = new Person("John"); // Error: The 'Person' constructor is protected
