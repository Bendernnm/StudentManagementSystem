define(['jQuery'], function ($) {
    return function () {
        var data = {};

        for (var i = 0; i < arguments.length; i++) {
            var field = arguments[i];
            var query = 'input[name=' + field + ']';

            data[field] = $(query).val();
        }

        return data;
    };
});