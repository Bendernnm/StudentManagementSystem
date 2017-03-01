define(['Backbone', 'jQuery', 'Underscore',
        './blogPreview',
        'text!templates/blogs.html'],
    function (Backbone, $, _,
              BlogPreviewView,
              template) {
        var BlogsView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.sessionAccess = options.sessionAccess;
                v.author = options.author;
                v.authorID = options.authorID;

                if (v.collection)
                    v.listenTo(v.collection, 'add', v.addBlog);
            },
            render: function () {
                var v = this;

                v.$el.html(template);
                v.$blogs = v.$el.find('.blogs');

                if (v.collection)
                    v.collection.each(v.addBlog, v);

                return v;
            },
            addBlog: function (blog) {
                var v = this;

                var view = new BlogPreviewView({
                    model: blog,
                    sessionAccess: v.sessionAccess,
                    author: v.author,
                    authorID: v.authorID
                });
                v.$blogs.append(view.render().el);
            }
        });

        return BlogsView;
    });