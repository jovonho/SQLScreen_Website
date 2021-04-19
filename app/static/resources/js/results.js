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


$(document).ready(function () {

    resizeNames();

    $('#download-button').on("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        console.log("download-button clicked")

        const sortby = document.querySelector('#sort-by').value;
        const sortorder = document.querySelector('#sort-order').getAttribute('value');

        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": document.querySelector("#query").dataset.query,
                "sortby": sortby,
                "sortorder": sortorder
            })
        };

        console.log("request: " + request.body);

        fetch("/exportcsv", request).then((response) => {
            console.log(response);
        });

    });

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