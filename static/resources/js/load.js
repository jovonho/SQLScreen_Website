
function formatPrice(price) {
    if (price != null) {

        if (decimals(price) <= 2) {
            return price.toFixed(2);
        }
        else {
            return price.toFixed(3);
        }
    }
    return "-";
}

function formatFinancial(n) {
    if (n == null || n == 0) {
        return "-";
    }
    return n.toFixed(4);
}

function formatChange(n) {
    if (decimals(n) < 2) {
        n = n.toFixed(2);
    }
    return (n > 0) ? "+" + n : n;
}

function decimals(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

function formatComma(n) {
    if (n == null || n == 0)
        return "-"
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function notNull(s) {
    if (s == null || s == "null" || s == "") {
        return "-";
    }
    return s;
}

function formatDate(d) {
    if (d == null)
        return "-";
    return d.split(" ")[0];
}

const dividendTable = '<table> <thead> <th colspan=4>Dividend</th> </thead> \
<tbody> <tr> <th>Frequency</th> <td id="dividendfrequency"></td> <th>Ex date</th><td id="exdividenddate"></td></tr><tr> \
<th>Amount</th> <td id="dividendamount"> <span id="dividendcurr"> </span></td><th>Pay date</th><td id="dividendpaydate"></td></tr><tr><th>Yield</th> \
<td id="dividendyield"></td> </tr></tbody> </table>'

const SVG_arrow_down = "<path fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' />"
const SVG_arrow_up = "<path fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 244l144-144 144 144M256 120v292'/>"


$(document).ready(function () {

    var sentinel = document.querySelector("#sentinel");
    var template = document.querySelector("#template");
    var scroller = document.querySelector("#scroller");
    var counter = 0;

    function loadItems(limit, offset, sortby, sortorder) {

        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sql": document.querySelector("#query").dataset.query,
                "limit": limit,
                "offset": offset,
                "sortby": sortby,
                "sortorder": sortorder
            })
        }
        console.log("request: " + request.body)

        fetch("/load", request).then((response) => {
            response.json().then((data) => {
                console.log(data);

                if (!data.length) {

                    sentinel.innerHTML = "No more results";
                    intersectionObserver.unobserve(sentinel);
                    return;
                }

                for (var i = 0; i < data.length; i++) {

                    let template_clone = template.content.cloneNode(true);

                    const price = data[i]["price"];
                    const numDecimals = decimals(price);

                    template_clone.querySelector("#price").innerText = `${formatPrice(price)}`;

                    //TODO Add ch-pos or ch-neg class 
                    const pricechange = data[i]["pricechange"];

                    if (pricechange > 0) {
                        template_clone.querySelector("#ch_container").classList.add("ch-pos")
                    }
                    else if (pricechange < 0) {
                        template_clone.querySelector("#ch_container").classList.add("ch-neg")
                    }
                    template_clone.querySelector("#pricechange").innerText = `${formatChange(pricechange)}`;
                    template_clone.querySelector("#percentchange").innerText = `(${formatChange(data[i]["percentchange"].toFixed(2))} %)`;
                    template_clone.querySelector("#symbol").innerText = `${data[i]["symbol"]}`;
                    template_clone.querySelector("#name").innerText = `${data[i]["name"]}`;
                    template_clone.querySelector("#exshortname").innerText = `${data[i]["exshortname"]}`;
                    template_clone.querySelector("#sector").innerText = `${notNull(data[i]["sector"])}`;
                    template_clone.querySelector("#industry").innerText = `${notNull(data[i]["industry"])}`;

                    // TODO rename the DB fields to the ids
                    template_clone.querySelector("#close").innerText = `${formatPrice(data[i]["prevclose"])}`;
                    template_clone.querySelector("#daylow").innerText = `${formatPrice(data[i]["daylow"])}`;
                    template_clone.querySelector("#dayhigh").innerText = `${formatPrice(data[i]["dayhigh"])}`;
                    template_clone.querySelector("#ma21d").innerText = `${formatPrice(data[i]["day21movingavg"])}`;

                    template_clone.querySelector("#open").innerText = `${formatPrice(data[i]["openprice"])}`;
                    template_clone.querySelector("#low52w").innerText = `${formatPrice(data[i]["weeks52low"])}`;
                    template_clone.querySelector("#high52w").innerText = `${formatPrice(data[i]["weeks52high"])}`;
                    template_clone.querySelector("#ma50d").innerText = `${formatPrice(data[i]["day50movingavg"])}`;

                    template_clone.querySelector("#prev").innerText = `${formatPrice(data[i]["prevclose"])}`;
                    template_clone.querySelector("#vwap").innerText = `${formatFinancial(data[i]["vwap"])}`;
                    template_clone.querySelector("#ma200d").innerText = `${formatPrice(data[i]["day200movingavg"])}`;
                    template_clone.querySelector("#ma21d").innerText = `${formatPrice(data[i]["day21movingavg"])}`;


                    template_clone.querySelector("#volume").innerText = `${formatComma(data[i]["volume"])}`;
                    template_clone.querySelector("#escrowed").innerText = `${formatComma(data[i]["sharesescrow"])}`;
                    template_clone.querySelector("#avgvol10d").innerText = `${formatComma(data[i]["averagevolume10d"])}`;

                    const sharesoutstanding = data[i]["shareoutstanding"];
                    const totalsharesoutstanding = data[i]["totalsharesoutstanding"];

                    if (sharesoutstanding != 0) {
                        template_clone.querySelector("#shareoutstanding").innerText = `${formatComma(sharesoutstanding)}`;

                        if (totalsharesoutstanding != sharesoutstanding) {
                            template_clone.querySelector("#totalsharesoutstanding").innerText = `${formatComma(totalsharesoutstanding)}`;
                        }
                        else {
                            template_clone.querySelector("#totalsharesoutstanding").innerText = '-';
                        }
                    } else {
                        template_clone.querySelector("#shareoutstanding").innerText = '-';
                        template_clone.querySelector("#totalsharesoutstanding").innerText = '-';
                    }
                    template_clone.querySelector("#avgvol30d").innerText = `${formatComma(data[i]["averagevolume30d"])}`;

                    template_clone.querySelector("#mktcap").innerText = `${formatComma(data[i]["marketcap"])}`;
                    template_clone.querySelector("#mktcapall").innerText = `${formatComma(data[i]["marketcapallclasses"])}`;
                    template_clone.querySelector("#avgvol50d").innerText = `${formatComma(data[i]["averagevolume50d"])}`;

                    // Financials
                    template_clone.querySelector("#alpha").innerText = `${formatFinancial(data[i]["alpha"])}`;
                    template_clone.querySelector("#peratio").innerText = `${formatFinancial(data[i]["peratio"])}`;
                    template_clone.querySelector("#returnonequity").innerText = `${formatFinancial(data[i]["returnonequity"])}`;
                    template_clone.querySelector("#beta").innerText = `${formatFinancial(data[i]["beta"])}`;
                    template_clone.querySelector("#pricetobook").innerText = `${formatFinancial(data[i]["pricetobook"])}`;
                    template_clone.querySelector("#returnonassets").innerText = `${formatFinancial(data[i]["returnonassets"])}`;
                    template_clone.querySelector("#eps").innerText = `${formatFinancial(data[i]["eps"])}`;
                    template_clone.querySelector("#pricetocashflow").innerText = `${formatFinancial(data[i]["pricetocashflow"])}`;
                    template_clone.querySelector("#totaldebttoequity").innerText = `${formatFinancial(data[i]["totaldebttoequity"])}`;

                    const dividendamount = data[i]["dividendamount"];
                    if (typeof dividendamount == "number") {

                        var element = document.createElement('div');
                        element.insertAdjacentHTML('beforeend', dividendTable);

                        element.querySelector("#dividendfrequency").innerText = `${data[i]["dividendfrequency"]}`;
                        element.querySelector("#exdividenddate").innerText = `${formatDate(data[i]["exdividenddate"])}`;
                        element.querySelector("#dividendpaydate").innerText = `${formatDate(data[i]["dividendpaydate"])}`;
                        element.querySelector("#dividendyield").innerText = `${data[i]["dividendyield"]}`;

                        var dividendcurr = data[i]["dividendcurrency"];

                        if (dividendcurr.length == 3 && dividendcurr != "CAD") {
                            element.querySelector("#dividendamount").innerHTML = `${dividendamount}<span id="dividendcurr">${dividendcurr}</span>`;
                        }
                        else {
                            element.querySelector("#dividendamount").innerHTML = `${dividendamount}`;
                        }

                        template_clone.querySelector("#dividend-table").appendChild(element)
                    }

                    scroller.appendChild(template_clone);
                    counter += 1;
                }


                $('.result__info').click((e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    collapseResult($(e.currentTarget))
                });


            })
        })

    }

    var intersectionObserver = new IntersectionObserver(entries => {

        const sortby = document.querySelector('#sort-by').value;
        const sortorder = document.querySelector('#sort-order').getAttribute('value');
        console.log('Sorting by ' + sortby + " " + sortorder)

        if (entries[0].intersectionRatio <= 0) {
            return;
        }

        loadItems(30, counter, sortby, sortorder);
    });

    intersectionObserver.observe(sentinel);


    // Sorting selector
    document.querySelector('#sort-by').addEventListener('change', function () {
        counter = 0;
        scroller.innerHTML = '';
        sentinel.innerHTML = '';
        intersectionObserver.observe(sentinel);
    });

    document.querySelector('#sort-order').addEventListener('click', function () {

        counter = 0;
        scroller.innerHTML = '';
        sentinel.innerHTML = '';

        var currentVal = document.querySelector('#sort-order').getAttribute('value');
        if (currentVal == "desc") {
            document.querySelector('#sort-order').setAttribute('value', 'asc');
            document.querySelector('#sort-order-icon').innerHTML = SVG_arrow_down;
        }
        else {
            document.querySelector('#sort-order').setAttribute('value', 'desc');
            document.querySelector('#sort-order-icon').innerHTML = SVG_arrow_up;
        }

        intersectionObserver.observe(sentinel);
    });

    $('#see-more').on("click", function () {
        console.log("click")
        // e.stopPropagation();
        // e.preventDefault();
        // collapseResult($(e.currentTarget))
    });

    document.querySelector('.left').addEventListener('click', function () {
        console.log("click");
    });
})