const numbers = [21, 37, 64, -99, 142];

const negatives = numbers.map(function (num) {
    return num * -1;
});

const todos = [
    {
        id: 1,
        text: 'walk the dog',
        priority: 'high'
    },
    {
        id: 2,
        text: 'walk the chickens',
        priority: 'medium'
    },
    {
        id: 3,
        text: 'feed the cats',
        priority: 'low'
    },
    {
        id: 4,
        text: 'put out the fire in my garage',
        priority: 'very high'
    }
];

const todoText = todos.map(function (todo) {
    return todo.text;
});

const links = Array.from(document.querySelectorAll('a'));
const urls = links.map(function (a) {
    return a.href;
})


const numbers = [1, 3, 5, 7, 9];
function multiply(val) {
    return val * 3;
}

function myMap(arr, func) {
    let newArr = [];
    for (item of arr) {
        newArr.push(func(item, arr.indexOf(item), arr));
    };
    return newArr;
}

const newMap = myMap(numbers, multiply);

const repeatedStrings = myMap(['a', 'b', 'c', 'd', 'e'], function (str, idx) {
    return str.repeat(idx)
})