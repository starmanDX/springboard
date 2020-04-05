let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
    fourPokemonPromises.push(
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    );
}

// Returns resolved when all promises have been resolved
// or rejected if any of them fail
Promise.all(fourPokemonPromises)
    .then(pokemonArr => {
        for (res of pokemonArr) {
            console.log(res.data.name)
        }
    })
    .catch(err => console.log(err));