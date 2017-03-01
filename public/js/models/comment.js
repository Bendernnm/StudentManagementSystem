define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var CommentModel = Backbone.Model.extend({
            idAttribute: '_id',
            // urlRoot: C.server.routes.GRS
        });

        return CommentModel;
    });