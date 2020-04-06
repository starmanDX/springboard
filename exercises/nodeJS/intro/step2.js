const fs = require('fs')
const axios = require('axios')

path = process.argv[2]

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: \n${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(`${url}`)
        console.log(res.data)
    }
    catch (err) {
        console.log(`Error fetching ${path}: \n${err}`)
        process.exit(1)
    }
}

if (path.slice(0, 4).toLowerCase() === 'http') {
    webCat(path);
} else {
    cat(path);
}