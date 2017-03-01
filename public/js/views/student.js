define(['Backbone', 'jQuery', 'Underscore',
        './editData', './job',
        'text!templates/student.html',
        '../helpers/showView', '../helpers/profile',
        'const'],
    function (Backbone, $, _,
              EditDataView, JobView,
              template,
              show, profile,
              C) {
        var StudentView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
                v.id = options.id;

                if (v.model) {
                    v.model.set('number', options.number);
                    v.model.set('sessionAccess', options.access);
                    v.groupID = options.groupID;

                    v.listenTo(v.model, 'change:group', v.remove);
                    v.listenTo(v.model, 'change:name', v.updateName);
                    v.listenTo(v.model, 'change:date', v.updateDate);
                    v.listenTo(v.model, 'destroy', v.remove)
                }
            },
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    var content = v.template(data);
                    v.$el.html(content);

                    v.$name = v.$el.find('td').eq(2);
                    v.$date = v.$el.find('td').eq(3);
                }

                return v;
            },
            updateName: function () {
                var v = this;
                var name = v.model.get('name');
                v.$name.html(name);
            },
            updateDate: function () {
                var v = this;
                var date = v.model.get('date');
                v.$date.html(date);
            },
            events: {
                'click .fa-minus-circle': 'deleteStudentFromGroup',
                'click .fa-trash': 'deleteStudent',
                'click .fa-pencil': 'editStudent',
                'click .fa-sort-numeric-asc': 'sendJob',
                'click .student_name': 'profile',
                'click img': 'profile'
            },
            deleteStudentFromGroup: function () {
                console.log('deleteStudentFromGroup');
                var v = this;
                var model = v.model;
                model.save({groupID: v.groupID}, {patch: true});
            },
            deleteStudent: function () {
                var v = this;
                var model = v.model;
                var groupID = v.groupID;
                model.destroy({
                    data: $.param({
                        groupID: groupID
                    })
                });
            },
            editStudent: function () {
                var v = this;
                var view = new EditDataView({model: v.model});
                show(view, C.elements.SUP);
            },
            sendJob: function () {
                var v = this;
                var view = new JobView({model: v.model, id: v.id});
                show(view, C.elements.SUP);
            },
            profile: function () {
                var _id = this.model.get('_id');
                profile(_id);
            }
        });

        return StudentView;
    }
)
;