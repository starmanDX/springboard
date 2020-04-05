const searchInput = document.querySelector('#searchInput'),
    searchButton = document.querySelector('#searchButton'),
    removeButton = document.querySelector('#removeButton'),
    results = document.querySelector('#results');

async function getGif(input) {
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
        params: {
            q: input,
            api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
        }
    });

    try {
        const randomImg = res.data.data[Math.floor(Math.random() * 25)].images.downsized_medium.url;
        appendImg(randomImg)
    } catch {
        alert('No GIF found. Try again!')
    }
};

function appendImg(imgUrl) {
    const newImg = document.createElement('IMG');
    newImg.src = imgUrl;
    results.append(newImg);
};

searchButton.addEventListener('click', function (e) {
    if (!searchInput.value) return;
    e.preventDefault();
    getGif(searchInput.value);
    searchInput.value = "";
});

removeButton.addEventListener('click', function (e) {
    e.preventDefault();
    results.innerHTML = "";
});