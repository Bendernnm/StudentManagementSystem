define(['jQuery', 'const'], function ($, C) {
    var elements = C.elements;

    var clear = function (object) {
        $(object).html('');
    };

    clear.all = function () {
        clear(elements.MENU);
        clear(elements.PROFILE);
        clear(elements.FT);
        clear(elements.MAIN);
        clear(elements.SUP);
    };

    clear.sup = function () {
        clear(elements.SUP);
    };

    clear.footnote = function () {
        clear(elements.MENU);
        clear(elements.PROFILE);
        clear(elements.FT);
    };


    return clear;
});