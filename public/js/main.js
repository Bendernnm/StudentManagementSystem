require.config({
    paths: {
        jQuery: 'libs/jquery/dist/jquery',
        Underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone',
        text: 'libs/text/text',
        alertify: 'libs/alertify.js/lib/alertify',
        d3: 'libs/d3/d3',
        moment:'libs/moment/moment',
        templates: '../templates',
        socketio: '/socket.io/socket.io'
    },
    shim: {
        Underscore: {
            exports: '_'
        },
        jQuery: {
            exports: '$'
        },
        'Backbone': ['Underscore', 'jQuery'],
        'app': ['Backbone']
    }
});
require(['app', 'socketio'], function (app, io) {
    app();
});