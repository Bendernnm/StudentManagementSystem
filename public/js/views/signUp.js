define(['Backbone', 'jQuery',
        'text!templates/signUp.html',
        'handlers/auth',
        'helpers/getData'],
    function (Backbone, $,
              template,
              handlers,
              getData) {
        var SignUpView = Backbone.View.extend({
            render: function () {
                var v = this;
                v.$el.html(template);
                return v;
            },
            events: {
                "click button": "signUp"
            },
            signUp: function (e) {
                e.preventDefault();

                var data = getData('name', 'date',
                    'mail', 'phone', 'password',
                    'secretQuestion');


                var $fileInput = $('#fileInput')[0];
                var file = $fileInput.files && $fileInput.files[0];
                var fd = new FormData();

                fd.append('avatar', file);
                fd.append('data', JSON.stringify(data));

                handlers.signUp(fd);
            }
        });

        return SignUpView;
    });