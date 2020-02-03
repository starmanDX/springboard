const words = [
    'slaughterhouse',
    'metaphor',
    'antidisestablishmentarianism',
    'pseudoscience',
    'electromagnetism',
    'bamboozled',
    'hydroelectricity'
];

words.some(function (word) {
    return word.length > 25;
});

words.some(function (word) {
    return word.indexOf('hydro') !== -1;
});

words.every(function (word) {
    return word.length >= 5;
});

words.every(function (word) {
    return word.indexOf('e') !== -1;
});

function allStrings(arr) {
    return arr.every(function (el) {
        return typeof el === 'string';
    });
};

function mySome(arr, func) {
    for (let item of arr) {
        if (func(item, arr.indexOf(item), arr)) return true;
    };
    return false;
};

function myEvery(arr, func) {
    for (let item of arr) {
        if (!func(item, arr.indexOf(item), arr)) return false;
    };
    return true;
};