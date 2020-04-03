/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault();

    let name = $("#name").val();
    let email = $("#email").val();
    let year = $("#year").val();
    let color = $("#color").val();

    console.log('before')
    const newUserResponse = await axios.post(`http://localhost:5000/api/get-lucky-num`, {
        name,
        email,
        year,
        color
    });
    console.log("after")
    let ax_resp = newUserResponse.data;
    console.log(ax_resp)
    handleResponse(ax_resp)

    return
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    $("#lucky-results").empty();
    if (resp.errors) {
        $("#lucky-results").append(`<p>ERRORS:</p>`);
        for (key of Object.keys(resp.errors)) {
            $("#lucky-results").append(`<p>${key} - ${Object.values(resp.errors[key])}</p>`);
        }
    } else {
        console.log(resp.num)
        $("#lucky-results").append(`Your lucky number is ${"a"} (${"a"})`);
    }
    // $("#lucky-form").trigger("reset");
    
}

$("#lucky-form").on("submit", processForm)