define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../collections/subjects',
        './editData', './editSubjects',
        'text!templates/teacher.html',
        '../helpers/showView', '../helpers/profile',
        'const'],
    function (Backbone, $, _,
              alertify,
              SubjectsCollection,
              EditDataView, EditSubjectsView,
              template,
              show, profile,
              C) {
        var TeacherView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
                if (v.model) {
                    v.model.set('sessionAccess', options.access);

                    v.listenTo(v.model, 'destroy', v.remove);
                    v.listenTo(v.model, 'change:name', v.editName);
                    v.listenTo(v.model, 'change:subjects', v.addSubjects);
                }
            },
            template: _.template(template),
            render: function () {
                var v = this;
                var model = v.model;

                if (model) {
                    var data = model.toJSON();
                    var content = v.template(data);

                    v.$el.html(content);
                    v.$el.css('border', '1px solid black');

                    v.$list = v.$el.find('ul');
                    v.$name = v.$el.find('h2');

                    v.addSubjects(model);
                }

                return v;
            },
            addSubjects: function (model) {
                var v = this;

                v.$list.html('');

                var subjects = model.get('subjects');
                _.each(subjects, v.addSubject, v);
            },
            addSubject: function (subject) {
                var v = this;
                v.$list.append($('<li></li>').text(subject.name));
            },
            editName: function (model) {
                var v = this;
                var name = model.get('name');

                v.$name.html(name);
            },
            editSubjects: function (model) {
                console.log('editSubjects');
                console.log(model);
            },
            events: {
                'click .fa-plus': 'editNewSubject',
                'click .fa-pencil': 'edit',
                'click .fa-trash-o': 'delete',
                'click h2': 'profile',
                'click img': 'profile'
            },
            editNewSubject: function () {
                var v = this;

                var callback = {
                    success: function (data) {
                        var view = new EditSubjectsView({
                            collection: v.collection,
                            model: v.model
                        });

                        show(view, C.elements.SUP);
                    },
                    error: function (data) {
                        alertify.error('Error get subjects!');
                    }
                };

                v.collection = new SubjectsCollection();
                v.collection.fetch(callback);
            },
            edit: function () {
                var v = this;
                var view = new EditDataView({model: v.model});
                show(view, C.elements.SUP);
            },
            delete: function () {
                var v = this;

                var model = v.model;

                model.urlRoot = C.server.routes.TCHS;
                model.destroy();
            },
            profile: function () {
                var _id = this.model.get('_id');
                profile(_id);
            }
        });

        return TeacherView;
    });