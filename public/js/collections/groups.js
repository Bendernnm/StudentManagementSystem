define(['Backbone',
        '../models/group',
        '../const'],
    function (Backbone,
              GroupModel,
              C) {
        var GroupsCollection = Backbone.Collection.extend({
            model: GroupModel,
            url: C.server.routes.GRS
        });
        
        return GroupsCollection;
    });