define(['Backbone', 'jQuery',
        'text!templates/subjectElement.html'],
    function (Backbone, $,
              template) {
        var SubjectElementView = Backbone.View.extend({
            render: function () {
                var v = this;

                v.$el.html(template);
                v.list = v.$el.find('select');

                if (v.collection)
                    v.collection.each(_.bind(v.addSubject, v));

                return v;
            },
            addSubject: function (subject) {
                var v = this;

                var _id = subject.get('_id');
                var name = subject.get('name');

                var item = v.createItem();
                item.attr('data-id', _id);
                item.html(name);

                v.list.append(item);
            },
            createItem: function () {
                return $('<option></option>');
            },
            events: {
                'click .remove': 'delete'
            },
            delete: function (e) {
                e.preventDefault();

                var v = this;
                v.remove();
            }
        });
        
        return SubjectElementView;
    });