process.on('exit', function (code) {
    console.log(`EXITING WITH CODE: ${code}`)
})
// process.argv contains all the arguments in
// a terminal command
for (let arg of process.argv) {
    console.log(arg)
}

// process.exit ends a script prematurely with a
// specified code
setInterval(() => {
    console.log('HELLO')
}, 1000);

setInterval(() => {
    process.exit(2)
}, 6000);
