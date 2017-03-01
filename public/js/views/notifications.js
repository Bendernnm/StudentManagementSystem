define(['Backbone', 'jQuery',
        'alertify',
        './notification',
        'text!templates/notifications.html'],
    function (Backbone, $,
              alertify,
              NotificationView,
              template) {
        var NotificationsView = Backbone.View.extend({
            render: function () {
                var v = this;

                v.$el.html(template);
                v.$list = v.$el.find('ul');

                if (v.collection)
                    v.collection.each(v.addNotification, v);

                return v;
            },
            addNotification: function (notification) {
                var v = this;
                var view = new NotificationView({model: notification});

                v.$list.append(view.render().el);
            },
            events: {
                'click button': 'deleteNotifications'
            },
            deleteNotifications: function () {
                $.ajax({
                    method: 'DELETE',
                    url: 'notifications',
                    success: function (data) {
                        alertify.success('All notifications was deleted.');
                        Backbone.history.navigate('main', {trigger: true});
                    },
                    error: function (data) {
                        alertify.error('Error deleted.');
                    }
                });
            }
        });

        return NotificationsView;
    });