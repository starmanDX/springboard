function holler() {
    console.log("HELLO!");
};

const whisper = () => {
    console.log("pssst!");
};

function add(x, y) {
    return x + y;
};
function subtract(x, y) {
    return x - y;
};
function multiply(x, y) {
    return x * y;
};
function divide(x, y) {
    return x / y;
};
function power(x, y) {
    return x ** y;
};

const mathFuncs = [add, subtract, multiply, divide, power];

function doMath(num1, num2, mathFunc) {
    return mathFunc(num1, num2);
};

doMath(3, 4, (num1, num2) => {
    console.log(num1 ** num2);
});

doMath(3, 4, power);

function doAllMath(num1, num2, mathFuncs) {
    for (let func of mathFuncs) {
        console.log(func(num1, num2));
    };
};