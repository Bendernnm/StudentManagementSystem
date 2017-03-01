define(['jQuery'], function ($) {
    return function (view, object) {
        $(object).html(view.render().$el);
    }
});