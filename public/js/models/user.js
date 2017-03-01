define(['Backbone', '../const'], function (Backbone, C) {
    var UserModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: C.server.routes.AUTH
    });

    return UserModel;
});