// const request = new XMLHttpRequest();

// request.onload = function () {
//     if (request.readyState !== 4) return;

//     // Check status code
//     if (request.status >= 200 && request.status < 300) {
//         console.log("IT WORKED!", request)
//     } else {
//         console.log("ERROR!")
//     }
// }

// request.onerror = function handleError() {
//     console.log("NETWORK ERROR!")
//     request = null;
// }

// request.open('GET', 'https://swapi.co/api/planets/1/');

// request.send();

function get(url) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onload = function () {
            if (request.readyState !== 4) return;

            // Check status code
            if (request.status >= 200 && request.status < 300) {
                resolve({
                    data: JSON.parse(request.response),
                    status: request.status,
                    request: request
                })
            } else {
                reject({
                    msg: 'SERVER ERROR!',
                    status: request.status,
                    request: request
                })
            }
        }
        request.onerror = function handleError() {
            request = null;
            reject({
                msg: 'NETWORK ERROR!'
            })
        }
        request.open('GET', url);
        request.send();
    })
}

get('https://swapi.co/api/planets/1/')
    .then(res => {
        console.log(res)
        return get('https://swapi.co/api/planets/2/')
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))