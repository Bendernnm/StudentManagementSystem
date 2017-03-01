define(['Backbone'],
    function (Backbone) {
        var SElementView = Backbone.View.extend({
            tagName: 'li',
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.getData();
                    v.$el.html(data);
                }

                return v;
            }
        });

        return SElementView;
    });