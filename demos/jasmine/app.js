function calculateTaxes(income) {
    if (!Number.isFinite(income)) {
        throw new Error('Invalid income!');
    };
    if (income > 30000) {
        return income * .25;
    }
    else {
        return income * .15;
    };
};

function removeDupes(values) {
    const arr = [...new Set(values)];
    if (typeof values === 'string') return arr.join('');
    return arr;
};

function remove(arr, val) {
    return arr.filter((el) => {
        return el !== val;
    });
};

let usernames = [],
    input = document.querySelector('#username');
function submitForm() {
    usernames.push(input.value);
}