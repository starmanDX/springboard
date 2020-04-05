// async function sayHi() {
//     return "RESOLVED PROMISE"
// }

// // SAME FUNCTION AS A PROMISE
// function sayHi() {
//     return Promise.resolve("RESOLVED PROMISE")
// }

// // REJECTED PROMISE AS ASYNC
// async function oops() {
//     throw "REJECTED PROMISE"
// }

// sayHi().then(msg => console.log(msg))

// oops().then(msg => console.log("INSIDE THEN", msg))
//     .catch(err => console.log("INSIDE CATCH", err))

async function getStarWarsFilms() {
    console.log('STARTING')
    const res = await axios.get("https://swapi.co/api/films/")
    console.log(res.data)
    console.log('ENDING!')

}

getStarWarsFilms()

// SAME FUNCTION WITH PROMISES
// function getStarWarsFilms() {
//     console.log("STARTING!")
//     axios.get("https://swapi.co/api/films/")
//         .then(res => {
//             console.log(res.data)
//             console.log("ENDING!")
//         })
// }

// getStarWarsFilms()