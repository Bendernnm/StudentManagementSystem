define(['Backbone',
        '../models/comment',
        '../const'],
    function (Backbone,
              CommentModel,
              C) {
        var CommentsCollection = Backbone.Collection.extend({
            // url: C.server.routes.PTS,
            model: CommentModel
        });

        return CommentsCollection;
    });