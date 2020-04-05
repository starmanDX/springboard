// FUNCTION WITH CALLBACKS
// let baseURLCallback = "https://pokeapi.co/v2/pokemon"

// $.getJSON(`${baseURLCallback}/1/`, p1 => {
//     console.log(`The first pokemon is ${p1.name}`);
//     $.getJSON(`${baseURLCallback}/2/`, p2 => {
//         console.log(`The second pokemon is ${p2.name}`);
//         $.getJSON(`${baseURLCallback}/3/`, p3 => {
//             console.log(`The third pokemon is ${p3.name}`);
//         });
//     });
// });

// FUNCTION WITH PROMISES
// function getThreePokemon() {
//     let baseURL = "https://pokeapi.co/api/v2/pokemon"
//     axios.get(`${baseURL}/1`)
//         .then(({data}) => {
//             console.log(`The first pokemon is ${data.name}`);
//             return axios.get(`${baseURL}/2`)
//         })
//         .then(({data}) => {
//             console.log(`The second pokemon is ${data.name}`);
//             return axios.get(`${baseURL}/3`)
//         })
//         .then(({data}) => {
//             console.log(`The third pokemon is ${data.name}`);
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

// FUNCTION WITH SEQUENTIAL ASYNC
async function getThreePokemon() {
    let baseURL = "https://pokeapi.co/api/v2/pokemon"
    try {
        let {
            data: p1
        } = await axios.get(`${baseURL}/1`);
        console.log(p1.name);
    } catch (err) {
        console.log(err);
    }
    try {
        let {
            data: p2
        } = await axios.get(`${baseURL}/2`);
        console.log(p2.name);
    } catch (err) {
        console.log(err);
    }
    try {
        let {
            data: p3
        } = await axios.get(`${baseURL}/3`)
        console.log(p3.name)
    } catch (err) {
        console.log(err)
    }
}

// FUNCTION WITH PARALLEL ASYNC
// async function getThreePokemonParallel() {
//     let baseURL = 'https://pokeapi.co/api/v2/pokemon';
//     let p1Promise = axios.get(`${baseURL}/1`);
//     let p2Promise = axios.get(`${baseURL}/2`);
//     let p3Promise = axios.get(`${baseURL}/3`);

//     try {
//         let p1 = await p1Promise;
//         console.log(`The first pokemon is ${p1.data.name}`);
//     }
//     catch (e) {
//         console.log(e)
//     }
//     try {
//         let p2 = await p2Promise;
//         console.log(`The second pokemon is ${p2.data.name}`);
//     }
//     catch (e) {
//         console.log(e)
//     }
//     try {
//         let p3 = await p3Promise;
//         console.log(`The third pokemon is ${p3.data.name}`);
//     }
//     catch (e) {
//         console.log(e)
//     }
//  }

// FUNCTION WITH PROMISE.ALL PARALLEL ASYNC
async function getThreePokemonParallel() {
    let baseURL = 'https://pokeapi.co/api/v2/pokemon';
    try {
        let pokemon = await Promise.all([
            axios.get(`${baseURL}/1/`),
            axios.get(`${baseURL}/2/`),
            axios.get(`${baseURL}/3/`)
        ]);

        console.log(`The first pokemon is ${pokemon[0].data.name}`);
        console.log(`The second pokemon is ${pokemon[1].data.name}`);
        console.log(`The third pokemon is ${pokemon[2].data.name}`);
    }
    catch (err) {
        console.log(err)
    }
}