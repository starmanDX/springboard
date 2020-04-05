let baseURL = "http://numbersapi.com"

// 1. Make a request to the Numbers API (http://numbersapi.com/)
// back JSON by including the json query key, specific to this API.

axios.get(`${baseURL}/3?json`)
    .then(num => {
        $('body').append(`<h1>#1</h1>`);
        $('body').append(`<p>${num.data.text}</p>`);
    })
    .catch(err => {
        $('body').append(`<p>${err}</p>`);
    })

// 2. Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number
// facts on the page.
axios.get(`${baseURL}/3,33,333?json`)
    .then(nums => {
        $('body').append(`<h1>#2</h1>`)
        for (num in nums.data) {
            $('body').append(`<p>${nums.data[num].text}</p>`)
        }
        console.log(nums)
    })

// 3. Use the API to get 4 facts on your favorite number. Once you have them
// all, put them on the page.It’s okay if some of the facts are repeats.
axios.get(`${baseURL}/3?json`)
    .then(num => {
        $('body').append(`<h1>#3</h1>`);
        $('body').append(`<p>${num.data.text}</p>`);
        return axios.get(`${baseURL}/3?json`)
    })
    .then(num => {
        $('body').append(`<p>${num.data.text}</p>`);
        return axios.get(`${baseURL}/3?json`)
    })
    .then(num => {
        $('body').append(`<p>${num.data.text}</p>`);
    })

