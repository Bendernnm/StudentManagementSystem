define(['Backbone', 'jQuery', 'Underscore',
        'alertify',
        '../models/teacher', '../models/job',
        './jobInfo',
        'text!templates/job.html'],
    function (Backbone, $, _,
              alertify,
              TeacherModel, JobModel,
              JobInfoView,
              template) {
        var JobView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.id = options.id;
            },
            render: function () {
                var v = this;

                if (v.model) {
                    v.$el.html(template);

                    v.$info = v.$el.find('.job_info');

                    var teacher = new TeacherModel({_id: v.id});
                    teacher.fetch({
                        success: function (data) {
                            v.jobInfo = new JobInfoView({model: teacher});
                            v.$info.append(v.jobInfo.render().el);
                        },
                        error: function (data) {
                            alertify.error('It is impossible to put an job.');
                        }
                    });
                }

                return v;
            },
            events: {
                'click button': 'send'
            },
            send: function () {
                var v = this;
                var data = {
                    student: v.model.get('_id'),
                    teacher: v.id,
                    subject: v.jobInfo.getInfo(),
                    name: v.$el.find('[name = name]').val(),
                    rating: v.$el.find('[name = rating]').val()
                };

                var model = new JobModel();
                model.save(data);

                v.remove();
            }
        });

        return JobView;
    });