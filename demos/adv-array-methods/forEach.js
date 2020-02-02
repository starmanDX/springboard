const colors = ['teal', 'cyan', 'peach', 'purple'];

function yell(val, i) {
    const caps = val.toUpperCase();
    console.log(`At index ${i}, ${caps}`)
};

colors.forEach(function (val) {
    console.log(val.toUpperCase());
});

colors.forEach(yell);

const prices = [30.99, 19.99, 2.50, 99.00];
let total = 0;

prices.forEach(function (price) {
    total += price;
});
console.log(total)

function myForEach(arr, func) {
    for (item of arr) {
        func(item, arr.indexOf(item), arr);
    };
};

myForEach(colors, yell, colors);

colors.forEach(function (color, i) {
    console.log(color.toUpperCase(), 'at index of:', i);
});