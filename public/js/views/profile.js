define(['Backbone', 'Underscore',
        '../collections/jobs',
        '../views/jobs',
        'text!templates/profile.html'],
    function (Backbone, _,
              JobsCollection,
              JobsView,
              template) {
        var ProfileView = Backbone.View.extend({
            template: _.template(template),
            render: function () {
                var v = this;

                if (v.model) {
                    var data = v.model.toJSON();
                    var content = v.template(data);
                    v.$el.html(content);
                    v.$el.css('border', '1px solid black');

                    v.$list = v.$el.find('.jobs_list');
                    
                    var jobs = new JobsCollection(v.model.get('jobs'));
                    if (jobs.length > 0) {
                        var view = new JobsView({collection: jobs});
                        
                        v.$list.append($('<h3>Jobs:</h3>'));
                        v.$list.append(view.render().el);
                    }
                }

                return v;
            }
        });

        return ProfileView;
    });