define(['Backbone', 'jQuery', 'Underscore',
        'alertify', 'moment',
        '../collections/comments',
        './comments',
        'text!templates/post.html',
        '../const'],
    function (Backbone, $, _,
              alertify, moment,
              CommentsCollection,
              CommentsView,
              template,
              C) {
        var PostView = Backbone.View.extend(
            {
                initialize: function (options) {
                    var v = this;
                    v.blog = options.blog;
                    v.sessionAccess = options.sessionAccess;

                    v.listenTo(v.model, 'change:like', v.changeLike);
                    v.listenTo(v.model, 'change:dislike', v.changeDislike);
                    v.listenTo(v.model, 'destroy', v.remove);
                },
                template: _.template(template),
                render: function () {
                    var v = this;

                    if (v.model) {
                        var date = v.model.get('date');
                        date = moment(date).format('MMMM Do YYYY, h:mm:ss a');
                        v.model.set('date', date);

                        var data = {data: v.model.toJSON()};
                        data.data.sessionAccess = v.sessionAccess;

                        var content = v.template(data);

                        v.$el.html(content);
                        v.$like = v.$el.find('.fa-plus');
                        v.$dislike = v.$el.find('.fa-minus');
                        v.$comments = v.$el.find('.comments');
                    }

                    return v;
                },
                changeLike: function () {
                    var v = this;
                    var like = v.model.get('like');
                    v.$like.html(like);
                },
                changeDislike: function () {
                    var v = this;
                    var dislike = v.model.get('dislike');
                    v.$dislike.html(dislike);
                },
                events: {
                    'click .fa-trash-o': 'delete',
                    'click .fa-plus': 'like',
                    'click .fa-minus': 'dislike',
                    'click .fa-comment': 'showComments'
                },
                delete: function () {
                    var v = this;
                    var model = v.model;

                    model.destroy({
                        data: $.param({
                            blog: v.blog
                        }),
                        success: function (data) {
                            alertify.success(C.message.bg.post.delete);
                        },
                        error: function (data) {
                            alert('ERROR');
                        }
                    });
                },
                like: function () {
                    var model = this.model;
                    var like = model.get('like');
                    like++;

                    model.save({like: like}, {patch: true});
                },
                dislike: function () {
                    var model = this.model;
                    var dislike = model.get('dislike');
                    dislike--;

                    model.save({dislike: dislike}, {patch: true});
                },
                showComments: function () {
                    var v = this;

                    var _id = v.model.get('_id');
                    var collection = new CommentsCollection();

                    if (v.model.get('comments').length < 1)
                        return drawView();

                    collection.url = C.server.routes.CMS(_id);
                    collection.fetch({
                        success: function (data) {
                            drawView();
                        },
                        error: function (data) {
                            alert('ERROR');
                        }
                    });

                    function drawView() {
                        var view = new CommentsView({
                            collection: collection,
                            sessionAccess: v.sessionAccess,
                            post: _id,
                            count: v.$el.find('.fa-comment')
                        });
                        v.$comments.html(view.render().el);
                    }
                }
            }
        );

        return PostView;
    }
)
;