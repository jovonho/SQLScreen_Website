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
    "is_null"
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

var default_rules = {
    condition: 'OR',
    rules: [
        // {
        //     id: 'symbol',
        //     operator: 'equal',
        //     value: 'BBD.A'
        // },
        // {
        //     id: 'symbol',
        //     operator: 'equal',
        //     value: 'BBD.B'
        // }
        {
            id: 'industry',
            operator: 'equal',
            value: 'Oil & Gas'
        }
    ]
};



$(document).ready(function () {

    $('#builder').queryBuilder({
        allow_empty: false,
        filters: tmx_filters,
        rules: default_rules
    });

    // $('#builder').queryBuilder('setRulesFromSQL', 'name LIKE "%T%"');

    $('.submit-query').on('click', function (e) {
        e.preventDefault();

        var query = $('#builder').queryBuilder('getSQL');
        console.log(query.sql)

        var form = $("#form");
        form.append('<input type="hidden" name="sql" value="' + query.sql + '">');
        form.submit();
    });
});