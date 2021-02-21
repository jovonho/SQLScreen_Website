// function resizeNames() {

//     names = $('h3.name');

//     $.each(names, (i, obj) => {
//         if ($(obj).text().length > 125)
//             $(obj).css('font-size', '100%')
//     })

// }


// TODO: Use vanilla js and requestAnimationFrame 
function collapseResult(elem) {

    $(elem).find('.line-info').slideToggle(200, function () {
        if ($(this).is(':visible'))
            $(this).css('display', 'none');
    });

    $(elem).find('.hidden').slideToggle(200, function () {
        if ($(this).is(':visible'))
            $(this).css('display', 'none');
    });
}

function openResult(elem) {

    $(elem).find('.line-info').slideToggle(200, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'flex');
    });

    $(elem).find('.hidden').slideToggle(200, function () {
        if (!$(this).is(':visible'))
            $(this).css('display', 'flex');
    });
}


$(document).ready(function () {

    // resizeNames();

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