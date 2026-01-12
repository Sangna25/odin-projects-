import LinkedList  from "./index.js";
const list = new LinkedList();
list.append("dog");
list.append("Cat");
console.log(list.toString());
list.insertAt(2,"Horse","Penguin");
console.log(list.toString());
console.log(list.size());
list.removeAt(1);
console.log(list.toString());
console.log(list.size());
list.pop();
console.log(list.toString());
console.log(list.at(1));
console.log(list.contains('dog'));
console.log(list.findIndex('Horse'));

