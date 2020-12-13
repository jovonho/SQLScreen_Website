var numeric_ops = [
    "equal",
    "not_equal",
    "less",
    "less_or_equal",
    "greater",
    "greater_or_equal",
    "between",
    "not_between",
]

var string_ops = [
    "equal",
    "not_equal",
    "less",
    "less_or_equal",
    "greater",
    "greater_or_equal",
    "between",
    "not_between",
    "begins_with",
    "not_begins_with",
    "contains",
    "is_empty",
    "is_null",
]

var select_string_ops = [
    "equal",
    "not_equal",
    "in",
    "not_in"
]

var datetime_ops = [
    "equal",
    "not_equal",
    "less",
    "less_or_equal",
    "greater",
    "greater_or_equal",
    "between",
    "not_between",
]

$(document).ready(function () {

    var rules_basic = {
        condition: 'AND',
        rules: [{
            id: 'price',
            operator: 'less',
            value: 10.25
        }]
    };


    $('#builder').queryBuilder({
        allow_empty: false,
        filters: tmx_filters,
        rules: rules_basic
    });

    $('.submit-query').on('click', function () {
        var payload = $('#builder').queryBuilder('getSQL')
        console.log(payload)

        $.ajax({
            type: 'POST',
            url: "/submit-query",
            data: payload,
            datatype: 'json',
            success: (response) => { document.write(response); }
        })
    });
});