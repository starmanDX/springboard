function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

// module.exports "exports" whatever is passed in
// so it can be used in another file
module.exports = {
    add: add,
    subtract: subtract,
    color: 'purple'
}