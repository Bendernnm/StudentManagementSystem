define(['Backbone',
        'text!templates/forgotPassword.html',
        'handlers/auth',
        'helpers/getData'],
    function (Backbone,
              template,
              handler,
              getData) {
        var ForgotPasswordView = Backbone.View.extend({
            render: function () {
                var v = this;
                v.$el.html(template);
                return v;
            },
            events: {
                'click button': 'forgotPassword'
            },
            forgotPassword: function (e) {
                e.preventDefault();

                var data = getData('mail', 'secretQuestion');
                handler.forgotPassword(data);
            }

        });

        return ForgotPasswordView;
    });