
$(document).ready(function () {

    var sentinel = document.querySelector("#sentinel");
    var template = document.querySelector("#template");
    var scroller = document.querySelector("#scroller");
    var counter = 0;

    var orderBy = "symbol";

    var results = [];

    function loadItems(limit, offset) {

        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sql": document.querySelector("#query").dataset.query,
                "limit": limit,
                "offset": offset,
                "orderBy": orderBy
            })
        }

        console.log("request: " + request.body)

        fetch("/load", request).then((response) => {
            response.json().then((data) => {
                console.log(data);

                if (!data.length) {

                    sentinel.innerHTML = "No more results";
                    return;
                }

                for (var i = 0; i < data.length; i++) {
                    let template_clone = template.content.cloneNode(true);
                    template_clone.querySelector("#price").innerText = `${data[i]["price"]}`;
                    //TODO Add ch-pos or ch-neg class 
                    template_clone.querySelector("#pricechange").innerText = `${data[i]["pricechange"]}`;
                    template_clone.querySelector("#percentchange").innerText = `${data[i]["percentchange"]}`;
                    template_clone.querySelector("#symbol").innerText = `${data[i]["symbol"]}`;
                    template_clone.querySelector("#name").innerText = `${data[i]["name"]}`;
                    template_clone.querySelector("#exshortname").innerText = `${data[i]["exshortname"]}`;
                    template_clone.querySelector("#sector").innerText = `${data[i]["sector"]}`;
                    template_clone.querySelector("#industry").innerText = `${data[i]["industry"]}`;

                    template_clone.querySelector("#close").innerText = `${data[i]["prevclose"]}`;
                    template_clone.querySelector("#daylow").innerText = `${data[i]["daylow"]}`;
                    template_clone.querySelector("#dayhigh").innerText = `${data[i]["dayhigh"]}`;
                    // TODO rename these fields to the ids
                    template_clone.querySelector("#ma21d").innerText = `${data[i]["day21movingavg"]}`;
                    template_clone.querySelector("#open").innerText = `${data[i]["openprice"]}`;
                    template_clone.querySelector("#low52w").innerText = `${data[i]["weeks52low"]}`;
                    template_clone.querySelector("#high52w").innerText = `${data[i]["weeks52high"]}`;
                    template_clone.querySelector("#ma50d").innerText = `${data[i]["day50movingavg"]}`;
                    template_clone.querySelector("#prev").innerText = `${data[i]["prevclose"]}`;
                    template_clone.querySelector("#vwap").innerText = `${data[i]["vwap"]}`;
                    template_clone.querySelector("#ma200d").innerText = `${data[i]["day200movingavg"]}`;


                    scroller.appendChild(template_clone);
                    counter += 1;
                }


            })
        })

    }

    // Create a new IntersectionObserver instance
    var intersectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            console.log(entry.intersectionRatio);
        })

        // If intersectionRatio is 0, the sentinel is out of view
        if (entries[0].intersectionRatio <= 0) {
            return;
        }

        loadItems(30, counter);

        // counter += 50;

    });

    intersectionObserver.observe(sentinel);

})