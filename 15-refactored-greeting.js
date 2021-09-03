// https://www.codewars.com/kata/5121303128ef4b495f000001/javascript
// Solution 1

class Person {
    constructor(name) {
        this.name = name;
    }
    greet(yourName) {
        return "Hello " + yourName + ", my name is " + this.name;
    }
}

// Solution 2

function Person(name) {
    this.name = name;
    function greet(yourName) {
        return "Hello " + yourName + ", my name is " + this.name;
    }
    return {
        name: this.name, 
        greet: greet
    }
}