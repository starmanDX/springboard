const nums = [20, 30, 50, 12, -2, 45, 99, 19, 22, 85];

let total = 0;
for (let num of nums) {
    total += num;
};
console.log(total);

let min = nums[0];
for (num of nums) {
    if (num < min) min = num;
};
console.log(min);

const str = "lollapalooza";
const charFreq = {};
for (let char of str) {
    if (charFreq[char]) {
        charFreq[char] += 1;
    } else {
        charFreq[char] = 1;
    };
};

const words = ['hello', 'I', 'love', 'you'];
const result = words.reduce(function (accum, nextWord) {
    return accum + nextWord;
});

const midtermScores = [78, 88, 93, 94, 64, 62, 56];
const finalsScores = [92, 93, 76, 77, 78, 59, 61];
const minMidtermScore = midtermScores.reduce(function (min, nextScore) {
    // if (nextScore < min) {
    //     return nextScore;
    // };
    // return min;
    return nextScore < min ? nextScore : min;
});
const maxScore = midtermScores.reduce(function (max, nextScore) {
    return nextScore > max ? nextScore : min;
});

const minFinalsScore = finalsScores.reduce(function (min, nextScore) {
    return nextScore < min ? nextScore : min;
});

const minOverallScore = finalsScores.reduce(function (min, nextScore) {
    return nextScore < min ? nextScore : min;
}, minMidtermScore);