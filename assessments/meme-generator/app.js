const memeOutput = document.querySelector('.meme-row'),
    submitButton = document.querySelector('input[type="submit"]'),
    storedMemes = JSON.parse(sessionStorage.getItem('memes')) || [];

init();

function init() {
    if (sessionStorage.length > 0) {
        for (meme of storedMemes) {
            const formImage = meme['meme-image'],
                formTop = meme['meme-text-top'],
                formBottom = meme['meme-text-bottom'],
                newMemeDiv = document.createElement('div'),
                newTextDiv = document.createElement('div'),
                newTextTop = document.createElement('div'),
                newTextBottom = document.createElement('div'),
                newMemeImage = document.createElement('img'),
                newDeleteDiv = document.createElement('div');

            memeOutput.append(newMemeDiv);
            newMemeDiv.classList.add('meme');
            newMemeDiv.append(newTextDiv);
            newTextDiv.classList.add('meme-text');
            newTextDiv.append(newTextTop);
            newTextTop.innerText = formTop.toUpperCase();
            newTextTop.classList.add('meme-text-top');
            newTextDiv.append(newTextBottom);
            newTextBottom.innerText = formBottom.toUpperCase();
            newTextBottom.classList.add('meme-text-bottom');
            newMemeDiv.append(newMemeImage);
            newMemeImage.src = formImage;
            newMemeDiv.append(newDeleteDiv);
            newDeleteDiv.classList.add('meme-delete');
            newDeleteDiv.innerText = 'X';
        };
    };
};

function createMeme() {
    const formImage = document.querySelector('input[name="image-url"]').value,
        formTop = document.querySelector('input[name="meme-top"]').value,
        formBottom = document.querySelector('input[name="meme-bottom"]').value,
        newMemeDiv = document.createElement('div'),
        newTextDiv = document.createElement('div'),
        newTextTop = document.createElement('div'),
        newTextBottom = document.createElement('div'),
        newMemeImage = document.createElement('img'),
        newDeleteDiv = document.createElement('div');

    memeOutput.append(newMemeDiv);
    newMemeDiv.classList.add('meme');
    newMemeDiv.append(newTextDiv);
    newTextDiv.classList.add('meme-text');
    newTextDiv.append(newTextTop);
    newTextTop.innerText = formTop.toUpperCase();
    newTextTop.classList.add('meme-text-top');
    newTextDiv.append(newTextBottom);
    newTextBottom.innerText = formBottom.toUpperCase();
    newTextBottom.classList.add('meme-text-bottom');
    newMemeDiv.append(newMemeImage);
    newMemeImage.src = formImage;
    newMemeDiv.append(newDeleteDiv);
    newDeleteDiv.classList.add('meme-delete');
    newDeleteDiv.innerText = 'X';

    storedMemes.push({
        'meme-image': formImage,
        'meme-text-top': formTop,
        'meme-text-bottom': formBottom
    })
    sessionStorage.setItem('memes', JSON.stringify(storedMemes));
}

submitButton.addEventListener('click', (e) => {
    const formImage = document.querySelector('input[name="image-url"]').value;
    if (formImage) {
        e.preventDefault();
        createMeme();
    };
});


memeOutput.addEventListener('click', (e) => {
    if (e.target.classList.contains('meme-delete')) {
        for (meme of storedMemes) {
            let children = e.target.parentElement.children,
                textChildren = children[0].children;
            if (meme['meme-image'] === children[1].src &&
                meme['meme-text-top'].toUpperCase() === textChildren[0].innerText &&
                meme['meme-text-bottom'].toUpperCase() === textChildren[1].innerText) {
                storedMemes.splice(storedMemes.indexOf(meme), 1);
                sessionStorage.setItem('memes', JSON.stringify(storedMemes));
                e.target.parentElement.remove();
            };
        };
    };
});