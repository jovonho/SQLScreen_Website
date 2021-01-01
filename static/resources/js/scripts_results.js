function resize_names() {

    names = $('h3.name');


    $.each(names, (i, obj) => {

        console.log($(obj).text().length)

        if ($(obj).text().length > 125)
            $(obj).css('font-size', '100%')
    })

    // el_all_names.forEach((el_name) => {

    //     console.log(el_name)
    // }

    // console.log(el_name.text().length + " " + el_name.text());

    // if (el_name.text().length > 125) {
    //     el_name.css('font-size', '150%')
    // }
    // )
}

$(document).ready(function () {

    resize_names();
});