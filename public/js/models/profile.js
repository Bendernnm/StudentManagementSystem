define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var ProfileModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.PR
        });

        return ProfileModel;
    });