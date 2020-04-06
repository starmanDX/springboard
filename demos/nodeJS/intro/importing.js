// // require() sets the module.exports object to a variable.
// // ./ searches for a file in a current directory,
// // without searches within the node_modules directory
// const helpers = require('./importing-helpers.js')

// // the imported object can then be called 
// console.log(helpers.add(1, 2))
// console.log(helpers.subtract(2, 1))
// console.log(helpers.color)

// it's conventional to destructure the helpers object
const {add, subtract, color} = require('./importing-helpers.js')

// the imported object's methods can then be called
// by themselves.
console.log(color)
console.log(subtract(5,2))
console.log(add(5,2))