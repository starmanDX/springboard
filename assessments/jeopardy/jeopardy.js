// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const allCategories = [];
let categoryIds = [];
let categories = [];
let CATEGORIES = 6;
let QUESTIONS = 5;

function shuffleAllCategories(categories) {
    let currIndex = categories.length;
    let temp;
    let randIndex;

    while (currIndex !== 0) {
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        temp = categories[currIndex];
        categories[currIndex] = categories[randIndex];
        categories[randIndex] = temp;
    }

    return categories;
}

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let categoryData = await axios.get('http://jservice.io/api/categories', {
        params: {
            count: 100
        }
    });
    allCategories.push(...categoryData.data);
    shuffleAllCategories(allCategories);

    categoryIds = [];
    for (i = 0; i < CATEGORIES; i++) {
        categoryIds.push(allCategories[i].id)
    }
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let categoryData = await axios.get('http://jservice.io/api/clues', {
        params: {
            category: catId
        }
    });
    let cluesData = categoryData.data
    let cluesArray = [];

    for (clue of cluesData) {
        cluesArray.push({
            question: clue.question,
            answer: clue.answer,
            showing: null
        })
    }
    categories.push({
        title: categoryData.data[0].category.title,
        clues: cluesArray
    })
    for (category of categories) {
        shuffleAllCategories(category.clues)
    }

}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillCategories() {
    for (i = 0; i < CATEGORIES; i++) {
        let category = $('.category')[i]
        await getCategory(categoryIds[i]);
        $(category).text(categories[i].title)
    }
}

function fillTable() {
    $('thead').append('<tr class="category-row">');
    for (i = 0; i < CATEGORIES; i++) {
        $('.category-row').append(`<th class="category">`);
    }
    for (i = 0; i < QUESTIONS; i++) {
        $('tbody').append(`<tr id="question-row-${i}">`);
        for (j = 0; j < CATEGORIES; j++) {
            $(`#question-row-${i}`).append(`<td id="c${j}-q${i}">?</td>`)
        }
    }
    fillCategories();
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(evt) {
    let clickedCategory = $(this).index();
    let clickedQuestion = $(this).parent().index();
    let cluesList = categories[clickedCategory].clues
    if (!cluesList[clickedQuestion].showing) {
        $(this).html(cluesList[clickedQuestion].question)
        cluesList[clickedQuestion].showing = 'question'
    } else if (cluesList[clickedQuestion].showing === 'question') {
        $(this).html(cluesList[clickedQuestion].answer)
        cluesList[clickedQuestion].showing = 'answer'
    } else return
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    $('thead').html("");
    $('tbody').html("");
    categories = [];
    await getCategoryIds();
    fillTable();
}

/** On click of restart button, restart game. */

// TODO
$('#restart').on('click', setupAndStart)

/** On page load, setup and start & add event handler for clicking clues */

// TODO
setupAndStart();
$('tbody').on('click', 'td', handleClick)