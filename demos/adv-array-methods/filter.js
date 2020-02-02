const words = [
    'slaughterhouse',
    'metaphor',
    'antidisestablishmentarianism',
    'pseudoscience',
    'electromagnetism',
    'bamboozled',
    'immunobiology',
    'hydroelectricity'
];

const longWords = words.filter(function (word) {
    return word.length >= 20;
});

const aWords = words.filter(function (word) {
    return word[0] === 'a';
});

const containsLetterT = function (word) {
    for (let char of word) {
        if(isLetterT(char)) return true;
    };
    return false;
};

const isLetterT = function (char) {
    return char === 't';
};

const noLetterT = words.filter(function (word) {
    return !contansLetterT(word);
});

const noLetterT = words.filter(!containsLetterT);

function myFilter(arr, func) {
    let newArr = [];
    for (item of arr) {
        if (func(item, arr.indexOf(item), arr)) {
            newArr.push(item);
        };
    };
    return newArr;
};