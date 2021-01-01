function resize_names() {

    names = $('h3.name');

    $.each(names, (i, obj) => {
        console.log($(obj).text().length)

        if ($(obj).text().length > 125)
            $(obj).css('font-size', '100%')
    })

}

$(document).ready(function () {

    resize_names();
});