define(['Backbone', 'jQuery', 'Underscore',
        './group',
        'text!templates/groups.html'],
    function (Backbone, $, _,
              GroupView,
              template) {
        var GroupsView = Backbone.View.extend({
            initialize: function (options) {
                this.access = options.access;
            },
            render: function () {
                var v = this;

                v.$el.html(template);
                v.$list = v.$el.find('.groups_list');

                if (v.collection)
                    v.collection.each(v.addGroup.bind(v));

                return v;
            },
            addGroup: function (group) {
                var v = this;

                var view = new GroupView({
                    model: group,
                    access: v.access
                });

                v.$list.append(view.render().$el);
            }
        });

        return GroupsView;
    });