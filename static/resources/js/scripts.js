

$(document).ready(function () {

    var rules_basic = {
        condition: 'AND',
        rules: [{
            id: 'price',
            operator: 'less',
            value: 10.25
        }, {
            condition: 'OR',
            rules: [{
                id: 'category',
                operator: 'equal',
                value: 'movies'
            }]
        }]
    };


    $('#builder').queryBuilder({
        allow_empty: false,

        filters: [
            {
                id: 'name',
                label: 'Name',
                type: 'string',
                operators: ['begins_with', 'not_begins_with', 'contains', 'not_contains', 'ends_with', 'not_ends_with']
            },
            {
                id: 'category',
                label: 'Category',
                type: 'integer',
                input: 'select',
                values: {
                    'books': 'Books',
                    'movies': 'Movies'
                },
                operators: ['equal', 'not_equal', 'in', 'not_in']
            }, {
                id: 'pe_ratio',
                label: 'Price/Earnings',
                type: 'double',
                operators: ['equal', 'less_than', 'greater_than']
            }, {
                id: 'price',
                label: 'Price',
                type: 'double',
                validation: {
                    min: 0,
                    step: 0.01
                }
            }, {
                id: 'id',
                label: 'Identifier',
                type: 'string',
                placeholder: '____-____-____',
                operators: ['equal', 'not_equal'],
                validation: {
                    format: /^.{4}-.{4}-.{4}$/
                }
            }, {
                id: 'ts',
                label: 'Itifier',
                type: 'double'

            }],

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