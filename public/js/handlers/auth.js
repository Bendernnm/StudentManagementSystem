define(['Backbone', 'jQuery',
        'alertify',
        'const'],
    function (Backbone, $,
              alertify,
              C) {
        var server = C.server.routes;
        var methods = C.server.methods;
        var message = C.message;
        var routes = C.routes;

        var checkAuthConfig = {
            method: methods.GET,
            async: false,
            success: function (data) {
                console.log('toMain');
                Backbone.history.navigate(routes.MAIN, {trigger: true});
                return data;
            },
            error: function (data) {
                console.log('toSignIn');
                Backbone.history.navigate(routes.SIGN, {trigger: true});
                return false;
            }
        };
        var signInConfig = {
            method: methods.POST,
            success: function (data) {
                Backbone.history.navigate(routes.ROOT, {trigger: true});
                alertify.success(message.sign.in.success);
            },
            error: function (data) {
                alertify.error(message.sign.in.error);
            }
        };
        var signUpConfig = {
            method: methods.POST,
            success: function (data) {
                Backbone.history.navigate(routes.SIGN, {trigger: true});
                alertify.success(message.sign.up.success);
            },
            error: function (data) {
                alertify.error(message.sign.up.error);
            }
        };
        var signOutConfig = {
            method: methods.DELETE,
            success: function (data) {
                Backbone.history.navigate(routes.ROOT, {trigger: true});
                alertify.success(message.sign.out.success);
            },
            error: function (data) {
                Backbone.history.navigate(routes.ROOT, {trigger: true});
                alertify.error(message.sign.out.error);
            }
        };
        var forgotPasswordConfig = {
            method: methods.PATCH,
            success: function (data) {
                Backbone.history.navigate(routes.SIGN, {trigger: true});
                alertify.success(message.sign.fp.success);
            },
            error: function (data) {
                alertify.error(message.sign.fp.error);
            }
        };

        var checkAuth = function () {
            $.ajax(server.AUTH, checkAuthConfig);
        };

        var signIn = function (data) {
            signInConfig.data = data;
            $.ajax(server.SIGN, signInConfig);
        };

        var signUp = function (data) {
            $.ajax({
                url: server.SIGN_UP,
                data: data,
                method: methods.POST,
                contentType: false,
                processData: false,
                success: function (data) {
                    Backbone.history.navigate(routes.SIGN, {trigger: true});
                    alertify.success(message.sign.up.success);
                },
                error: function (data) {
                    alertify.error(message.sign.up.error);
                }
            });
        };

        var signOut = function () {
            $.ajax(server.SIGN, signOutConfig);
        };

        var forgotPassword = function (data) {
            forgotPasswordConfig.data = data;
            $.ajax(server.FP, forgotPasswordConfig);
        };


        return {
            checkAuth: checkAuth,
            signIn: signIn,
            signUp: signUp,
            signOut: signOut,
            forgotPassword: forgotPassword
        };
    });