function TataCar(chassisNumber, modelName){
    this.chassisNumber = chassisNumber;
    this.modelName = modelName;
    this.fuelLevel = 100;
}

TataCar.prototype.status = function(){
    return `Chassis Number: ${this.chassisNumber}, Model Name: ${this.modelName}, Fuel Level: ${this.fuelLevel}`;
}

const car1 = new TataCar('MH-101', 'Nexon');
const  car2 = new TataCar('DL-202', 'Harrier');

// console.log(car1.status());
// console.log(car2.status());

// console.log("Type of Prototype: ",typeof TataCar.prototype); // Object

/*

Key idea
prototype is a place where you store properties/methods that should be shared by all instances of a constructor function. 



What the 'new' keyword does:
1. It creates a new empty object.
    const obj = {};
2. It links the prototype of that object to the constructor function's prototype.
    obj.__proto__ = TataCar.prototype;
3. It calls the constructor function with it its 'this' context set to the new object, allowing you to initialize properties on it.
    TataCar.call(obj, 'MH-101', 'Nexon');
    Here the constructor is a function that is called with providing it the context of new object that is created.
    After the function is called whatever the properties that are defined and initialized in the constructor function will be added to the new object.
    obj.chassisNumber = 'MH-101';
    obj.modelName = 'Nexon';
    obj.fuelLevel = 100;
    So now the new object has its own properties that are defined in the constructor function.
4. It returns the new object.

Now the car1 holds the reference to the new object created by the 'new' keyword.
Similarly if any other instance is created using the same constructor function, it will also have its own properties.

Now lets look at the prototype.

The prototype is an object that has properties and methods that are defined and shared among all instances created by the constructor function.
So over here each instance of TataCar will have access to the status method defined on the prototype, but they will not have their own copy of it.
This means that the status method is shared among all instances of TataCar, and it is not duplicated for each instance. 
This is memory efficient because all instances can use the same method without needing to create a new copy for each one.

TataCar.prototype.status = function() { ... }

Only ONE copy exists:

TataCar.prototype → status (single function)
car1 → points to it
car2 → points to it

For suppose if the object has its own property with the same name as the prototype method, 
then it will override the prototype method and the instance will use its own property instead of the prototype method.

new creates an object, links it to prototype, runs constructor with this, and returns the object.

When a new object is created using new, its internal prototype (__proto__) is set to reference the constructor’s prototype (TataCar.prototype). 
This allows the object to access properties and methods defined on the prototype through the prototype chain, without copying them.

*/

function createAutoRickshaw(id, route){
    return {
        id,
        route,
        run(){
            return `Auto Rickshaw ${this.id} is running on route ${this.route}`;
        }
    }
}

const auto1 = new createAutoRickshaw('AR-001', 'Station to Market');
const auto2 = createAutoRickshaw('AR-002', 'Station to Mall');

// console.log(auto1.run());
// console.log(auto2.run());

/*

When a constructor returns an object explicitly, JS does:
“Okay, ignore the object I created, use this returned object instead.”

Just a normal function call
No special this
Directly returns object

Both auto1 and auto2 are identical
Your function returns its own object with its own run method, so new becomes useless here. So they are not sharing the same method.

Returned object is NOT linked to prototype
It’s just a plain object

This function returns a new object directly, so using new has no real effect. 
It behaves like a factory function, and each call creates a separate copy of the run method.

*/

function createCounter(){
    let count = 0;

    return {
        increment(){
            count++;
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1

// here i cannot modify the initial value of count directly, but i can modify it using the increment method.
// In this way we can create private variables in JavaScript using closures.