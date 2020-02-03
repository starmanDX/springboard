const scores = [0, 0, 0, 0, 0, 55, 59, 69, 73, 73, 75, 79, 83, 88, 91, 93];

scores.find(function (score) {
    return score > 75;
});

scores.find(function (score) {
    return score !== 0 && score % 2 === 0;
});

const evenScores = scores.filter(function (score) {
    return score % 2 === 0;
});

const firstEven = scores.findIndex(function (score) {
    return score !== 0 && score % 2 === 0;
});

scores.findIndex(function (score) {
    return score > 100; // returns -1
});

function partition(arr, pivot) {
    const pivotIndex = arr.findIndex(function (score) {
        return score > pivot;
    });
    const left = arr.slice(0, pivotIndex);
    const right = arr.slice(pivotIndex);
    return [left, right];
};

function myFind(arr, func) {
    for (let item of arr) {
        if (func(item, arr.indexOf(item), arr)) {
            return item;
        };
    };
};

function myFindIndex(arr, func) {
    for (let item of arr) {
        if (func(item, arr.indexOf(item), arr)) {
            return arr.indexOf(item);
        };
    };
    return -1;
};