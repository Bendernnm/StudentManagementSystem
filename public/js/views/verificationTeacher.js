define(['Backbone', 'jQuery',
        './subjectElement',
        '../handlers/verification',
        'text!templates/verificationTeacher.html'],
    function (Backbone, $,
              SubjectElementView,
              handler,
              template) {
        var VerificationTeacherView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.model = options.model;
                v._id = v.model.get('_id');
            },
            render: function () {
                var v = this;
                v.$el.html(template);
                v.list = v.$el.find('.subject_list');

                return v;
            },
            events: {
                'click .add': 'add',
                'click .verification_btn': 'send'
            },
            add: function () {
                var v = this;
                var item = new SubjectElementView({collection: v.collection}).render().el;

                v.list.append(item);
            },
            send: function () {
                var v = this;
                var list = v.list.find('select');
                var subjects = [];

                _.each(list, function (item) {
                    var id = $(item)
                        .find('option:selected')
                        .attr('data-id');

                    subjects.push(id);
                });

                subjects = _.uniq(subjects);
                
                var data = {
                    teacherID: v._id,
                    subjects: subjects
                };

                var model = v.model;
                var collection = model.collection;
                collection.remove(model);

                handler.verificationTeacher(data);
                
                v.remove();
            }
        });

        return VerificationTeacherView;
    });