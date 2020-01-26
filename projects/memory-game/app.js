const cards = document.querySelectorAll('.flip-card-inner'),
    title = document.querySelector('h1'),
    bestScore = document.querySelector('#best-score'),
    startGameButton = document.querySelector('#start-game'),
    titleButton = document.querySelector('#go-to-title'),
    playAgainButton = document.querySelector('#play-again'),
    resetGameButton = document.querySelector('#reset'),
    titleScreen = document.querySelector('.title-screen'),
    gameScreen = document.querySelector('.game-screen');

let card1 = null,
    card2 = null;

startGame();

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
};

function cardClick(e) {
    if (!e.target.classList.contains('flip-card-front')) return;
    e.target.parentElement.classList.add('flipped');
    e.target.parentElement.removeEventListener('click', cardClick);
    resetGameButton.removeEventListener('click', resetGame);
    if (!card1) {
        card1 = e.target.parentElement.children[1].children[0];
        resetGameButton.addEventListener('click', resetGame);
        setScore(currentScore + 1);
    } else if (!card2) {
        for (card of cards) {
            card.removeEventListener('click', cardClick);
        };
        card2 = e.target.parentElement.children[1].children[0];
        setScore(currentScore + 1);
        window.setTimeout(() => {
            if (card1.src === card2.src) {
                let flippedCards = 0;
                card1 = null;
                card2 = null;
                for (card of cards) {
                    card.addEventListener('click', cardClick);
                    if (card.classList.contains('flipped')) {
                        flippedCards++;
                        if (flippedCards === 24) {
                            document.querySelector('#current-score').innerText = 'DONE!';
                            playAgainButton.classList.add('done');
                            resetGameButton.classList.add('done');
                            if (localStorage.getItem('best-score') === null) {
                                localStorage.setItem('best-score', currentScore);
                                bestScore.innerText = currentScore;
                            } else if (localStorage.getItem('best-score') > currentScore) {
                                localStorage.setItem('best-score', currentScore);
                                bestScore.innerText = currentScore;
                            };
                        };
                    };
                };
            } else {
                resetGameButton.removeEventListener('click', resetGame);
                window.setTimeout(() => {
                    card1.parentElement.parentElement.classList.remove('flipped');
                    card2.parentElement.parentElement.classList.remove('flipped');
                    card1 = null;
                    card2 = null;
                    window.setTimeout(() => {
                        for (card of cards) {
                            card.addEventListener('click', cardClick);
                        };
                        resetGameButton.addEventListener('click', resetGame);
                    }, 500);
                }, 1000);
            };
        }, 1000);
    };
};

function startGame() {
    setScore(0);
    setInterval(() => {
        title.style.color = randomRGB();
    }, 1000);
    window.setTimeout(() => {
        let indices = [];
        for (let i = 1; i <= 12; i++) {
            indices.push(i.toString());
        };
        let pairs = shuffleDeck(indices.concat(indices));
        for (let i = 0; i < cards.length; i++) {
            let path = 'gifs/' + pairs[i] + '.gif';
            cards[i].children[1].children[0].src = path;
        };
    }, 500);
};

function shuffleDeck(arr) {
    let arrCopy = arr.slice();
    for (let ind1 = arrCopy.length - 1; ind1 > 0; ind1--) {
        let ind2 = Math.floor(Math.random() * (ind1 + 1));
        let temp = arrCopy[ind1];
        arrCopy[ind1] = arrCopy[ind2];
        arrCopy[ind2] = temp;
    };
    return arrCopy;
};

function setScore(newScore) {
    if (localStorage.getItem('best-score')) {
        bestScore.innerText = localStorage.getItem('best-score');
    };
    currentScore = newScore;
    document.querySelector('#current-score').innerText = currentScore;
};

function resetGame() {
    resetGameButton.removeEventListener('click', resetGame);
    for (card of cards) {
        card.addEventListener('click', cardClick);
        if (card.classList.contains('flipped')) {
            card.classList.toggle('flipped');
        };
    };
    startGame();
    card1 = null;
    card2 = null;
};

startGameButton.addEventListener('click', () => {
    resetGame();
    titleScreen.classList.toggle('show');
    gameScreen.classList.toggle('show');
    window.setTimeout(() => {
        titleScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
    }, 1001);
});

titleButton.addEventListener('click', () => {
    titleScreen.classList.toggle('show');
    gameScreen.classList.toggle('show');
    playAgainButton.classList.remove('done');
    resetGameButton.classList.remove('done');
    window.setTimeout(() => {
        gameScreen.style.display = 'none';
        titleScreen.style.display = 'flex';
    }, 1001);
});

playAgainButton.addEventListener('click', () => {
    resetGame();
    playAgainButton.classList.remove('done');
    resetGameButton.classList.remove('done');
});