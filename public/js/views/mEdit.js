define(['Backbone', 'jQuery', 'Underscore',
        './mElement',
        'text!templates/mEdit.html'],
    function (Backbone, $, _,
              MElementView,
              template) {
        var MEditView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
                var collection = v.collection;

                v.name = options.name;

                if (collection)
                    v.listenTo(collection, 'add', v.addElement);
                
            },
            template: _.template(template),
            render: function () {
                var v = this;

                var data = {name: v.name};
                var content = v.template(data);
                v.$el.html(content);

                v.$list = v.$el.find('ul');

                if (v.collection)
                    v.collection.each(v.addElement, v);

                return v;
            },
            addElement: function (element) {
                var v = this;

                var view = new MElementView({model: element});
                v.$list.append(view.render().el);
            }
        });

        return MEditView;
    });