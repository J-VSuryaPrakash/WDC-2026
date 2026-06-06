const prithviraj = {
    name: "Prithviraj",
    generation: "grandfather",
    cookTraditionalDish (){
        return `${this.name} cooks an ancient family recipe.`
    }
}

const raj = Object.create(prithviraj);
raj.name = "Raj";
raj.generation = "father";
raj.runFamilyBusiness = function() {
    return `${this.name} runs the family business.`
}

console.log(raj);

const ranbir = Object.create(raj);

ranbir.name = "Ranbir";
ranbir.generation = "son";
ranbir.directsFilm = function() {
    return `${this.name} directs a blockbuster film.`
}


console.log(ranbir);
console.log(ranbir.cookTraditionalDish());
console.log(ranbir.runFamilyBusiness());
console.log(ranbir.directsFilm());

/*

Object.create() creates a new object and sets its internal prototype (__proto__) to the object that we are passing inside the create method. 
This forms a prototype chain where property lookup happens by traversing upward until the property is found. 
Methods are not copied but accessed through delegation, and this always refers to the calling object.

In JavaScript, objects don’t inherit by copying—they inherit by linking.

*/

Array.prototype.last = function(){
    return this[this.length-1];
}

// console.log([1,2,3,4,5].last())

/*

Every array in JavaScript has its internal prototype (__proto__) pointing to Array.prototype
Array.prototype.last = function() { ... }
Here we are adding the last method to the shared prototype of all arrays.

What happens when you call:
[1,2,3,4,5].last()
JS lookup:
1. array → has last? 
2. array.__proto__ (Array.prototype) → has last?

We are adding a method to Array.prototype, so all array instances can access it through the prototype chain.

*/


/*
-- Extra --

for (let key of [1,2,3]) {
  console.log(key);
}


It logs 1, 2, 3, last

Here we donot expect last to be logged but it does why ?

JS does this:
1. Look at array → "0", "1", "2"
2. Then go to prototype → finds "last"
3. Include it (because it's enumerable)

for...in is designed to iterate over all enumerable properties, not just own properties
Includes:
Own properties 
Prototype properties

for...of
for (let value of arr)
Includes:
Only values
Ignores prototype


Object.keys(arr)
Includes:
Only own properties
Ignores prototype

*/

// implement you own map, reduce, foreach