define(['Backbone',
        '../models/blog',
        '../const'],
    function (Backbone,
              BlogModel,
              C) {
        var BlogsCollection = Backbone.Collection.extend({
            url: C.server.routes.BGS,
            model: BlogModel
        });

        return BlogsCollection;
    });