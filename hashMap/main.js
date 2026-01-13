import { HashMap } from "./index.js";
const test = new HashMap();
test.set('a','red');
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden');
// console.log(test.length())
// console.log(test.entries());
test.set('lion', 'brown');
// console.log(test.entries());
// console.log(test.length());
test.set('moon', 'silver')
// console.log(test.length());
// let lion = test.get('lion');
// console.log(lion);
// console.log(test.has('hat'));
// console.log(test.keys() + console.log(test.values()))
console.log(test.remove('hat')); // true cause key is present 
console.log(test.remove('cat')) // if not present removes false 
console.log(test.length());
test.remove('lion');
console.log(test.length())
console.log(test.clear());
