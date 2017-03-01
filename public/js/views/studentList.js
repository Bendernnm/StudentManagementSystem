define(['Backbone', 'jQuery', 'Underscore',
        '../collections/students',
        './student',
        'text!templates/studentsList.html',
        'const'],
    function (Backbone, $, _,
              StudentsCollection,
              StudentView,
              template,
              C) {
        var StudentListView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.access = options.access;
                v.id = options.id;
            },
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    var content = v.template(data);

                    v.$el.html(content);
                    v.$table = v.$el.find('table');
                    v.count = 1;

                    var collection = new StudentsCollection(v.model.get('students'));
                    collection.each(v.addStudent.bind(v));
                }

                return v;
            },
            addStudent: function (student) {
                var v = this;

                var view = new StudentView({
                    model: student,
                    access: v.access,
                    id: v.id,
                    number: v.count++,
                    groupID: v.model.get('_id')
                });

                v.$table.append(view.render().$el);
            }
        });

        return StudentListView;
    });