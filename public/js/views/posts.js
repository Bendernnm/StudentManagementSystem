define(['Backbone', 'jQuery', 'Underscore',
        './post',
        'text!templates/posts.html'],
    function (Backbone, $, _,
              PostView,
              template) {
        var PostsView = Backbone.View.extend(
            {
                initialize: function (options) {
                    var v = this;
                    v.sessionAccess = options.sessionAccess;
                    v.blog = options.blog;
                },
                render: function () {
                    var v = this;
                    v.$el.html(template);
                    v.$posts = v.$el.find('.posts_block');

                    if (v.collection)
                        v.collection.each(v.addPost, v);

                    return v;
                },
                addPost: function (post) {
                    var v = this;

                    var view = new PostView({
                        blog: v.blog,
                        model: post,
                        sessionAccess: v.sessionAccess
                    });

                    v.$posts.append(view.render().el);
                }
            }
        );

        return PostsView;
    });