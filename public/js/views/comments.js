define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../models/comment',
        './comment',
        'text!templates/comments.html',
        '../const'],
    function (Backbone, $, _,
              alertify,
              CommentModel,
              CommentView,
              template,
              C) {
        var CommentsView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.$commentsCount = options.count;
                v.sessionAccess = options.sessionAccess;
                v.post = options.post;

                if (v.collection) {
                    v.listenTo(v.collection, 'add', v.addComment);
                    v.listenTo(v.collection, 'add', v.updateCommentsCount);
                    v.listenTo(v.collection, 'remove', v.updateCommentsCount);
                }
            },
            updateCommentsCount: function () {
                var v = this;
                var length = v.collection.length;
                v.$commentsCount.html(length);
            },
            render: function () {
                var v = this;

                v.$el.html(template);
                v.$list = v.$el.find('ul');

                if (v.collection)
                    v.collection.each(v.addComment, v);

                return v;
            },
            addComment: function (comment) {
                var v = this;

                comment.urlRoot = C.server.routes.CMS(v.post);

                var view = new CommentView({
                    model: comment,
                    sessionAccess: v.sessionAccess,
                    count: v.$comments
                });
                v.$list.append(view.render().el);
            },
            events: {
                'click button': 'sendComment'
            },
            sendComment: function (e) {
                e.stopPropagation();
                var v = this;

                var text = v.$el.find('[name="comment"]').val();

                var model = new CommentModel();
                model.urlRoot = C.server.routes.CMS(v.post);

                model.save({text: text}, {
                    success: function (data) {
                        v.collection.add(model);
                    },
                    error: function (data) {
                        alertify.error('Comment not saved.');
                    }
                });
            }
        });

        return CommentsView;
    });