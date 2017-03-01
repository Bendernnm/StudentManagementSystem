define(['Backbone',
        'text!templates/menu.html'],
    function (Backbone,
              template) {
        var MenuView = Backbone.View.extend({
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var object = v.model.toJSON();
                    var menu = v.template(object);
                    v.$el.html(menu);
                }

                return v;
            }
        });

        return MenuView;
    });