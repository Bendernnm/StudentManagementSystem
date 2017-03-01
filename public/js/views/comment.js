define(['Backbone', 'jQuery', 'Underscore',
        'alertify', 'moment',
        'text!templates/comment.html',
        '../helpers/profile',
        '../const'],
    function (Backbone, $, _,
              alertify,moment,
              template,
              profile,
              C) {
        var CommentView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.sessionAccess = options.sessionAccess;

                v.listenTo(v.model, 'destroy', v.remove);
                v.listenTo(v.model, 'destroy', v.remove);
            },
            tagName: 'li',
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var date = v.model.get('date');
                    date = moment(date).format('MMMM Do YYYY, h:mm:ss a');
                    v.model.set('date', date);

                    var data = v.model.toJSON();
                    data.sessionAccess = v.sessionAccess;
                    var content = v.template(data);

                    v.$el.html(content);
                }

                return v;
            },
            events: {
                'click .fa-trash-o': 'delete',
                'click h2': 'profile',
                'click img': 'profile'
            },
            delete: function (e) {
                e.stopPropagation();

                var model = this.model;
                model.destroy();
            },
            profile: function () {
                var _id = this.model.get('author')._id;
                profile(_id);
            }
        });

        return CommentView;
    });