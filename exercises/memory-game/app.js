const title = document.querySelector('h1');
const cards = document.querySelectorAll('.flip-card-inner');
const cardBacks = document.querySelectorAll('.flip-card-back');
const scoreCard = document.querySelector('#score');
const startScreen = document.querySelector('#startScreen');
const startButton = document.querySelector('button');
const gameScreen = document.querySelector('#gameScreen');
const imgArr = ['https://media0.giphy.com/media/FymIDgPaRvxYs/source.gif',
    'https://i.pinimg.com/originals/74/81/c7/7481c7ae72d4a72d0fe429d7bceb8ef0.gif',
    'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
    'http://49.media.tumblr.com/c1a1edb19699cba2d2864c6a03f5fe59/tumblr_o6gsvja3NG1u75p2ko1_400.gif',
    'https://media.giphy.com/media/wRV3rB6qLkXJu/giphy.gif',
    'http://24.media.tumblr.com/2ea638030f1d766958b87a260eb2adf8/tumblr_mh7iy80AlQ1r8cm5vo1_500.gif',
    'https://media1.giphy.com/media/l0MYysfn7ivnN5AzK/source.gif',
    'https://66.media.tumblr.com/tumblr_lgwp4zPRNZ1qa2oaro1_500.gifv',
    'http://24.media.tumblr.com/tumblr_lyxnvsN6XP1r9652ro1_400.gif',
    'https://equity.guru/wp-content/uploads/2018/10/real-estate.gif',
    'https://i.imgur.com/lNJ1BHS.gif?noredirect',
    'https://media1.tenor.com/images/ce251aa344f3cff884c3e36180fda95f/tenor.gif?itemid=5337139',
    'https://media0.giphy.com/media/FymIDgPaRvxYs/source.gif',
    'https://i.pinimg.com/originals/74/81/c7/7481c7ae72d4a72d0fe429d7bceb8ef0.gif',
    'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
    'http://49.media.tumblr.com/c1a1edb19699cba2d2864c6a03f5fe59/tumblr_o6gsvja3NG1u75p2ko1_400.gif',
    'https://media.giphy.com/media/wRV3rB6qLkXJu/giphy.gif',
    'http://24.media.tumblr.com/2ea638030f1d766958b87a260eb2adf8/tumblr_mh7iy80AlQ1r8cm5vo1_500.gif',
    'https://media1.giphy.com/media/l0MYysfn7ivnN5AzK/source.gif',
    'https://66.media.tumblr.com/tumblr_lgwp4zPRNZ1qa2oaro1_500.gifv',
    'http://24.media.tumblr.com/tumblr_lyxnvsN6XP1r9652ro1_400.gif',
    'https://equity.guru/wp-content/uploads/2018/10/real-estate.gif',
    'https://i.imgur.com/lNJ1BHS.gif?noredirect',
    'https://media1.tenor.com/images/ce251aa344f3cff884c3e36180fda95f/tenor.gif?itemid=5337139'
]
console.log(imgArr[Math.floor(Math.random() * imgArr.length)])
let total = 0;

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
};

setInterval(() => {
    title.style.color = randomRGB();
}, 1000);

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
});

for (card of cards) {
    card.addEventListener('click', () => {
        total++;
        scoreCard.innerText = total;
        card.style.transform = 'rotateY(180deg)';
    });
}