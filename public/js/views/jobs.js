define(['Backbone', 'jQuery'],
    function (Backbone, $) {
        var JobsView = Backbone.View.extend({
            tagName: 'ol',
            render: function () {
                var v = this;

                if (v.collection)
                    v.collection.each(v.addJob, v);

                return v;
            },
            addJob: function (job) {
                var v = this;
                var element = v.createElement(job.get('subject').name,
                    job.get('teacher').name, job.get('name'), job.get('rating'));
                v.$el.append(element);
            },
            createElement: function (subject, teacher, name, rating) {
                var job = subject + ' (' + teacher + ')' + ' :   ' + name + ' - ' + rating + '/100';
                var element = $('<li></li>').html(job);
                return element;
            }
        });

        return JobsView;
    });