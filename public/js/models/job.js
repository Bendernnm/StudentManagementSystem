define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var JobModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.JBS
        });
        
        return JobModel;
    });