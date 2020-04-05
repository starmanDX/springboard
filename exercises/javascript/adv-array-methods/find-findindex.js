// Find / Findindex

// findUserByUsername
// Write a function called findUserByUsername which accepts an array of objects, each with a key of username, and a string.The
// function should return the first object with the key of username that matches the string passed to the
// function.If the object is not found, return undefined.

function findUserByUsername(objArr, str) {
    return objArr.find(function (obj) {
        return obj.username === str;
    });
};

// removeUser
// Write a function called removeUser which accepts an array of objects, each with a key of username, and a string.The
// function should remove the object from the array.If the object is not found,
// return undefined.

function removeUser(objArr, str) {
    const sliceIndex = objArr.findIndex(function (obj) { 
        return obj.username === str;
    });
    if (sliceIndex === -1) return;
    return objArr.splice(sliceIndex, 1)[0];
};