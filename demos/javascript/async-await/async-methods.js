const deck = {
    async init() {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new')
        this.deckId = res.data.deck_id
    },
    async shuffle() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle`)
        console.log(res)
    },
    async drawCard() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        console.log(res.data)
    }
}

deck.init()