async function getUser(user) {
    try {
        let url = `https://api.github.com/users/${user}`;
        let response = await axios.get(url);
        console.log(`${response.data.name}: ${response.data.bio}`);
    }
    catch (e) {
        console.log(e)
    }
}

// SAME FUNCTION WITH PROMISES
// function getUser(user) {
//     let url = `https://api.github.com/users/${user}`;
//     axios.get(url)
//         .then(response => {
//             console.log(`${response.data.name}: ${response.data.bio}`);
//         })
//         .catch(err => {
//             console.log(err)
//     })
// }