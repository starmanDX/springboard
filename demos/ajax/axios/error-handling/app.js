async function getRandomDog() {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random');
    const img = document.querySelector('#dog');
    img.src = res.data.message
}

async function getDogByBreed(breed) {
    try {
        const res = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        const img = document.querySelector('#dog');
        img.src = res.data.message
    } catch (e) {
        alert("Breed not found! Here's a random dog instead!");
        getRandomDog();
    }
}

const form = document.querySelector('#searchForm');
const input = document.querySelector("#search");
form.addEventListener('submit', function (e) {
    e.preventDefault();
    getDogByBreed(input.value);
})