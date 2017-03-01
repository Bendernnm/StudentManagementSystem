define(['Backbone',
        'alertify',
        '../collections/sElements',
        'views/sElements',
        'text!templates/statistics.html',
        '../helpers/draw',
        '../const'],
    function (Backbone,
              alertify,
              SElementsCollection,
              SElementsView,
              template,
              draw,
              C) {
        var statistics = C.server.routes.STTS;

        var StatisticsView = Backbone.View.extend({
            render: function () {
                var v = this;

                v.$el.html(template);
                v.$groups = v.$el.find('.statistics_group');
                v.$courses = v.$el.find('.statistics_courses');
                v.$subjects = v.$el.find('.statistics_subject');

                return v;
            },
            events: {
                'click .statistics_group button': 'getGroupsStatistics',
                'click .statistics_courses button': 'getCoursesStatistics',
                'click .statistics_subject button': 'getSubjectsStatistics'
            },
            getGroupsStatistics: function () {
                var v = this;

                var collection = new SElementsCollection();
                collection.url = statistics.GRS;

                collection.fetch({
                    success: function (data) {
                        var view = new SElementsView({collection: collection});
                        v.$groups.append(view.render().el);

                        draw('.chart_group', data.models);
                    },
                    error: function (data) {
                        alertify.error('Error get statistics.');
                    }
                });
            },
            getCoursesStatistics: function () {
                var v = this;

                var collection = new SElementsCollection();
                collection.url = statistics.CRS;

                collection.fetch({
                    success: function (data) {
                        var view = new SElementsView({collection: collection});
                        v.$courses.append(view.render().el);

                        draw('.chart_courses', data.models);
                    },
                    error: function (data) {
                        alertify.error('Error get statistics.');
                    }
                });
            },
            getSubjectsStatistics: function () {
                var v = this;

                var collection = new SElementsCollection();
                collection.url = statistics.SJS;

                collection.fetch({
                    success: function (data) {
                        var view = new SElementsView({collection: collection});
                        v.$subjects.append(view.render().el);

                        draw('.chart_subject', data.models);
                    },
                    error: function (data) {
                        alertify.error('Error get statistics.');
                    }
                });
            }
        });

        return StatisticsView;
    });