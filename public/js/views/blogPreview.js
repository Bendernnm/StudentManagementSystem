define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../models/blog',
        './blog', './createPost',
        'text!templates/blogPreview.html',
        '../helpers/showView',
        '../const'],
    function (Backbone, $, _,
              alertify,
              BlogModel,
              BlogView, CreatePostView,
              template,
              show,
              C) {
        var message = C.message.bg;
        var $MAIN = C.elements.MAIN;

        var BlogPreviewView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.sessionAccess = options.sessionAccess;
                v.author = options.author;

                if (v.model) {
                    v.model.set('sessionAccess', v.sessionAccess);
                    v.listenTo(v.model, 'destroy', v.remove);
                }
            },
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    data.check = v.author;
                    var content = v.template(data);

                    v.$el.html(content);
                }

                return v;
            },
            events: {
                'click .fa-trash-o': 'delete',
                'click .fa-pencil-square-o': 'createPost',
                'click .fa-tag': 'follow',
                'click h3': 'info',
                'click h4': 'info'
            },
            delete: function () {
                var model = this.model;

                model.destroy({
                    success: function (data) {
                        alertify.success(message.delete);
                    },
                    error: function (data) {
                        alertify.error('Can\'t delete blog.');
                    }
                });
            },
            info: function () {
                var v = this;

                var _id = v.model.get('_id');
                var model = new BlogModel({_id: _id});

                model.fetch({
                    success: function (data) {
                        var view = new BlogView({
                            model: model,
                            sessionAccess: v.sessionAccess
                        });

                        show(view, $MAIN);
                        $(C.elements.SUP).html('');
                    },
                    error: function (data) {
                        alertify.error('No any posts in blog.');
                    }
                });
            },
            createPost: function () {
                var v = this;
                var _id = v.model.get('_id');

                var view = new CreatePostView({blog: _id});
                show(view, C.elements.SUP);
            },
            follow: function () {
                var v = this;
                
                var model = v.model;
                model.save(null, {
                    patch: true,
                    success: function (data) {
                        alertify.success(message.follow);
                        v.$el.find('.fa-tag').remove();
                    },
                    error: function (data) {
                        alertify.success('You can\'t subscribe to the blog');
                    }
                });
            }
        });

        return BlogPreviewView;
    }
);