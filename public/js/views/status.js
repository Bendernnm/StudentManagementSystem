define(['Backbone',
        'text!templates/status.html',
        '../helpers/profile',
        'const'],
    function (Backbone,
              template,
              profile,
              C) {
        var StatusView = Backbone.View.extend({
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var status = v.template(v.model.toJSON());
                    v.$el.html(status);
                }

                return this;
            },
            events: {
                'click button': 'signOut',
                'click #profile_name': 'profile',
                'click img': 'profile'
            },
            signOut: function () {
                Backbone.history.navigate(C.routes.SIGN_OUT, {trigger: true});
            },
            profile: function () {
                var _id = this.model.get('_id');
                profile(_id);
            }
        });

        return StatusView;
    });