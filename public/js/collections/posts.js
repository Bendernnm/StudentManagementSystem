define(['Backbone',
        '../models/post',
        '../const'],
    function (Backbone,
              PostModel,
              C) {
        var PostsCollection = Backbone.Collection.extend({
            url: C.server.routes.PTS,
            model: PostModel
        });

        return PostsCollection;
    });