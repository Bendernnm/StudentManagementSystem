define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var StudentModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.STS
        });

        return StudentModel;
    });