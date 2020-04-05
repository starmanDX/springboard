// Reduce

// extractValue
// Write a function called extractValue which accepts an array of
// objects and a key and returns a new array with the value of each
// object at the key.

function extractValue(objArr, key) {
    return objArr.reduce(function (accum, nextOb) {
        accum.push(nextObj[key]);
        return accum;
    }, []);
};

// vowelCount
// Write a function called vowelCount which accepts a string and returns
// an object with the keys as the vowel and the values as the number
// of times the vowel appears in the string.This function should be
// case insensitive so a lowercase letter and uppercase letter should count

function vowelCount(str) {
    let vowels = 'aeiou';
    return str.split('').reduce(function (accum, nextLetter) {
        if (vowels.indexOf(nextLetter.toLowerCase()) !== -1) {
            if (accum[nextLetter.toLowerCase()]) {
                accum[nextLetter.toLowerCase()]++;
            } else {
                accum[nextLetter.toLowerCase()] = 1;
            };
        };
        return accum;
    }, {});
};

// addKeyAndValue
// Write a function called addKeyAndValue which accepts an array of
// objects and returns the array of objects passed to it with each 
// object now including the key and value passed to the function.

function addKeyAndValue(objArr, key, value) {
    return objArr.reduce(function (accum, nextObj, ind) {
        accum[ind][key] = value;
        return accum;
    }, objArr);
};

// partition
// Write a function called partition which accepts an array and a
// callback and returns an array with two arrays inside of it.
// The partition function should run the callback function on each
// value in the array and if the result of the callback function
// at that specific value is true, the value should be placed in the
// first subarray.If the result of the callback function at that specific
// value is false, the value should be placed in the second subarray.

function partition(arr, func) {
    return arr.reduce(function (accum, next) {
        if (func(next)) {
            accum[0].push(next);
        } else {
            accum[1].push(next);
        };
        return accum;
    }, [[],[]] );
};