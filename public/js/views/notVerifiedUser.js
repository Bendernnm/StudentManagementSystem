define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../collections/groups', '../collections/subjects',
        './verificationStudent', './verificationTeacher',
        'text!templates/notVerifiedUser.html',
        '../handlers/verification',
        '../helpers/showView', '../helpers/profile',
        'const'],
    function (Backbone, $, _,
              alertify,
              GroupsCollection, SubjectsCollection,
              VerificationStudentView, VerificationTeacherView,
              template,
              handler,
              show, profile,
              C) {
        var NotVerifiedUserView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                if (v.model)
                    v.listenTo(v.model, 'destroy', v.remove);
            },
            tagName: 'li',
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var object = v.model.toJSON();
                    var item = v.template(object);
                    v.$el.html(item);
                }

                return v;
            },
            events: {
                'click .fa-user-o': 'addAdmin',
                'click .fa-user-circle': 'addTeacher',
                'click .fa-user-circle-o': 'addStudent',
                'click .fa-trash-o': 'delete',
                'click img': 'profile',
                'click .user_name': 'profile'
            },
            addAdmin: function () {
                var v = this;
                var model = v.model;

                var id = model.get('_id');
                var data = {_id: id};

                var collection = model.collection;
                collection.remove(model);

                handler.verificationAdmin(data);
            },
            addTeacher: function () {
                var v = this;

                var _id = v.model.get('_id');

                var callback = {
                    success: function (data) {
                        var view = new VerificationTeacherView({
                            collection: collection,
                            model: v.model
                        });

                        show(view, C.elements.SUP);
                    },
                    error: function (data) {
                        alertify.error('Error get subjects!');
                    }
                };

                var collection = new SubjectsCollection();
                collection.fetch(callback);

            },
            addStudent: function () {
                var v = this;

                var _id = v.model.get('_id');

                var callback = {
                    success: function (data) {
                        var view = new VerificationStudentView({
                            collection: collection,
                            model: v.model
                        });

                        show(view, C.elements.SUP);
                    },
                    error: function (data) {
                        alertify.error('Error get groups!');
                    }
                };

                var collection = new GroupsCollection();
                collection.fetch(callback);
            },
            delete: function () {
                var model = this.model;
                model.urlRoot = C.server.routes.USERS;

                model.destroy();
            },
            profile: function () {
                var _id = this.model.get('_id');
                profile(_id);
            }
        });

        return NotVerifiedUserView;
    }
)
;