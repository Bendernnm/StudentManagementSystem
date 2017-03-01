define(['Backbone',
        'views/sElement'],
    function (Backbone,
              SElementView) {
        var SElementsView = Backbone.View.extend({
            tagName: 'ul',
            render: function () {
                var v = this;

                if (v.collection)
                    v.collection.each(v.addElement, v);

                return v;
            },
            addElement: function (element) {
                var view = new SElementView({model: element});
                this.$el.append(view.render().el);
            }
        });

        return SElementsView;
    });