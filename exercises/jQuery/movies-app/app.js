$('body').prepend('<ul id="movies">');

$('#movies').after('<button class="sort-movies">Sort Movies Alphabetically</button>');

$('body').prepend('<form>');

$('body').prepend('<h1>Rate a Movie');

$('form').append('<input type="text" placeholder="Movie Title" minlength="2" required>')
    .append('<input type="number" value="0" step="1" min="0" max="10" required>')
    .append('<button class="add-movie">Submit</button>');


$('<label>Movie Title: </label>').insertBefore('input:first-of-type');
$('<label>Movie Rating: </label>').insertBefore('input:last-of-type');

$('input, button').css('margin-right', '10px');

$('button.add-movie').on('click', function (e) {
    let title = $('input').first().val(),
        rating = $('input').last().val();
    if (title.length < 2) {
        return
    }
    e.preventDefault();
    $('ul').append('<li>')
    $('ul').children().last().append(`${title} - ${rating}/10 `)
        .append('<button class="remove-movie">Remove</button>');
    $('input').first().val('');
    $('input').last().val('0');
});

$('body').on('click', 'button.remove-movie', function () {
    $(this).parent().remove()
})

$('body').on('click', 'button.sort-movies', function () {
    const movieList = $('#movies'),
        movies = movieList.children('li').get();
    
    movies.sort(function (a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each(movies, function (idx, itm) {
        movieList.append(itm);
    });
})