let baseURL = 'https://deckofcardsapi.com/api/deck';

// 1.Make a request to the Deck of Cards API to request
// a single card from a newly shuffled deck.Once you have
// the card, console.log the value and the suit(e.g.“5 of
// spades”, “queen of diamonds”).
async function drawCard() {
    try {
        let deck = await axios.get(`${baseURL}/new/draw`);
        console.log('#1 RESOLVED')
        console.log(`${deck.data.cards[0].value} of ${deck.data.cards[0].suit}`);
    } catch (err) {
        console.log('#1 REJECTED')
        console.log(err)
    }
}

// 2. Make a request to the deck of cards API to request a 
// single card from a newly shuffled deck. Once you have the
// card, make a request to the same API to get one more card
// from the same deck.

// Once you have both cards, console.log the values and suits
// of both cards.

async function drawTwoCards() {
    try {
        let deck1 = await axios.get(`${baseURL}/new/draw/`);
        let deck2 = await axios.get(`${baseURL}/${deck1.data.deck_id}/draw/`);

        console.log('#2 RESOLVED')
        console.log(`${deck1.data.cards[0].value} of ${deck1.data.cards[0].suit}`);
        console.log(`${deck2.data.cards[0].value} of ${deck2.data.cards[0].suit}`);
    } catch (err) {
        console.log('#2 REJECTED')
        console.log(err)
    }
}

// 3. Build an HTML page that lets you draw cards from a deck.
// When the page loads, go to the Deck of Cards API to create
// a new deck, and show a button on the page that will let you
// draw a card. Every time you click the button, display a new
// card, until there are no cards left in the deck.
async function getDeck() {
    try {
        console.log('#getDeck RESOLVED')
        deck = await axios.get(`${baseURL}/new/shuffle`)
        deckId = deck.data.deck_id
        $('button').show();
    } catch (err) {
        console.log('#getDeck REJECTED')
        console.log(err)
    }


    $('button').on('click', async function () {
        try {
            console.log('#getDeck w/ deck_id RESOLVED')
            deck = await axios.get(`${baseURL}/${deckId}/draw/`);
            let cardImg = deck.data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $('#cards').append(
                $('<img>', {
                    src: cardImg,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (deck.data.remaining === 0) $('button').remove();
        }
        catch (err) {
            console.log('#getDeck w/ deck_id REJECTED');
            console.log(err);
        }
    })
}

async function callAll() {
    await getDeck();
    await drawCard();
    await drawTwoCards();
}

callAll();