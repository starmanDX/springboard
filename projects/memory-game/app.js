const cards = document.querySelectorAll('.flip-card-inner'),
    cardFaces = document.querySelectorAll('.flip-card-back');

let card1 = null,
    card2 = null;

function cardClick(e) {
    e.target.parentElement.classList.add('flipped');
    if (!e.target.classList.contains('flip-card-front')) return;
}

function startGame() {
    setScore(0);
    let indices = [];
    for (let i = 1; i <= 12; i++) {
        indices.push(i.toString());
    }

    let pairs = shuffleDeck(indices.concat(indices));

    for (let i = 0; i < cards.length; i++) {
        let path = 'gifs/' + pairs[i] + '.gif';
        cards[i].children[1].children[0].src = path;
    }
}

function shuffleDeck(arr) {
    let arrCopy = arr.slice();
    console.log('array: ', arrCopy)
    for (let ind1 = arrCopy.length - 1; ind1 > 0; ind1--) {
        console.log('index 1: ', ind1)
        let ind2 = Math.floor(Math.random() * (ind1 + 1));
        console.log('index 2: ', ind2)
        let temp = arrCopy[ind1];
        console.log('temp: ', temp)
        arrCopy[ind1] = arrCopy[ind2];
        arrCopy[ind2] = temp;
    }
    console.log('pairs array: ', arrCopy)
    return arrCopy;
}

function setScore(newScore) {
    currentScore = newScore;
    document.querySelector('#current-score').innerText = currentScore;
}

for (card of cards) {
    card.addEventListener('click', cardClick);
}