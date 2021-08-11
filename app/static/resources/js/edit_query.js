$(document).ready(function () {

    // $('#freq-daily').on('click', function (event) {
    //     event.preventDefault(); // To prevent following the link (optional)
    //     console.log("daily clicked")
    // });

    $('#freq-daily a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
        console.log(this, "clicked")
    })

    $('#freq-daily a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
        console.log(this, "clicked")
    })

})