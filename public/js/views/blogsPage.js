define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../models/blog',
        '../collections/blogs',
        './blogs',
        'text!templates/blogsPage.html',
        '../const'],
    function (Backbone, $, _,
              alertify,
              BlogModel,
              BlogsCollection,
              BlogsView,
              template,
              C) {
        var message = C.message.bg;

        var BlogsPageView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
                v.sessionAccess = options.sessionAccess;
                v.author = options.author;
                v.authorID = options.authorID;
            },
            template: _.template(template),
            render: function () {
                var v = this;

                var data = {sessionAccess: v.sessionAccess};
                v.$el.html(v.template(data));

                v.$main = v.$el.find('.main_blogs');
                v.$my = v.$el.find('.my_blogs');
                v.$all = v.$el.find('.all_blogs');

                v.allBlogs = new BlogsCollection();
                v.allBlogs.fetch({
                    success: function (data) {
                        var view = new BlogsView({
                            collection: v.allBlogs,
                            sessionAccess: v.sessionAccess,
                            author: v.author
                        });
                        v.$all.html(view.render().el);
                    },
                    error: function (data) {
                        alertify.error('There is no blog for you.');
                        Backbone.history.navigate(C.routes.MAIN, {trigger: true});
                    }
                });

                return v;
            },
            events: {
                'click button': 'createBlog'
            },
            createBlog: function () {
                var v = this;

                var name = v.$el.find('input').val();
                var data = {
                    name: name,
                    author: v.authorID
                };

                var model = new BlogModel();
                model.save(data, {
                    success: function (data) {
                        v.allBlogs.add(model);
                        alertify.success(message.create);
                    },
                    error: function (data) {
                        alertify.error('An error occurred while creating a blog, try again later.');
                    }
                });
            }
        });

        return BlogsPageView;
    }
);