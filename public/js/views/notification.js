define(['Backbone',
        'text!templates/notification.html'],
    function (Backbone,
              template) {
        var NotificationView = Backbone.View.extend({
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    var content = v.template(data);

                    v.$el.html(content);
                }

                return v;
            }
        });

        return NotificationView;
    });