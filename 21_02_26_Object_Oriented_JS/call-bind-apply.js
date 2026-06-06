function cookDish(ingredients, style){

    return `${this.name} prepares ${ingredients} in ${style} style!`

}

const sharmaKitchem = {name: "Sharma jis Kitchen"}
const guptaKitchem = {name: "Gupta jis Kitchen"}

// console.log(cookDish.call(sharmaKitchem, "Paneer and spices", "Indian"))

const guptaOrder = ["Chicken and herbs", "Italian"]

// console.log(cookDish.apply(guptaKitchem, guptaOrder))

const bills = [100, 200, 300, 400, 500]

Math.max.apply(null, bills);

Math.max(...bills)


/*

We use call and apply to explicitly set the this context of a function so it can access properties of a given object.

This function depends on this.name
So we must provide this manually

call() → arguments passed individually - reportDelivery.call(deliveryBoy, "Mumbai", "Ordered")

apply() → arguments passed as they are combined in one object, typically an array - reportDelivery.apply(deliveryBoy, ["Delhi", "Delivered"])

*/

function hello(){
    console.log(this)
}

// hello.apply(null)


/*

hello.call(null) or hello.apply(null) means that 

You gave me nothing (null/undefined), I’ll use global object becuase i not provided with any context so I will use global object as default context

In browser, global object is window
In node, global object is global


When 'strict mode' is enabled, if you call a function with null or undefined as the this value, 
it will not default to the global object. Instead, it will remain null or undefined. 
This is because strict mode does not allow the this keyword to default to the global object.

*/


function sayHello(){
    console.log(this)
}

sayHello.call("Hello!")
console.log(new String("Hello!"))

/*

You pass a primitive value

Non-strict mode
JS converts it to object:

"hello" → new String("hello"), therefore - this → String object

Strict mode
there is no conversion
this === "hello"

In strict mode, JS just says no guessing just use what is exactly passed as 'this' value

*/

function reportDelivery(location, status){
    return `${this.name} reports delivery at ${location} with status: ${status}`
}

const deliveryBoy = {name: "Ranveer"}

// console.log("Call: ",reportDelivery.call(deliveryBoy, "Mumbai", "Ordered"))
// console.log("Apply: ",reportDelivery.apply(deliveryBoy, ["Delhi", "Delivered"]))
// console.log("Bind: ",reportDelivery.bind(deliveryBoy, "Bangalore", "In Transit"))

const bindReport = reportDelivery.bind(deliveryBoy, "Bangalore")
console.log(bindReport("In Transit"))

/*

bind() sets the this context and optionally pre-fills arguments, but instead of executing immediately, it returns a new function that can be called later.

*/

const profile1 = {
    name: "Surya",
    age: 21
}

function introduce(greeting){
    return `${greeting}, I am ${this.name} and I am ${this.age} years old.`
}

const profile2 = {
    name: "Ranveer",
    age: 22
}

const introduceSurya = introduce.bind(profile1, "Hello")

console.log(introduceSurya.call(profile2, "Hi"))
console.log(introduceSurya.apply(profile2, ["Hey"]))

/*

Here, function created by bind has its this permanently locked to the object passed to bind, and it cannot be overridden by call or apply.

Even though we try to override the this context using call and apply.
JS says - “Nope. This function is already bound. I will ignore your call/apply.”

"Hi" or "Hey" you pass later is ignored because:
First argument already fixed
Extra args don’t replace existing ones

When a function is created using bind, its this is permanently set and cannot be overridden using call or apply. 
Even if we try to change the context later, the bound this takes precedence. 
Additionally, arguments passed during binding are fixed and cannot be replaced.

bind beats call and apply—once bound, always bound.
*/