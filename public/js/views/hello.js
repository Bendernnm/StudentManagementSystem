define(['Backbone',
        'text!templates/hello.html'],
    function (Backbone,
              template) {
        var HelloView = Backbone.View.extend({
            render: function () {
                var v = this;
                v.$el.html(template);
                return this;
            }
        });

        return HelloView;
    });