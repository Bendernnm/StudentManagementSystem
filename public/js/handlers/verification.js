define(['jQuery',
        'alertify',
        'const'],
    function ($,
              alertify,
              C) {
        var server = C.server.routes;
        var methods = C.server.methods;
        var message = C.message;
        var routes = C.routes;

        var config = {
            method: methods.PATCH,
            success: function (data) {
                alertify.success(message.vr.success);
            },
            error: function (data) {
                alertify.error(message.vr.error);
                Backbone.history.navigate(routes.ROOT, {trigger: true});
            }
        };

        var verificationAdmin = function (data) {
            config.data = data;
            $.ajax(server.VR_A, config);
        };

        var verificationStudent = function (data) {
            config.data = data;
            $.ajax(server.VR_S, config);
        };

        var verificationTeacher = function (data) {
            config.data = data;
            $.ajax(server.VR_T, config);
        };

        return {
            verificationAdmin: verificationAdmin,
            verificationStudent: verificationStudent,
            verificationTeacher: verificationTeacher
        };
    });