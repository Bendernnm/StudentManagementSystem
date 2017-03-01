define(['Backbone',
        '../models/student',
        '../const'],
    function (Backbone,
              StudentModel,
              C) {
        var StudentsCollection = Backbone.Collection.extend({
            model: StudentModel,
            url: C.server.routes.STS
        });

        return StudentsCollection;
    });