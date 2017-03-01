define(['Backbone', 'jQuery', 'Underscore',
        './teacher',
        'text!templates/teachers.html'],
    function (Backbone, $, _,
              TeacherView,
              template) {
        var TeachersView = Backbone.View.extend({
            initialize: function (options) {
                this.access = options.access;
            },
            render: function () {
                var v = this;

                v.$el.html(template);
                v.list = v.$el.find('.teachers_list');

                if (v.collection)
                    v.collection.each(v.addTeacher.bind(v));

                return v;
            },
            addTeacher: function (teacher) {
                var v = this;

                var view = new TeacherView({
                    model: teacher,
                    access: v.access
                });

                v.list.append(view.render().$el);
            }
        });

        return TeachersView;
    });