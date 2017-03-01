define(['models/user'], function (UserModel) {
    return function (contex, urlRoot, successfulRoute, wrongRoute, callback) {
        var user = new UserModel();
        user.urlRoot = urlRoot;
        user.fetch({
            success: function (data) {
                contex.user = data;
                Backbone.history.navigate(successfulRoute, {trigger: true});

                callback && callback(user.get('name'));
            },
            error: function (data) {
                Backbone.history.navigate(wrongRoute, {trigger: true});
            }
        });
    };
});