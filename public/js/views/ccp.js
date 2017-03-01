define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../collections/groups', '../collections/subjects',
        './mEdit', './mCreate',
        'text!templates/ccp.html'],
    function (Backbone, $, _,
              alertify,
              GroupsCollection, SubjectsCollection,
              MEditView, MCreateView,
              template) {
        var CCPView = Backbone.View.extend({
            render: function () {
                var v = this;

                v.$el.html(template);
                v.$mg = v.$el.find('.mg');
                v.$ms = v.$el.find('.ms');

                var groups = new GroupsCollection();
                groups.fetch({
                    success: function (data) {
                        var edit = new MEditView({
                            collection: groups,
                            name: 'Groups'
                        });
                        var create = new MCreateView({
                            collection: groups
                        });

                        v.$mg.append(edit.render().el);
                        v.$mg.append(create.render().el);
                    },
                    error: function (data) {
                        alertify.error('No group.');
                    }
                });

                var subjects = new SubjectsCollection();
                subjects.fetch({
                    success: function (data) {
                        var edit = new MEditView({
                            collection: subjects,
                            name: 'Subjects'
                        });
                        var create = new MCreateView({
                            collection: subjects
                        });

                        v.$ms.append(edit.render().el);
                        v.$ms.append(create.render().el);
                    },
                    error: function (data) {
                        alertify.error('No subject.');
                    }
                });

                return v;
            }
        });

        return CCPView;
    });