// async function getData() {
//     const response = await axios.get('https://swapi.co/api/planets/');
//     const {
//         next,
//         results
//     } = response.data;
//     for (let planet of results) {
//         console.log(planet.name)
//     }
//     const resp2 = await axios.get(next);
//     for (let planet of resp2.data.results) {
//         console.log(planet.name)
//     }
// }

//AXIOS GET W/ CONFIG PARAMS
// async function getJoke(firstName, lastName) {
//     let res = await axios.get('http://api.icndb.com/jokes/random', {params: {firstName, lastName} });
//     console.log(res);
// }

//AXIOS GET
// async function getUsers() {
//     const res = await axios.get('https://reqres.in/api/users');
//     console.log(res)
// }

//AXIOS POST W/ DATA
// async function createUser() {
//     const res = await axios.post('https://reqres.in/api/users', {username: 'Butters', email: "butters@gmail.com", age: 1});
//     console.log(res)
// }

async function getLaunches() {
    const res = await axios.get('https://api.spacexdata.com/v3/launches/upcoming');
    renderLaunches(res.data);

}

function renderLaunches(launches) {
    const ul = document.querySelector("#launches");
    for (let launch of launches) {  
        ul.append(makeLaunchLi(launch))
    }
}

function makeLaunchLi(launch) {
    const newLi = document.createElement('LI');
    const mission = document.createElement("B");
    mission.innerText = launch.mission_name;
    newLi.append(mission);
    newLi.innerHTML += ` - ${launch.rocket.rocket_name}`
    return newLi
}

const btn = document.querySelector("#getLaunches");
btn.addEventListener('click', getLaunches)