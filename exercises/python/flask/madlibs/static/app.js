const madlibs = document.querySelectorAll('.madlib'),
    submitButton = document.querySelector('button');

submitButton.addEventListener('click', (e) => {
    for (madlib of madlibs) {
        if (madlib.value != madlib.value.toLowerCase()) {
            e.preventDefault()
            alert("All madlibs must be lowercase.")
            break
        }
        if (madlib.value.length < 3) {
            e.preventDefault();
            alert("All madlibs must be at least 3 characters long.")
            break
        }

    }
})