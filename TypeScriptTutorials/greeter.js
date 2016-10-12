var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    Student.prototype.greet = function () {
        return "Hello, " + this.fullName;
    };
    return Student;
}());
// 'string' is the return type
function greetUser(person) {
    return "Hello, " + person.firstName + " " + person.middleInitial + " " + person.lastName;
}
var user = new Student("Bernie", "M.", "Sanders");
console.log(user);
console.log(user.greet());
document.body.innerHTML = greetUser(user);
// Random casting testing stuff, no impact on the html page:
var someValue = "this is a string";
var strLength = someValue.length;
console.log(someValue, strLength);
