define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../collections/users',
        './addStudent',
        'text!templates/group.html',
        '../helpers/showView',
        '../const'],
    function (Backbone, $, _,
              alertify,
              UsersCollection,
              AddStudentView,
              template,
              show,
              C) {
        var GroupView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                if (v.model) {
                    v.model.set('sessionAccess', options.access);

                    v.listenTo(v.model, 'destroy', v.remove);
                    v.listenTo(v.model, 'change:course', v.changeCourse);
                    v.listenTo(v.model, 'change:name', v.changeName);
                }
            },
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    var content = v.template(data);

                    v.$el.html(content);
                    v.$el.css('border', '1px solid black');

                    v.$name = v.$el.find('h3 span').eq(0);
                    v.$course = v.$el.find('h3 span').eq(1);
                }

                return v;
            },
            changeCourse: function () {
                var v = this;
                var course = v.model.get('course');

                v.$course.html(course);
            },
            changeName: function () {
                var v = this;
                var name = v.model.get('name');

                v.$name.html(name);
            },
            events: {
                'click .fa-arrow-left': 'previous',
                'click .fa-arrow-right': 'next',
                'click .fa-plus-circle': 'add',
                'click .fa-pencil': 'edit',
                'click .fa-trash': 'delete',
                'click h3': 'info'
            },
            previous: function () {
                var model = this.model;

                var course = model.get('course');

                if (course < 2) return;
                course--;

                model.save({course: course}, {patch: true});
            },
            next: function () {
                var model = this.model;
                var course = model.get('course');

                if (course > 5) return;
                course++;

                model.save({course: course}, {patch: true});
            },
            add: function () {
                var v = this;
                var collection = new UsersCollection();
                collection.url = C.server.routes.USWG;

                collection.fetch({
                    success: function (data) {
                        var view = new AddStudentView({
                            collection: collection,
                            model: v.model
                        });

                        show(view, C.elements.SUP);
                    },
                    error: function (data) {
                        alertify.error('No student group.');
                    }
                });
            },
            edit: function () {
                var model = this.model;

                var name = model.get('name');
                var newName = prompt('Edit group name:', name);

                var data = {name: newName};
                var patch = {patch: true};

                name !== newName && newName && model.save(data, patch);
            },
            delete: function () {
                var model = this.model;

                var deleteCheck = confirm('Rly delete this group?');

                deleteCheck && model.destroy();
            },
            info: function () {
                var id = this.model.get('_id');
                Backbone.history.navigate(C.routes.GROUP(id), {trigger: true});
            }
        });

        return GroupView;
    });