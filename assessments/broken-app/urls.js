const fs = require('fs');
const axios = require('axios');

path = process.argv[2];

function readFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: \n${err}`);
            process.exit(1);
        }
        data = data.split('\n');
        writeFile(data);
    })
}

async function writeFile(paths) {
    for (i in paths) {
        try {
            let p = await axios.get(paths[i])
            let l = new URL(paths[i])
            fs.writeFile(l.hostname, p.data, 'utf8', (err) => {
                if (err) {
                    console.log(`Couldn't write to ${paths[i]}: ${err}`);
                }
                    console.log(`Wrote to ${l.hostname}`);
            });
        } catch (e) {
            console.log(`Couldn't download ${paths[i]}.`);
        }
    }
}

readFile(path);