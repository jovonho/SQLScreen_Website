

$(document).ready(function () {

    // var options = {
    //     allow_empty: true,

    //     filters: [
    //         {
    //             id: 'name',
    //             label: 'Name',
    //             type: 'string',
    //             default_value: 'gaur',
    //             size: 30,
    //             unique: true
    //         }
    //     ]
    // };


    // $('#builder').queryBuilder(options);     

    $('.parse-json').on('click', function () {
        console.log(JSON.stringify(
            $('#builder').queryBuilder('getMongo'),
            undefined, 2
        ));
    });

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
                value: 2
            }]
        }]
    };


    $('#builder').queryBuilder({
        filters: [{
            id: 'name',
            label: 'Name',
            type: 'string'
        }, {
            id: 'category',
            label: 'Category',
            type: 'integer',
            input: 'select',
            values: {
                1: 'Books',
                2: 'Movies',
                3: 'Music',
                4: 'Tools',
                5: 'Goodies',
                6: 'Clothes'
            },
            operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
        }, {
            id: 'in_stock',
            label: 'In stock',
            type: 'integer',
            input: 'radio',
            values: {
                1: 'Yes',
                0: 'No'
            },
            operators: ['equal']
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
        }],

        rules: rules_basic
    });
});