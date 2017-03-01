define(['Backbone',
        '../models/subject',
        '../const'],
    function (Backbone,
              SubjectModel,
              C) {
        var SubjectsCollection = Backbone.Collection.extend({
            model: SubjectModel,
            url: C.server.routes.SJS
        });

        return SubjectsCollection;
    });