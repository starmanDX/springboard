//.forEach()

function doubleValues(arr) {
    const newArr = [];
    arr.forEach(function (num) {
        newArr.push(num * 2);
    });
    return newArr;
};

function onlyEvenValues(arr) {
    const newArr = [];
    arr.forEach(function (num) {
        if (num % 2 === 0) {
            newArr.push(num);
        };
    });
    return newArr;
};

function showFirstAndLast(arr) {
    const newArr = [];
    arr.forEach(function (str) {
        newArr.push(str[0] + str[str.length - 1])
    });
    return newArr;
};

function addKeyAndValue(arr, key, val) {
    arr.forEach(function (obj) {
        obj[key] = val;
    });
    return arr;
};

function vowelCount(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const newObj = {};
    Array.from(str).forEach(function (letter) {
        if (vowels.indexOf(letter.toLowerCase()) >= 0) {
            if (!newObj[letter.toLowerCase()]) {
                newObj[letter.toLowerCase()] = 1;
            } else {
                newObj[letter.toLowerCase()]++;
            };
        };
    });
    return newObj;
};

//.map()

function doubleValuesWithMap(arr) {
    return arr.map(function (num) {
        return num * 2;
    });
};

function valTimesIndex(arr) {
    return arr.map(function (num) {
        return num * arr.indexOf(num);
    });
};

function extractKey(objArr, key) {
    return objArr.map(function (obj) {
        return obj[key];
    });
};

function extractFullName(objArr) {
    return objArr.map(function (obj) {
        return `${obj['first']} ${obj['last']}`;
    });
};

//.filter()

function filterByValue(objArr, key) {
    return objArr.filter(function (obj) {
        return obj[key] !== undefined;
    });
};

function find(arr, val) {
    return arr.filter(function (num) {
        return num === val;      
    })[0];
};

function findInObj(objArr, key, searchVal) {
    return objArr.filter(function (obj) {
        return obj[key] === searchVal;
    })[0];
};

function removeVowels(str) {
    let vowels = 'aieou';
    return Array.from(str).filter(function (letter) {
        return (vowels.indexOf(letter.toLowerCase()) === -1);
    }).join("").toLowerCase();
};

//.filter().map()

function doubleOddNumbers(arr) {
    return arr.filter(function (num) {
        return num % 2 !== 0;
    }).map(function (num) {
        return num * 2;
    });
};