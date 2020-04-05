const form = document.querySelector('#logoform'),
    output = document.querySelector('#output'),
    brandName = document.querySelector('input[name="brandname"'),
    brandColor = document.querySelector('input[name="color"'),
    brandFont = document.querySelector('input[name="fontsize"');

function makeLogo(text, color, size) {
    const logo = document.createElement('h1');
    logo.innerText = text;
    logo.style.color = color;
    logo.style.fontSize = size + 'px';
    return logo;
};

form.addEventListener('submit', ev => {
    const newLogo = makeLogo(brandName.value, brandColor.value, brandFont.value);
    if (output.children.length > 0) {
        output.children[0].remove();
        output.append(newLogo);
    } else {
        output.append(newLogo);
    };
    ev.preventDefault();
});