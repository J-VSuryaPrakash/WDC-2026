/*

- This in node environment when is console logged gives a simple empty object - {}
- But why ?
- In Node.js, at the top level of a file, this points to module.exports, not the global object.
- Every file in Node is wrapped inside a function like this:
    (function (exports, require, module, __filename, __dirname) {
            your code here
    });
- so, when you log this at the top level, it refers to module.exports, which is an empty object by default. Hence, you see {} in the console. 

- We can also try console.log(this === module.exports) to confirm that this is indeed referring to module.exports.

In Node.js, each file is treated as a separate module with its own private scope due to the wrapper function. Variables declared using var, let, or const are not accessible outside the file unless explicitly exported.
Unlike older browser scripts where variables attach to the global window object, Node prevents global scope pollution. However, modern browsers using ES modules (type="module") also provide similar module-level scoping.
Example: <script type="module" src="script.js"></script> in HTML allows using import/export and provides module scope, preventing global pollution.
Node enforces modular programming by design, allowing developers to split code into reusable, maintainable modules using require and module.exports.
Additionally, Node provides controlled sharing (only exported values are accessible), module caching (executed once), and built-in dependency management.

In Node.js, module.exports is the actual object that gets exported from a file.
The exports variable is just a reference to module.exports provided for convenience.
As long as we modify exports (e.g., exports.a = 1), it works because both point to the same object.
However, if we reassign exports (e.g., exports = {}), it breaks the reference with module.exports.
After that, any changes to exports are ignored, since Node only returns module.exports.

- In the browser environment, this at the top level refers to the global object, which is the window object. 
- So, when you log this in the browser console, it will show the window object and its properties.

*/

// console.log("This in node environment:",this)

function ranveerOnGlobalStage(){
    return typeof this
}

// console.log("Typeof this when returned from a function:",ranveerOnGlobalStage())

function ranveerOnStrictMode(){
    'use strict'
    return typeof this
}

// console.log("Typeof this in strict mode when returned from a function:",ranveerOnStrictMode())


/*
In JavaScript, this is determined by how a function is called.
When a function is called without any context (plain function call):
In non-strict mode, this defaults to the global object.
In strict mode, there is no default binding, so this is undefined.
Strict mode prevents unintended access or modification of the global object by removing this fallback behavior.

function call style decides this, not the function itself
this is decided by how a function is called, not where it is defined.
Strict mode removes the default fallback to the global object.

*/


function ranveerWithNoStrictMode(){
    return this
}

// console.log(ranveerWithNoStrictMode())

// The function returns the global object because it is called without any context in non-strict mode, which triggers default binding.
// In Node.js, when a function is called normally (without any object context) in non-strict mode, this refers to the global object. 
// This is due to JavaScript’s default binding behavior. In strict mode, this fallback is removed, and this becomes undefined.



const bollywoodFilm = {
    name: "Bajirao Mastani",
    lead: "Ranveer",

    introduce(){
        return `${this.lead} performs in ${this.name}`
    }
}

// console.log(bollywoodFilm.introduce())

const filmDirector = {
    name : "Sanjay Leela Bhansali",
    cast: ["Ranveer", "Deepika", "Priyanka"],

    announceCast (){
        this.cast.forEach((actor) => {
            console.log(`${this.name} introduces ${actor}`)
        })
    }
}

// filmDirector.announceCast()


/*

What is this inside announceCast?
filmDirector.announceCast() - this is a method call, so this inside announceCast refers to filmDirector object.
So here - this === filmDirector

What happens inside forEach?
this.cast.forEach((actor) => {})
Arrow function behavior

Arrow functions DO NOT have their own this
Instead:
They inherit this from their surrounding scope    

So here:
Outer function (announceCast) → this = filmDirector
Arrow function → borrows that same this

So inside the arrow function, this still refers to filmDirector, allowing us to access this.name and this.cast without any issues.

What if we had used a regular function instead of an arrow function inside forEach?
this.cast.forEach(function(actor) {
    console.log(`${this.name} introduces ${actor}`)
})

This is a regular function called without context, so it has its own this.
So:
Non-strict → this = global
Strict → this = undefined

In non-strict mode, this would default to the global object, and in strict mode, it would be undefined.

announceCast gets its this from how it is called (filmDirector.announceCast()), so this refers to filmDirector.
The arrow function inside forEach does not have its own this, so it inherits this from announceCast, which is filmDirector.


If you used a normal function, you could fix it like:

Option: 1

this.cast.forEach(function(actor) {
    console.log(`${this.name} introduces ${actor}`)
}.bind(this))

Option: 2

const self = this;

this.cast.forEach(function(actor) {
    console.log(`${self.name} introduces ${actor}`)
});

*/

const filmSet = {
    crew: "Spot boys",
    prepareProps(){
        console.log(`Outer this.crew: ${this.crew}`)
    
        function arrangeChairs(){
            console.log(`Inner this.crew: ${this.crew}`)
        }

        arrangeChairs()

        const arrangeLights = () => {
            console.log(`Arrow this.crew ${this.crew}`)
        }

        arrangeLights() 
    },
}

filmSet.prepareProps()

// a regular nested function does not inherit this - in the output we see inner this.crew = undefined - because by default the functions are in strict mode

// detached method

const actor = {
    name: "Ranveer",
    bow(){
        return `${this.name} takes a bow`
    }
}

const detachedBow = actor.bow
console.log("Detached bow:", detachedBow())

/*

You copied the function, not the object
Now this function is no longer tied to actor

When you call detachedBow(), it is a plain function call without any context, so this defaults to the global object (or undefined in strict mode).
This is why detachedBow() does not work as expected and returns undefined instead of "Ranveer takes a bow".

this is NOT stored inside the function
It is decided at call time

Detached methods

Lose their original object → become plain functions → lose this

*/

const obj = {
  name: "Surya",
  greet: function () {
    return () => {
      console.log(this.name);
    };
  }
};

const fn = obj.greet();
fn();


// -- Extra Learning --

/*

The problem before arrow functions existed

Before ES6, JavaScript only had regular functions, and this behaved… let’s say unpredictably

const person = {
  name: "Surya",
  greet: function () {
    setTimeout(function () {
      console.log("Hello " + this.name);
    }, 1000);
  }
};

person.greet();

Expected output: Hello Surya
Actual output: Hello undefined

Why this breaks

Inside setTimeout:

function () {
  console.log(this.name);
}

This is a regular function
Called like: fn()
So:
Non-strict → this = global
Strict → this = undefined

How developers fixed it (before arrow functions)

Solution 1: self = this

greet: function () {
  const self = this;

  setTimeout(function () {
    console.log("Hello " + self.name);
  }, 1000);
}

Solution 2: .bind(this)

setTimeout(function () {
  console.log("Hello " + this.name);
}.bind(this), 1000);


Problems with these

- Extra variables (self)
- Verbose (bind)
- Easy to mess up
- Hard to read in nested code

Enter arrow functions (ES6)
Arrow functions were introduced mainly to fix this exact pain.


--- The confusing code again

const obj = {
  name: "Surya",
  greet: () => {
    console.log(this.name);
  }
};

obj.greet();

Output: undefined

Why this breaks

Arrow functions do not have their own this
They inherit this from their surrounding scope
Arrow functions do NOT get this from how they are called
They get this from where they are written

This arrow function is written:

Inside the object
BUT NOT inside a function

So its surrounding scope is:
the top-level scope of the file

What is this at top-level?

In Node.js, this at the top level of a file refers to module.exports, which is an empty object by default. Hence, this.name is undefined.

greet: () => {
  // this is NOT obj
  // this is module.exports (empty object {})
  console.log(this.name);
}


“arrow functions capture 'this' from their surrounding lexical environment”
What is “lexical”?
Means:
Based on where it is written in code, not how it is called

Arrow functions inherit this from their nearest enclosing scope, which can be a function or the top-level scope. 
They do not have their own this and do not depend on how they are called.

Lets consider the following example:

const obj = {
  name: "Surya",
  greet: () => {
    console.log(this.name);
  }
};

Objects do NOT create scope in JavaScript

What creates scope?

Only these create scope:

Functions 
Blocks ({} with let/const(for variables, not this)
Modules 

What JS actually sees

This is just:

// top-level scope
const obj = {};  // object literal, NOT a scope
obj.greet = () => {
  console.log(this.name);
};

Why objects don’t count

Objects are just data structures, not execution contexts.

const obj = {
  x: 10
};

This does NOT create:

new this
new scope
new execution context


*/