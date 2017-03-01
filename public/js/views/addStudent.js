define(['Backbone', 'jQuery', 'Underscore',
        '../models/user',
        'text!templates/addStudent.html',
        '../const'],
    function (Backbone, $, _,
              UserModel,
              template,
              C) {
        var AddStudentView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
            },
            render: function () {
                var v = this;

                console.log(v.collection);
                v.$el.html(template);
                v.$list = v.$el.find('select');

                if (v.collection)
                    v.collection.each(_.bind(v.addStudent, v));


                return v;
            },
            addStudent: function (student) {
                var v = this;

                var _id = student.get('_id');
                var name = student.get('name');

                var item = v.createItem()
                    .attr('data-id', _id)
                    .html(name);

                v.$list.append(item);
            },
            createItem: function () {
                return $('<option></option>');
            },
            events: {
                'click button': 'send'
            },
            send: function () {
                var v = this;

                var _id = v.$list
                    .find('option:selected')
                    .attr('data-id');

                var model = new UserModel({_id: _id});
                model.urlRoot = C.server.routes.USWG;

                var data = {
                    group: v.model.get('_id')
                };
                var options = {patch: true};
                model.save(data, options);

                v.remove();
            }
        });

        return AddStudentView;
    });