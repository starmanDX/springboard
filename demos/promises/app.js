// CALLBACK ASYNC WITH JQUERY
// let planet;

// $.getJSON("https://swapi.co/api/planets/1/", response => {
//     planet = response;
//     console.log(planet);
//     $.getJSON(planet.residents[0], response => {
//         resident = response;
//         console.log(resident);
//         $.getJSON(resident.films[0], response => {
//             film = response;
//             console.log(film);
//         }, err => {
//              console.log(err)
//         });
//     }, err => {
//          console.log(err)
//     });
// }, err => {
//      console.log(err)
// });

// PROMISES WITHOUT CHAINING
// let url = "https://swapi.co/api/planets/1/";
// axios.get(url)
//     .then(res => {
//         console.log(res)
//         axios.get(res.data.residents[0])
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     })
//     .catch(err => console.log(err))

// PROMISES WITH CHAINING
let url = "https://swapi.co/api/planets/1"
axios.get(url)
    .then(res => {
        console.log("FIRST PROMISE RESOLVED!")
        console.log(res.data)
        return axios.get(res.data.residents[0])
    })
    .then(res => {
        console.log("SECOND PROMISE RESOLVED!")
        console.log(res.data)
        return axios.get(res.data.films[0])
    })
    .then(res => {
        console.log("THIRD PROMISE RESOLVED!")
        console.log(res.data)
    })
    .catch(err => console.log("PROMISE REJECTED!", err))

// *************************
// REFACTORING CALLBACK HELL

// ORIGINAL NESTED AJAX
// let baseURL = "https://pokeapi.co/api/v2/pokemon";

// $.ajax(`${baseURL}/1/`, {
//     success: p1 => {
//         console.log(`The first pokemon is ${p1.name}`);
//         $.ajax(`${baseURL}/2/`, {
//             success: p2 => {
//                 console.log(`The second pokemon is ${p2.name}`);
//                 $.ajax(`${baseURL}/3/`, {
//                     success: p3 => {
//                         console.log(`The third pokemon is ${p3.name}`);
//                     },
//                     error: err => console.log(err)
//                 });
//             },
//             error: err => console.log(err)
//         });
//     },
//     error: err => console.log(err)
// });

// WITH PROMISE CHAINING
let baseURL = "https://pokeapi.co/api/v2/pokemon"

axios.get(`${baseURL}/1/`)
    .then(p1 => {
        console.log(`The first pokemon is ${p1.data.name}`);
        return axios.get(`${baseURL}/2/`);
    })
    .then(p2 => {
        console.log(`The second pokemon is ${p2.data.name}`);
        return axios.get(`${baseURL}/3/`);
    })
    .then(p3 => {
        console.log(`The third pokemon is ${p3.data.name}`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem! ERROR: ${err}`);
    })