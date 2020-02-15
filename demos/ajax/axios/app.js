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