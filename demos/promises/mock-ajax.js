// let mockAjaxRequest = new Promise(function (resolve, reject) {
//     let probSuccess = .5;
//     let requestTime = 1000;

//     // We mock a network request using a setTimeout.
//     // The request takes requestTime milliseconds.
//     // Afterwards, the promise is either resolved with data
//     // or rejected with a timeout message based on
//     // whether randomNum is less than probSuccess.
//     setTimeout(function () {
//         let randomNum = Math.random();
//         if (randomNum < probSuccess) {
//             let data = "HERE'S YOUR DATA!";
//             resolve(data);
//         } else {
//             reject('SORRY, REQUEST FAILED!')
//         }
//     }, requestTime)
// })

function mockAjaxRequest() {
    return new Promise(function (resolve, reject) {
        let probSuccess = .5;
        let requestTime = 1000;

        // We mock a network request using a setTimeout.
        // The request takes requestTime milliseconds.
        // Afterwards, the promise is either resolved with data
        // or rejected with a timeout message based on
        // whether randomNum is less than probSuccess.
        setTimeout(function () {
            let randomNum = Math.random();
            if (randomNum < probSuccess) {
                let data = "HERE'S YOUR DATA!";
                resolve(data);
            } else {
                reject('SORRY, REQUEST FAILED!')
            }
        }, requestTime)
    })
}

mockAjaxRequest()
    .then(data => {
        console.log(data);
        return mockAjaxRequest()
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err))