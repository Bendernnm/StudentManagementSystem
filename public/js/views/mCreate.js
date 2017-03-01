define(['Backbone', 'jQuery', 'Underscore',
        'text!templates/mCreate.html'],
    function (Backbone, $, _,
              template) {
        var MCreateView = Backbone.View.extend({
            render: function () {
                var v = this;
                v.$el.html(template);
                return v;
            },
            events: {
                'click button': 'create'
            },
            create: function () {
                var v = this;
                var collection = v.collection;

                var name = v.$el.find('[name="name"]').val();
                var data = {name: name, course: 1};

                collection && collection.create(data);
            }
        });

        return MCreateView;
    });