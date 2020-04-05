let fourPokemonRace = [];

for (let i = 1; i < 5; i++) {
    fourPokemonRace.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
}

//Returns the first resolved promise
Promise.race(fourPokemonRace)
    .then(res => {
        console.log(`${res.data.name} won the race!`)
    })
    .catch(err => console.log(err))