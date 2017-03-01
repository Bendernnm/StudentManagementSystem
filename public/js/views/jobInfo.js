define(['Backbone', 'jQuery', 'Underscore',
        '../collections/subjects',
        'text!templates/jobInfo.html'],
    function (Backbone, $, _,
              SubjectsCollection,
              template) {
        var JobInfoView = Backbone.View.extend({
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    var content = v.template(data);

                    v.$el.html(content);
                    v.$list = v.$el.find('select');

                    var collection = new SubjectsCollection(v.model.get('subjects'));
                    collection.each(v.addSubject.bind(v));
                }

                return v;
            },
            getInfo: function () {
                var v = this;
                var subjectID = v.$list
                    .find('option:selected')
                    .attr('data-id');

                return subjectID;
            },
            addSubject: function (subject) {
                var v = this;

                var $el = v.createElement(subject.get('_id'), subject.get('name'));
                v.$list.append($el);
            },
            createElement: function (id, name) {
                var $el = $('<option></option>')
                    .attr('data-id', id)
                    .html(name);

                return $el;
            }
        });

        return JobInfoView;
    });