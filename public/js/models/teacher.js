define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var TeacherModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.TCHS
        });

        return TeacherModel;
    });