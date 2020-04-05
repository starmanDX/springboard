const toggleSwitch = document.querySelector('input[type="checkbox"]'),
    toggleHeader = document.querySelector('h1');

if (localStorage.getItem('darkModeEnabled')) {
    document.body.className = 'dark';
    toggleHeader.innerText = 'Toggle for Light Mode';
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('click', () => {
    const {
        checked
    } = toggleSwitch;
    if (checked) {
        localStorage.setItem('darkModeEnabled', true);
        toggleHeader.innerText = 'Toggle for Light Mode';
    } else {
        localStorage.removeItem('darkModeEnabled');
        toggleHeader.innerText = 'Toggle for Dark Mode';
    };
    document.body.className = checked ? 'dark' : '';
});