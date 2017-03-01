define(['Backbone',
        '../models/teacher',
        '../const'],
    function (Backbone,
              TeacherModel,
              C) {
        var TeachersCollection = Backbone.Collection.extend({
            model: TeacherModel,
            url: C.server.routes.TCHS
        });

        return TeachersCollection;
    });