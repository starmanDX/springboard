// Rest / Spread Operator Exercises
// In this exercise, you’ ll refactor some ES5 code into ES2015.

// Given this function:

// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function (num) {
//         return num % 2 === 0
//     });
// }

// Refactor it to use the rest operator & an arrow function:
const filterOutOdds = (...args) => {
    return args.filter((num) => {
        return num % 2 === 0;
    })
};


// findMin
// Write a function called findMin that accepts a variable number
// of arguments and returns the smallest argument.
// Make sure to do this using the rest and spread operator.

const findMin = (...args) => Math.min(...args);

findMin(1, 4, 12, -3) // -3
findMin(1, -1) // -1
findMin(3, 1) // 1

// mergeObjects
// Write a function called mergeObjects that accepts two objects
// and returns a new object which contains all the keys and values
// of the first object and second object.

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2})

mergeObjects({
    a: 1,
    b: 2
}, {
    c: 3,
    d: 4
}) // {a:1, b:2, c:3, d:4}

// doubleAndReturnArgs
// Write a function called doubleAndReturnArgs which accepts an array
// and a variable number of arguments.The function should return a new
// array with the original array values and all of additional arguments
// doubled.

const doubleAndReturnArgs = (arr, ...rest) => (
    [...arr, ...rest.map((num) => num * 2)]
)
doubleAndReturnArgs([1, 2, 3], 4, 4) // [1,2,3,8,8]
doubleAndReturnArgs([2], 10, 4) // [2, 20, 8]

// Slice and Dice!
// For this section, write the following functions using rest, spread
// and refactor these functions to be arrow functions!

/** remove a random element in the items array
and return an array without that item. */

const removeRandom = (items) => {
    let index = Math.floor(Math.random() * items.length);
    return [...items.slice(0, index), ...items.slice(index + 1)];
}

/** Add every item in array2 to array1. */

const extend = (array1, array2) => [...array1, ...array2]

/** Add a new key/val to an object. */

const addKeyVal = (obj, key, val) => ({...obj, [key]:val})


/** Remove a key from an object. */

const removeKey = (obj, key) => {
    ({ [key]: undefined, ...obj } = obj);
    return obj;
} 


/** Combine two objects. */

const combine = (obj1, obj2) => ({...obj1, ...obj2})


/** Update an object, changing a key/value. */

const update = (obj, key, val) => ({ ...obj, [key]: val })