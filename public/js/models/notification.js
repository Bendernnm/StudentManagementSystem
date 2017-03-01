define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var NotificationModel = Backbone.Model.extend({
            idAttribute: '_id',
        });

        return NotificationModel;
    });