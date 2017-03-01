define(['Backbone', 'jQuery', 'Underscore',
        'text!templates/mElement.html'],
    function (Backbone, $, _,
              template) {
        var MElementView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
                var model = v.model;

                if (model) {
                    v.listenTo(model, 'change:name', v.changeData);
                    v.listenTo(model, 'destroy', v.remove);
                }
            },
            tagName: 'li',
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = {'data': v.model.getData()};
                    var content = v.template(data);

                    v.$el.html(content);
                    v.$data = v.$el.find('.data');
                }

                return v;
            },
            changeData: function (model) {
                var v = this;
                var data = v.model.getData();
                v.$data.html(data);
            },
            events: {
                'click .fa-pencil': 'edit',
                'click .fa-trash': 'delete'
            },
            edit: function () {
                var model = this.model;

                var name = model.get('name');
                var newName = prompt('Type new name: ', name);

                var data = {name: newName};
                var patch = {patch: true};

                name !== newName && newName && model.save(data, patch);
            },
            delete: function () {
                var model = this.model;
                model.destroy();
            }
        });

        return MElementView;
    });