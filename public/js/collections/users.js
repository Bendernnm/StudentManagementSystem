define(['Backbone',
        '../models/user'],
    function (Backbone,
              UserModel) {
        var UsersCollection = Backbone.Collection.extend({
            model: UserModel
        });

        return UsersCollection;
    });