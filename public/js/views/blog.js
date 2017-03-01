define(['Backbone', 'jQuery', 'Underscore',
        './posts',
        '../collections/posts',
        'text!templates/blog.html'],
    function (Backbone, $, _,
              PostsView,
              PostsCollection,
              template) {
        var BlogView = Backbone.View.extend({
            template: _.template(template),
            initialize: function (options) {
                var v = this;
                v.sessionAccess = options.sessionAccess;
            },
            render: function () {
                var v = this;
                if (v.model) {
                    var data = v.model.toJSON();
                    data.sessionAccess = v.sessionAccess;
                    var content = v.template(data);

                    v.$el.html(content);
                    v.$posts = v.$el.find('.all_posts');

                    var posts = v.model.get('posts');
                    
                    var collection = new PostsCollection(posts);
                    var view = new PostsView({
                        collection: collection,
                        sessionAccess: v.sessionAccess,
                        blog: v.model.get('_id')
                    });
                    
                    v.$posts.append(view.render().el);
                }

                return v;
            }
        });

        return BlogView;
    });