
function downloadResults(e) {
    e.stopPropagation();
    e.preventDefault();

    const query = document.querySelector("#query").dataset.query;
    const sortby = document.querySelector('#sort-by').value;
    const sortorder = document.querySelector('#sort-order').getAttribute('value');

    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "query": query,
            "sortby": sortby,
            "sortorder": sortorder
        })
    };

    const filename = 'query_result_' + Date.now() + '.csv';

    fetch("/exportcsv", request)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
}


$(document).ready(function () {

    resizeNames();

    $('#download-button').on("click", (e) => downloadResults(e))

    $('.result__info').on("click", (e) => {
        console.log(e.currentTarget + " clicked")
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

                console.log($(elem).find('.line-info').first())

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

function resizeNames() {

    names = $('h3.name');

    $.each(names, (i, obj) => {
        if ($(obj).text().length > 125)
            $(obj).css('font-size', '100%')
    })

}

function collapseResult(elem) {

    $(elem).find('.line-info').slideToggle(100, function () {
        if ($(this).is(':visible'))
            $(this).css('display', 'flex');
    });

    $(elem).find('.hidden').slideToggle(100, function () {
        if ($(this).is(':visible'))
            $(this).css('display', 'flex');
    });
}

function openResult(elem) {

    $(elem).find('.line-info').slideToggle(100, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'none');
    });

    $(elem).find('.hidden').slideToggle(100, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'none');
    });
}