document.addEventListener('mousemove', event => {
    let r = Math.round(event.x / window.innerWidth * 255)
    let b = Math.round(event.y / window.innerHeight * 255)
    let g = r * b / 63.75;
    document.querySelector('body').style.backgroundColor = `rgb(${r},${g},${b})`;
    console.log(document.querySelector('body').style.backgroundColor)
});