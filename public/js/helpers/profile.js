define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        return function (id) {
            Backbone.history.navigate(C.routes.PROFILE(id), {trigger: true});
        };
    });