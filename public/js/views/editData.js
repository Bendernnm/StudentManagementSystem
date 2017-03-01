define(['Backbone',
        'text!templates/editData.html',
        'helpers/getData',
        'const'],
    function (Backbone,
              template,
              getData,
              C) {
        var EditDataView = Backbone.View.extend({
            template: _.template(template),
            render: function () {
                var v = this;

                v.model.get('date') || v.model.set('date', 'date');
                v.model.get('phone') || v.model.set('phone', 'phone');

                var content = v.model.toJSON();
                var template = v.template(content);
                v.$el.html(template);

                return v;
            },
            events: {
                "click button": "edit"
            },
            edit: function (e) {
                e.preventDefault();

                var v = this;

                var model = v.model;
                var data = getData('name', 'date', 'phone');

                data._id = model.get('_id');
                model.urlRoot = C.server.routes.USERS;

                model.save(data, {patch: true});

                v.remove();
            }
        });

        return EditDataView;
    });