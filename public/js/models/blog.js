define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var BlogModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.BGS
        });

        return BlogModel;
    });