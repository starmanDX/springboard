const h1 = document.querySelector('h1');

// WITH PROMISES
function changeColor(el, color) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            el.style.color = color;
            resolve()
        }, 1000)
    })
}

// changeColor(h1, 'red')
//     .then(() => changeColor(h1, 'orange'))
//     .then(() => changeColor(h1, 'yellow'))
//     .then(() => changeColor(h1, 'green'))
//     .then(() => changeColor(h1, 'blue'))
//     .then(() => changeColor(h1, 'indigo'))
//     .then(() => changeColor(h1, 'violet'))

// WITH ASYNC-AWAIT
async function rainbow(el) {
    await changeColor(el, 'red');
    await changeColor(el, 'orange');
    await changeColor(el, 'yellow');
    await changeColor(el, 'green');
    await changeColor(el, 'blue');
    await changeColor(el, 'indigo');
    await changeColor(el, 'violet');
}

rainbow(h1)