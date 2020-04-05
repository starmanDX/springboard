let baseURL = "http://numbersapi.com"

// 1. Make a request to the Numbers API (http://numbersapi.com/)
// back JSON by including the json query key, specific to this API.
async function getNumber() {
    try {
        let num = await axios.get(`${baseURL}/3?json`)
        $('body').append(`<h1>#1 RESOLVED</h1>`);
        $('body').append(`<p>${num.data.text}</p>`);
    }
    catch (err) {
        $('body').append(`<h1>#1 REJECTED</h1>`);
        $('body').append(`<p>${err}</p>`);
    }
}

// 2. Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number
// facts on the page.
async function getMultNumbers() {
    try {
        $('body').append(`<h1>#2 RESOLVED</h1>`)
        let nums = await axios.get(`${baseURL}/3,33,333?json`);
            for (num in nums.data) {
                $('body').append(`<p>${nums.data[num].text}</p>`)
            }
    }
    catch (err) {
        $('body').append(`<h1>#2 REJECTED</h1>`);
        $('body').append(`<p>${err}</p>`);
    }
}

// 3. Use the API to get 4 facts on your favorite number. Once you have them
// all, put them on the page.It’s okay if some of the facts are repeats.
async function getNumberRepeated() {
    try {
        let nums = await Promise.all([
            axios.get(`${baseURL}/3?json`),
            axios.get(`${baseURL}/3?json`),
            axios.get(`${baseURL}/3?json`)
        ])
        $('body').append(`<h1>#3 RESOLVED</h1>`);
        $('body').append(`<p>${nums[0].data.text}</p>`);
        $('body').append(`<p>${nums[1].data.text}</p>`);
        $('body').append(`<p>${nums[2].data.text}</p>`);
    }
    catch (err) {
        $('body').append(`<h1>#3 REJECTED</h1>`);
        $('body').append(`<p>${err}</p>`);
    }
}

async function callAll() {
    await getNumber();
    await getMultNumbers();
    await getNumberRepeated()
}

callAll();