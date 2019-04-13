class Student {
    fullName: string;

    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }

    greet() {
        return `Hello, ${this.fullName}`;
    }
}

interface Person {
    firstName: string;
    middleInitial: string;
    lastName: string;
}

// 'string' is the return type
function greetUser(person: Person): string {
    return `Hello, ${person.firstName} ${person.middleInitial} ${person.lastName}`;
}

let user = new Student("Bernie", "M.", "Sanders");
console.log(user);
console.log(user.greet());

document.body.innerHTML = greetUser(user);

// Random casting testing stuff, no impact on the html page:
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
console.log(someValue, strLength);
