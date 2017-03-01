define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var PostModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.PTS
        });

        return PostModel;
    });