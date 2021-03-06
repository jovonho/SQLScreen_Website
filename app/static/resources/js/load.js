function resizeNames() {

    names = $('span .name');

    $.each(names, (i, obj) => {
        if ($(obj).text().length > 80)
            $(obj).css('font-size', '160%')
    })

}

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
                    sentinel.innerHTML = "No results";
                    intersectionObserver.unobserve(sentinel);
                    return;
                }

                for (var i = 0; i < data.length; i++) {

                    let template_clone = template.content.cloneNode(true);

                    fillTemplate(template_clone, data[i]);

                    scroller.appendChild(template_clone);
                    counter += 1;
                }

                if (data.length <= 30) {
                    sentinel.innerHTML = "No more results";
                    intersectionObserver.unobserve(sentinel);
                }

                $('.result').click((e) => {
                    collapseResult($(e.currentTarget))
                });

                resizeNames();
            })
        })

    }



    var intersectionObserver = new IntersectionObserver(entries => {

        const sortby = document.querySelector('#sort-by').value;
        const sortorder = document.querySelector('#sort-order').getAttribute('value');

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
})


function fillTemplate(template_clone, data) {

    template_clone.querySelector(".price").innerText = formatPrice(data.price);
    const pricechange = data.pricechange;

    if (pricechange > 0) {
        template_clone.querySelector(".change").classList.add("ch-pos")
    }
    else if (pricechange < 0) {
        template_clone.querySelector(".change").classList.add("ch-neg")
    }
    template_clone.querySelector(".pricechange").innerText = formatChange(pricechange);
    template_clone.querySelector(".percentchange").innerText = `(${formatGrowth(data.percentchange)})`;
    template_clone.querySelector(".symbol").innerText = data.symbol;
    template_clone.querySelector(".name").innerText = data.name;
    template_clone.querySelector(".external-link").href = "https://money.tmx.com/en/quote/" + data.symbol;
    template_clone.querySelector(".lastupdate").innerText = formatDate(data.lastupdate);
    template_clone.querySelector(".exshortname").innerText = data.exshortname;
    template_clone.querySelector(".sector").innerText = notNull(data.sector);
    template_clone.querySelector(".industry").innerText = notNull(data.industry);

    template_clone.querySelector(".closeprice").innerText = formatPrice(data.price);
    template_clone.querySelector(".daylow").innerText = formatPrice(data.daylow);
    template_clone.querySelector(".dayhigh").innerText = formatPrice(data.dayhigh);
    template_clone.querySelector(".ma21d").innerText = formatPrice(data.day21movingavg);

    template_clone.querySelector(".open").innerText = formatPrice(data.openprice);
    template_clone.querySelector(".low52w").innerText = formatPrice(data.weeks52low);
    template_clone.querySelector(".high52w").innerText = formatPrice(data.weeks52high);
    template_clone.querySelector(".ma50d").innerText = formatPrice(data.day50movingavg);

    template_clone.querySelector(".prev").innerText = formatPrice(data.prevclose);
    template_clone.querySelector(".vwap").innerText = formatFinancial(data.vwap);
    template_clone.querySelector(".ma200d").innerText = formatPrice(data.day200movingavg);
    template_clone.querySelector(".ma21d").innerText = formatPrice(data.day21movingavg);

    template_clone.querySelector(".volume").innerText = formatComma(data.volume);
    template_clone.querySelector(".escrowed").innerText = formatComma(data.sharesescrow);
    template_clone.querySelector(".avgvol10d").innerText = formatComma(data.averagevolume10d);

    const sharesoutstanding = data.shareoutstanding;
    const totalsharesoutstanding = data.totalsharesoutstanding;

    if (sharesoutstanding != 0) {
        template_clone.querySelector(".shareoutstanding").innerText = formatComma(sharesoutstanding);


        if (totalsharesoutstanding != sharesoutstanding) {
            template_clone.querySelector(".totalsharesoutstanding").innerText = formatComma(totalsharesoutstanding);
        }

        else {
            template_clone.querySelector(".totalsharesoutstanding").innerText = '-';
        }
    } else {
        template_clone.querySelector(".shareoutstanding").innerText = '-';
        template_clone.querySelector(".totalsharesoutstanding").innerText = '-';
    }
    template_clone.querySelector(".avgvol30d").innerText = formatComma(data.averagevolume30d);

    template_clone.querySelector(".mktcap").innerText = formatComma(data.marketcap);
    template_clone.querySelector(".mktcapall").innerText = formatComma(data.marketcapallclasses);
    template_clone.querySelector(".avgvol50d").innerText = formatComma(data.averagevolume50d);

    template_clone.querySelector(".alpha").innerText = formatFinancial(data.alpha);
    template_clone.querySelector(".peratio").innerText = formatFinancial(data.peratio, 1);
    template_clone.querySelector(".returnonequity").innerText = formatGrowth(data.returnonequity);
    template_clone.querySelector(".beta").innerText = formatFinancial(data.beta);
    template_clone.querySelector(".pricetobook").innerText = formatFinancial(data.pricetobook, 2);
    template_clone.querySelector(".returnonassets").innerText = formatGrowth(data.returnonassets);
    template_clone.querySelector(".eps").innerText = formatFinancial(data.eps, 2);
    template_clone.querySelector(".pricetocashflow").innerText = formatFinancial(data.pricetocashflow, 2);
    template_clone.querySelector(".totaldebttoequity").innerText = formatFinancial(data.totaldebttoequity, 2);

    const dividendamount = data.dividendamount;
    if (typeof dividendamount == "number") {

        var element = document.createElement('div');
        element.insertAdjacentHTML('beforeend', dividendTable);

        element.querySelector(".dividendfrequency").innerText = data.dividendfrequency;
        element.querySelector(".exdividenddate").innerText = formatDate(data.exdividenddate);
        element.querySelector(".dividendpaydate").innerText = formatDate(data.dividendpaydate);
        element.querySelector(".dividendyield").innerText = formatGrowth(data.dividendyield);
        element.querySelector(".dividend3years").innerText = formatGrowth(data.dividend3years);;
        element.querySelector(".dividend5years").innerText = formatGrowth(data.dividend5years);;

        var dividendcurr = data.dividendcurrency;

        if (dividendcurr.length == 3 && dividendcurr != "CAD") {
            element.querySelector(".dividendamount").innerHTML = `${dividendamount} <span class="dividendcurr">${dividendcurr}</span>`;
        }
        else {
            element.querySelector(".dividendamount").innerHTML = dividendamount;
        }

        template_clone.querySelector(".dividend-table").appendChild(element);
    }
}

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

function formatGrowth(n) {

    r = formatFinancial(n, 2);
    if (r === '-') {
        return '0.00 %';
    }
    else {
        return `${r} %`;
    }
}


function formatFinancial(n, decimals = 4) {
    if (n == null || n == 0) {
        return "-";
    }
    return n.toFixed(decimals);
}

function formatChange(n) {
    if (decimals(n) < 2) {
        n = n.toFixed(2);
    }
    return (n > 0) ? " +" + n : " " + n;
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

const dividendTable = '<table><thead><th colspan=6>Dividend</th></thead><tbody><tr><th>Frequency</th><td class="dividendfrequency">\
    </td><th>Exdate</th><td class="exdividenddate"></td><th>Growth 3y</th><td class="dividend3years"></td></tr><tr>\
    <th>Amount</th><td class="dividendamount"><span class="dividendcurr"></span></td><th>Paydate</th><td class="dividendpaydate">\
    </td><th>Growth 5y</th><td class="dividend5years"></td></tr><tr><th>Yield</th>\<td class="dividendyield"></td></tr></tbody></table>'

const SVG_arrow_down = '<path fill="white" d="M2 0v5h-2l2.53 3 2.47-3h-2v-5h-1z" transform="translate(1)" />'
const SVG_arrow_up = '<path fill="white" d="M2.47 0l-2.47 3h2v5h1v-5h2l-2.53-3z" transform="translate(1)" />'
