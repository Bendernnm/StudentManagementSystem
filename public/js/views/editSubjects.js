define(['Backbone', 'jQuery', 'Underscore',
        './subjectElement',
        'text!templates/editSubjects.html'],
    function (Backbone, $, _,
              SubjectElementView,
              template) {
        var EditSubjectsView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.listenTo(v.model, 'sync', v.remove);
            },
            render: function () {
                var v = this;

                v.$el.html(template);
                v.list = v.$el.find('.subject_list');

                return v;
            },
            events: {
                'click .add': 'add',
                'click .edit': 'send'
            },
            add: function () {
                var v = this;
                var view = new SubjectElementView({collection: v.collection});
                v.list.append(view.render().el);
            },
            send: function () {
                var v = this;
                var model = v.model;

                var subjects = [];

                var list = v.list.find('select');
                _.each(list, function (item) {
                    var id = $(item)
                        .find('option:selected')
                        .attr('data-id');

                    subjects.push(id);
                });

                subjects = _.uniq(subjects);

                var data = {
                    subjects: subjects
                };
                var patch = {patch: true};
                model.save(data, patch);
            }
        });

        return EditSubjectsView;
    });