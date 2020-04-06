const fs = require('fs');

// reading a file
fs.readFile('fs.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('ERROR!', err);
        process.exit(1)
    }
    console.log('DATA:', data)
})

// writing to a file
const content = 'Lorem lorem lorem lorem lorem';

// without the a flag, completely overwrites the file
// fs.writeFile('fs.txt', content, 'utf8', (err) => {

// fs.writeFile('fs.txt', content, {encoding: 'utf8', flag:'a'}, (err) => {
//     if (err) {
//         console.log('ERROR!', err);
//         process.exit(1)
//     }
//     console.log('Successfully wrote to file!');
// })

// or use appendFile instead of passing a flag
fs.appendFile('fs.txt', "\n APPEND ME!", 'utf8', (err) => {
    if (err) {
        console.log('ERROR!', err);
        process.exit(1)
    }
    console.log('Successfully wrote to file!');
})

// file won't have been written to yet by this point
console.log('Writing to file...');