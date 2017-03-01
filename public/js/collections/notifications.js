define(['Backbone',
        '../models/notification',
        '../const'],
    function (Backbone,
              NotificationModel,
              C) {
        var NotificationsCollection = Backbone.Collection.extend({
            url: C.server.routes.NTFS,
            model: NotificationModel
        });

        return NotificationsCollection;
    });