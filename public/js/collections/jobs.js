define(['Backbone',
        '../models/job',
        '../const'],
    function (Backbone,
              JobModel,
              C) {
        var JobsCollection = Backbone.Collection.extend({
            model: JobModel
        });

        return JobsCollection;
    });