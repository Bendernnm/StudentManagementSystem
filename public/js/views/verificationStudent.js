define(['Backbone', 'jQuery',
        '../handlers/verification',
        'text!templates/verificationStudent.html'],
    function (Backbone, $,
              handler,
              template) {
        var VerificationStudentView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;

                v.model = options.model;
                v._id = v.model.get('_id');
            },
            render: function () {
                var v = this;

                v.$el.html(template);
                v.list = v.$el.find('select');

                if (v.collection)
                    v.collection.each(_.bind(v.addGroup, v));


                return v;
            },
            addGroup: function (group) {
                var v = this;

                var _id = group.get('_id');
                var name = group.get('name');
                var course = group.get('course');
                var text = name + ' (' + course + ')';

                var item = v.createItem();
                item.attr('data-id', _id);
                item.html(text);

                v.list.append(item);
            },
            createItem: function () {
                return $('<option></option>');
            },
            events: {
                'click button': 'send'
            },
            send: function () {
                var v = this;

                var id = v.list
                    .find('option:selected')
                    .attr('data-id');

                var data = {
                    groupID: id,
                    studentID: v._id
                };

                var model = v.model;
                var collection = model.collection;
                collection.remove(model);

                handler.verificationStudent(data);

                v.remove();
            }
        });

        return VerificationStudentView;
    });