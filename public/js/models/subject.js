define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var SubjectModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: C.server.routes.SJS,
            getData: function () {
                return this.get('name');
            }
        });

        return SubjectModel;
    });