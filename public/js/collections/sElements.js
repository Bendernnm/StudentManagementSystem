define(['Backbone',
        '../models/sElement',
        '../const'],
    function (Backbone,
              SElementModel,
              C) {
        var SElementsCollection = Backbone.Collection.extend({
            model: SElementModel,
            url: C.server.routes.STTS.ROOT
        });

        return SElementsCollection;
    });