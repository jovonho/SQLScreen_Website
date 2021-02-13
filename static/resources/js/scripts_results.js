function resizeNames() {

    names = $('h3.name');

    $.each(names, (i, obj) => {
        if ($(obj).text().length > 125)
            $(obj).css('font-size', '100%')
    })

}

var isSortKeyNumeric = {
    "price": true,
    "pricechange": true,
    "exdividenddate": false,
    "symbol": false
}

// var operators = {
//     'asc': (a, b) => { return a < b },
//     'desc': (a, b) => { return a > b }
// };

function sortList(key) {
    //TODO: Try to implement quicksort instead
    //TODO: Maybe I can speed this up by giving each row a bunch of data attributes!
    var list, i, switching, items, shouldSwitch;
    list = document.getElementById("result-list");
    switching = true;

    while (switching) {
        switching = false;

        // var items = list.querySelectorAll('.' + key);
        var items = list.getElementsByClassName('result-list-item');

        for (i = 0; i < (items.length - 1); i++) {

            shouldSwitch = false;

            // var symbol1 = items[i].closest('.result-container').querySelector('.symbol').innerHTML
            // var symbol2 = items[i + 1].closest('.result-container').querySelector('.symbol').innerHTML

            // console.log(symbol1 + " and " + symbol2)
            // console.log(items[i].textContent + " " + items[i + 1].textContent);

            if (isSortKeyNumeric[key]) {

                // if (parseFloat(items[i].textContent) > parseFloat(items[i + 1].textContent)) {
                if (parseFloat(items[i].getAttribute(key)) > parseFloat(items[i + 1].getAttribute(key))) {
                    shouldSwitch = true;
                    break;
                }
            }
            else {
                // if (items[i].textContent > items[i + 1].textContent) {
                if (items[i].getAttribute(key) > items[i + 1].getAttribute(key)) {
                    shouldSwitch = true;
                    break;
                }
            }

        }
        if (shouldSwitch) {
            // var item1 = items[i].closest('.result-list-item')
            // var item2 = items[i + 1].closest('.result-list-item')
            // list.insertBefore(item2, item1);

            list.insertBefore(items[i + 1], items[i]);
            switching = true;
        }
    }
}

function collapseResult(elem) {

    $(elem).find('.line-info').slideToggle(200, function () {
        if ($(this).is(':visible'))
            $(this).css('display', 'flex');
    });

    $(elem).find('.hidden').slideToggle(200, function () {
        if ($(this).is(':visible'))
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

var compareFunctions = {
    "price": function (a, b) {
        return parseFloat(a.getAttribute("price")) > parseFloat(b.getAttribute("price"))
    },
    "pricechange": function (a, b) {
        return parseFloat(a.getAttribute("pricechange")) > parseFloat(b.getAttribute("pricechange"))
    },
    "exdividenddate": function (a, b) {
        return dates.convert(a.getAttribute("exdividenddate")) > dates.convert(b.getAttribute("exdividenddate"))
    },
    "symbol": function (a, b) {
        return a.getAttribute("symbol").localeCompare(b.getAttribute("symbol"))
    }
}

$(document).ready(function () {

    resizeNames();

    console.log($('.result-info-lines').length)

    $('#sort-by').change((e) => {

        // Select the sorting key from the currently selected value in the drop-down
        var key = $(e.currentTarget).val();

        var t0 = performance.now()
        sortList(key);
        var t1 = performance.now()

        console.log("Sorted by " + key + " in " + (t1 - t0) + " milliseconds.")
    });

    $('.result-info-lines').click((e) => {
        e.stopPropagation();
        e.preventDefault();
        collapseResult($(e.currentTarget))
    });

    $('#collapse-all').click((e) => {
        e.stopPropagation();
        e.preventDefault();

        items = $('.result-info-lines')

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