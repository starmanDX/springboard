const fs = require('fs')
const axios = require('axios')

function handleWrite(data, writeTo) {
    if (writeTo) {
        fs.writeFile(writeTo, data, 'utf8', (err) => {
            if (err) {
                console.log(`Couldn't write to ${writeTo}: ${err}`)
                process.exit(1)
            }
        });
    }
    else {
        console.log(data)
    }
}

function cat(path, writeTo) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: \n${err}`)
            process.exit(1)
        }
        handleWrite(data, writeTo)
    })
}

async function webCat(url, writeTo) {
    try {
        let res = await axios.get(`${url}`)
        handleWrite(res.data, writeTo)
    } catch (err) {
        console.log(`Error fetching ${path}: \n${err}`)
        process.exit(1)
    }
}

let path;
let writeTo;

if (process.argv[2] === '--out') {
    writeTo = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4).toLowerCase() === 'http') {
    webCat(path, writeTo);
} else {
    cat(path, writeTo);
}