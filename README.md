## 1️⃣ What is the difference between var, let, and const?

Ans: var, let, and const are used to declare variables in JavaScript.

var is the old way of declaring variables. It can be redeclared and updated,and it has function scope.

let is a newer way to declare variables. It can be updated but cannot be redeclared in the same scope. It has block scope.

const is used to declare variables whose value should not change. It cannot be updated or redeclared and also has block scope.

## 2️⃣ What is the spread operator (...)?

Ans: The spread operator ... is used to expand elements of an array or object. It helps to copy or combine arrays or objects easily.
Example:
let arr1 = [1,2,3];
let arr2 = [...arr1,4,5];
Here the values of arr1 are spread into arr2.

## 3️⃣ What is the difference between map(), filter(), and forEach()?

Ans: map() is used to create a new array by applying a function to each element of the original array.

filter() is used to create a new array that contains only the elements that satisfy a certain condition.

forEach() is used to run a function on each element of an array, but it does not return a new array.

## 4️⃣ What is an arrow function?

Ans: An arrow function is a shorter way to write functions in JavaScript. It uses the => symbol.

Example:const add = (a,b) => a + b;
It works like a normal function but the syntax is shorter.

## What are template literals
Ans: Template literals are used to create strings easily and to insert variables inside strings. They use backticks ` ` instead of quotes.

Example: 
let name = "Nijum";
let text = `My name is ${name}`;
This allows us to add variables directly inside the string.

