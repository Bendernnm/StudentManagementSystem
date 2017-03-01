define(['Backbone',
        'text!templates/signIn.html',
        'handlers/auth',
        'helpers/getData'],
    function (Backbone,
              template,
              handler,
              getData) {
        var SignInView = Backbone.View.extend({
            render: function () {
                var v = this;
                v.$el.html(template);
                return v;
            },
            events: {
                'click button': 'signIn'
            },
            signIn: function (e) {
                e.preventDefault();

                var data = getData('mail', 'password');
                handler.signIn(data);
            }
        });

        return SignInView;
    });