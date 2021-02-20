function resizeNames() {

    names = $('h3.name');

    $.each(names, (i, obj) => {
        if ($(obj).text().length > 125)
            $(obj).css('font-size', '100%')
    })

}

// TODO: Use vanilla js and requestAnimationFrame 
function collapseResult(elem) {

    $(elem).find('.line-info').slideToggle(200, function () {
        if ($(this).is(':visible'))
            $(this).css('display', 'flex');
    });

    $(elem).find('.hidden').slideToggle(200, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'flex');
    });
}

function openResult(elem) {

    $(elem).find('.line-info').slideToggle(200, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'none');
    });

    $(elem).find('.hidden').slideToggle(200, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'none');
    });
}

var sortingFunctionType = {
    "price": "",
    "pricechange": "float",
    "percentchange": "float",
    "exdividenddate": "date",
    "symbol": ""
}

function getCompareFunction(key) {
    var type = sortingFunctionType[key];

    switch (type) {
        case "float":
            return function (a, b) {
                n1 = parseFloat(a.getAttribute("pricechange"))
                n2 = parseFloat(b.getAttribute("pricechange"))
                return n1 == n2 ? 0 : (n1 > n2 ? 1 : -1);
            }
        case "date":
            return function (a, b) {
                date1 = Date.parse(a.getAttribute("exdividenddate"))
                date2 = Date.parse(b.getAttribute("exdividenddate"))
                return date1 == date2 ? 0 : (date1 > date2 ? 1 : -1);
            }
        default:
            return function (a, b) {
                return a.getAttribute("symbol") == b.getAttribute("symbol")
                    ? 0
                    : (a.getAttribute("symbol") > b.getAttribute("symbol") ? 1 : -1);
            }
    }
}

$(document).ready(function () {

    resizeNames();

    console.log($('.result__info').length)

    $('#sort-by').change((e) => {
        var key = $(e.currentTarget).val();

        var t0 = performance.now()

        var list = document.querySelector('#results');

        var fragment = document.createDocumentFragment();

        [...list.children]
            .sort(getCompareFunction(key))
            .forEach(node => fragment.appendChild(node));

        list.appendChild(fragment);

        var t1 = performance.now();
        console.log("Sorted by " + key + " in " + (t1 - t0) + " milliseconds.");

    });

    $('.result__info').click((e) => {
        e.stopPropagation();
        e.preventDefault();
        collapseResult($(e.currentTarget))
    });

    $('#collapse-all').click((e) => {
        e.stopPropagation();
        e.preventDefault();

        items = $('.result__info')

        // If collapse all, collapse only those currently opened
        if ($(e.currentTarget).text().trim() == "Collapse All") {
            console.log("Collapsing")

            $.each(items, (i, elem) => {

                // console.log($(elem).find('.line-info').first())

                if ($(elem).find('.line-info').first().css('display') == 'flex') {
                    collapseResult(elem)
                }
            })

            $(e.currentTarget).text("Open All")
        }
        else {
            $.each(items, (i, elem) => {
                if (!($(elem).find('.line-info').first().css('display') == 'flex')) {
                    openResult(elem)
                }
            });

            $(e.currentTarget).text("Collapse All")
        }

    });

});