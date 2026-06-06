const aadhar_of_mayur = Symbol("aadhar");
const aadhar_of_rahul = Symbol("aadhar");

console.log(typeof aadhar_of_mayur);
// Symbol is a primitive data type in JavaScript, used to create unique identifiers for object properties. Each symbol is unique, even if they have the same description.
console.log(aadhar_of_mayur === aadhar_of_rahul);
// Every symbol is unique—even if description is same
console.log(aadhar_of_mayur.toString());
console.log(aadhar_of_mayur.description);
// .description is just a label for the symbol, it does not affect the uniqueness of the symbol. It is used for debugging purposes to provide a human-readable description of the symbol.

const nonIndian = Symbol();

console.log(nonIndian.description);

const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenRecord = {
  name: "Surya",
  age: 21,
  [biometricHash]: "gq490jsdf4gv9fw20",
  [bloodGroup]: "A+",
};

console.log(Object.keys(citizenRecord));

// Why the symbol properties are not showing up in the keys of the object? Because they are not enumerable.
// Symbols are non-enumerable in common operations 
// They are:
// Hidden from Object.keys()
// Hidden from for...in
// Hidden from JSON.stringify()
// They are hidden from the normal enumeration of the object properties.

console.log(Object.getOwnPropertySymbols(citizenRecord));
// Inorder to access the symbol properties, we can use Object.getOwnPropertySymbols() method which returns an array of all symbol properties found directly upon a given object.
console.log(aadhar_of_mayur.valueOf());


// Advanced use case of Symbol: Custom Iterators and Custom Type Conversion

const rtiQuery = {
  queries: ["Infra Budget", "Education Budget", "Startup laws", "Ration Card"],
  
  [Symbol.iterator]() {
    let index = 0;
    const queries = this.queries;
    return {
      next() {
        if (index < queries.length) {
          return {value: queries[index++], done: false};
        }
        return {value: undefined, done: true};
      }
    }
  }

};

for (const query of rtiQuery) {
  // TypeError: rtiQuery is not iterable
  console.log(query);
}

const governmentSchemes = {
    name: "PM Kisan Yojana",
    people: 54,
    [Symbol.toPrimitive](hint) {
        if (hint === "string") {
            return this.name;
        } if (hint === "number") {
            return 100;
        }
    }
}


console.log(+governmentSchemes); // 54
console.log(`${governmentSchemes}`); // PM Kisan Yojana