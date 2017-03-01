define(['Backbone', 'Underscore',
        'views/notVerifiedUser',
        'text!templates/notVerifiedUsers.html'],
    function (Backbone, _,
              NotVerifiedUserView,
              template) {
        var NotVerifiedUsersView = Backbone.View.extend({
            childrenView: {},
            initialize: function () {
                var v = this;

                v.listenTo(v.collection, 'remove', v.removeUser);
                v.listenTo(v.collection, 'remove', v.updateLength);
            },
            render: function () {
                var v = this;
                v.$el.html(template);
                v.list = v.$el.find('ol');
                v.length = v.$el.find('h2 b');

                if (v.collection) {
                    v.collection.each(_.bind(v.addUser, v));

                    var length = v.collection.length;
                    v.length.text(length);
                }

                return v;
            },
            addUser: function (user) {
                var v = this;
                var index = user.cid;
                v.childrenView[index] = new NotVerifiedUserView({model: user});
                v.list.append(v.childrenView[index].render().el);
            },
            removeUser: function (user) {
                var v = this;

                var index = user.cid;
                v.childrenView[index].remove();
                delete v.childrenView[index];
            },
            updateLength: function () {
                var v = this;
                var length = v.collection.length;
                v.length.text(length);
            }
        });

        return NotVerifiedUsersView;
    });