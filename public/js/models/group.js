define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var GroupModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.GRS,
            getData: function () {
                return this.get('name') + ' (' + this.get('course') + ')';
            }
        });

        return GroupModel;
    });