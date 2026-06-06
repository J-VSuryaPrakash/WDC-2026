class Cricketer{
    constructor(name, role){
        this.name = name;
        this.role = role;
        this.matchesPlayed = 0;
        this.stamina = 100;
    }

    introduce(){
        return `Hi, I'm ${this.name} and I play as a ${this.role} | Matches Played: ${this.matchesPlayed} | Stamina: ${this.stamina}`;
    }
}


const player1 = new Cricketer("Virat", "Batsman");
const player2 = new Cricketer("Jadeja", "All-rounder");

console.log(player1.hasOwnProperty("name"));
console.log(player1.hasOwnProperty("introduce"));

console.log(typeof Cricketer)
console.log(typeof player1)

/*

This class is just syntactic sugar over prototypes

It roughly becomes:

function Cricketer(name, role){
    this.name = name;
    this.role = role;
    this.matchesPlayed = 0;
    this.stamina = 100;
}

Cricketer.prototype.introduce = function(){
    return `Hi, I'm ${this.name}...`;
}

Properties defined inside the constructor become own properties of the instance, while methods defined in the class body are stored on the prototype. 
Therefore, hasOwnProperty returns true for instance properties but false for prototype methods.
hasOwnProperty() checks only the object itself, not the prototype chain
Class methods live on the prototype, not inside each object.



*/


class Debutant{
    constructor(name){
        this.name = name;
        this.walkOut = () => {
            return `${this.name} is walking out to the field for his debut match!`;
        };
    }
}

const debutant1 = new Debutant("Rohit");
const debutant2 = new Debutant("Shubman");
const somthingFromLastClass = debutant1.walkOut;
console.log(somthingFromLastClass());
console.log(debutant1.walkOut === debutant2.walkOut); 

/*
walkOut is defined inside the constructor
That means:
It becomes an own property of each instance, not a prototype method

debutant1 = {
  name: "Rohit",
  walkOut: (function)   ← own copy
}

debutant2 = {
  name: "Shubman",
  walkOut: (function)   ← another copy
}

Normally:
const fn = obj.method;
fn(); - loses this

But here:
walkOut is an arrow function
Arrow functions capture this from where they are created

console.log(debutant1.walkOut === debutant2.walkOut); 
Output: false
Each instance gets its own function
They are different function objects in memory

When a method is defined as an arrow function inside the constructor, each instance gets its own copy of the function, and this is lexically bound to that instance. 
This allows the function to work even when detached, but it increases memory usage compared to prototype methods.



*/

/*

-- Extra --

class Debutant{
    constructor(name){
        this.name = name;
        this.walkOut = function() {
            return `${this.name} is walking out to the field for his debut match!`;
        };
    }
}

const debutant1 = new Debutant("Rohit");
const somthingFromLastClass = debutant1.walkOut;
console.log(somthingFromLastClass());

In this case, walkOut is a regular function defined inside the constructor. Each instance gets its own copy of the function, but it is not an arrow function.
When the function is detached and called independently, it loses its object context, causing this to become undefined.

A regular function does not inherit this from its parent scope; instead, its this depends on how it is called.

*/