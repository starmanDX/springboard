//COUNTDOWN EXERCISE

// Write a function called countdown that accepts
// a number as a parameter and every 1000 milliseconds
// decrements the value and console.logs it. Once the value
// is 0 it should log “DONE!” and stop.

function countDown(num) {
    let countDownInterval = setInterval(() => {
        num--;
        if (num > 0) {
            console.log(num);
        } else {
            console.log("DONE!");
            clearInterval(countDownInterval);
        }  
    }, 1000);
};

countDown(4);
// 3
// 2
// 1
// "DONE!"


//RANDOMGAME EXERCISE

// Write a function called randomGame that selects a 
// random number between 0 and 1 every 1000 milliseconds 
// and each time that a random number is picked, add 1 
// to a counter.If the number is greater than .75, stop 
// the timer and return the number of tries it took 
// before we found a number greater than .75.

function randomGame() {
    let counter = 0;
    let randomInterval = setInterval(() => {
        let randomNum = Math.random();
        counter++;
        console.log("Random Number:", randomNum);
        console.log("Counter: ", counter)
        if (randomNum > .75) {
            clearInterval(randomInterval);
            console.log("Number of tries: ", counter);
            return counter;
        };
    }, 1000);
};

randomGame();