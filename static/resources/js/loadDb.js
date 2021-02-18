

self.onmessage = function (event) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/load', false);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(event.data);

    if (xhr.status === 200) {
        self.postMessage(xhr.responseText);
    }
    else {
        self.postMessage("Connection Error")
    }
};


function getResultsFromDBSynchronousDeprecated() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/load', false);  // `false` makes the request synchronous

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        "sql": document.querySelector("#query").dataset.query
    }));

    if (xhr.status === 200) {
        results = xhr.responseText;
    }
}