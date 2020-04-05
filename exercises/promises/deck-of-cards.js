let baseURL = 'https://deckofcardsapi.com/api/deck';

// 1.Make a request to the Deck of Cards API to request
// a single card from a newly shuffled deck.Once you have
// the card, console.log the value and the suit(e.g.“5 of
// spades”, “queen of diamonds”).
$.getJSON(`${baseURL}/new/draw/`)
    .then(deck => {
        console.log(`${deck.cards[0].value} of ${deck.cards[0].suit}`);
    }
);

// 2. Make a request to the deck of cards API to request a 
// single card from a newly shuffled deck. Once you have the
// card, make a request to the same API to get one more card
// from the same deck.

// Once you have both cards, console.log the values and suits
// of both cards.
$.getJSON(`${baseURL}/new/draw`)
    .then(deck => {
        card1 = deck.cards[0]
        deckId = deck.deck_id
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(deck => {
        card2 = deck.cards[0]
        console.log(`${card1.value} of ${card1.suit}`);
        console.log(`${card2.value} of ${card2.suit}`);
    })

// 3. Build an HTML page that lets you draw cards from a deck.
// When the page loads, go to the Deck of Cards API to create
// a new deck, and show a button on the page that will let you
// draw a card. Every time you click the button, display a new
// card, until there are no cards left in the deck.
deckId = null

$.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $('button').show();
});

$('button').on('click', function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
        let cardImg = data.cards[0].image;
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
        if (data.remaining === 0) $('button').remove();
    });
});