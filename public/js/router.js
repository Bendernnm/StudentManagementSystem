define(['Backbone', 'jQuery',
        'alertify',
        'models/user', 'models/group', 'models/profile',
        'collections/users', 'collections/teachers', 'collections/groups', 'collections/notifications',
        'views/signIn', 'views/signUp', 'views/forgotPassword', 'views/hello', 'views/status', 'views/menu', 'views/notVerifiedUser', 'views/notVerifiedUsers', 'views/teachers', 'views/groups', 'views/studentList', 'views/blogsPage', 'views/profile', 'views/ccp', 'views/statistics', 'views/notifications',
        'handlers/auth',
        'helpers/clear', 'helpers/showView', 'helpers/getUser', 'helpers/socket',
        'const'],
    function (Backbone, $,
              alertify,
              UserModel, GroupModel, ProfileModel,
              UsersCollection, TeachersCollection, GroupsCollection, NotificationsCollection,
              SignInView, SignUpView, ForgotPasswordView, HelloView, StatusView, MenuView, NotVerifiedUserView, NotVerifiedUsersView, TeachersView, GroupsView, StudentListView, BlogsPageView, ProfileView, CCPView, StatisticsView, NotificationsView,
              authHandler,
              clear, show, getUser, socket,
              C) {
        var routes = C.routes;
        var server = C.server.routes;
        var $MAIN = C.elements.MAIN;

        var Router = Backbone.Router.extend({
            initialize: function () {
                Backbone.history.start();
            },
            routes: {
                '': 'root',
                'main': 'main',
                'signIn': 'signIn',
                'signUp': 'signUp',
                'signOut': 'signOut',
                'forgotPassword': 'forgotPassword',
                'verification': 'verification',
                'teachers': 'teachers',
                'groups': 'groups',
                'groups/:id': 'group',
                'blogs': 'blogs',
                'profile/:id': 'profile',
                'ccp': 'ccp',
                'statistics': 'statistics',
                'notification': 'notification'
            },
            root: function () {
                console.log('#root');
                var r = this;

                getUser(r, server.AUTH, routes.MAIN, routes.SIGN, socket.send);
            },
            main: function () {
                console.log('#main');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var model = r.user;

                var main = new HelloView();
                show(main, $MAIN);

                var menu = new MenuView({model: model});
                show(menu, C.elements.MENU);

                var profile = new StatusView({model: model});
                show(profile, C.elements.PROFILE);
            },
            signIn: function () {
                console.log('#signIn');
                clear.all();

                var view = new SignInView();
                show(view, $MAIN);
            },
            signUp: function () {
                console.log('#signOut');
                clear.all();

                var view = new SignUpView();
                show(view, $MAIN);
            },
            signOut: function () {
                console.log('#signOut');
                authHandler.signOut();
            },
            forgotPassword: function () {
                console.log('#forgotPassword');
                clear.all();

                var view = new ForgotPasswordView();
                show(view, $MAIN);
            },
            verification: function () {
                console.log('#verification');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                var access = r.user.get('access');
                if (access & 8) {
                    clear.sup();

                    var collection = new UsersCollection();
                    collection.url = server.VR;

                    collection.fetch({
                        success: function () {
                            var view = new NotVerifiedUsersView({collection: collection});
                            show(view, $MAIN);
                        },
                        error: function () {
                            alertify.error('Verification error!');
                            Backbone.history.navigate(C.routes.ROOT, {trigger: true});
                        }
                    });
                }
                else {
                    alertify.error('Denied access!');
                    Backbone.history.navigate(C.routes.MAIN, {trigger: true});
                }
            },
            teachers: function () {
                console.log('#teachers');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var collection = new TeachersCollection();
                collection.fetch({
                    success: function (data) {
                        var view = new TeachersView({
                            collection: collection,
                            access: r.user.get('access')
                        });
                        show(view, $MAIN);
                    },
                    error: function (data) {
                        alertify.error('Can\'t get teachers, try again later.');
                        Backbone.history.navigate('main', {trigger: true});
                    }
                });

            },
            groups: function () {
                console.log('#groups');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var collection = new GroupsCollection();
                collection.fetch({
                    success: function (data) {
                        var access = r.user.get('access');

                        var view = new GroupsView({
                            collection: collection,
                            access: access
                        });
                        show(view, $MAIN);
                    },
                    error: function (data) {
                        alertify.error('Can\'t get groups, try again later.');
                        Backbone.history.navigate('main', {trigger: true});
                    }
                });
            },
            group: function (id) {
                console.log('#group/' + id);
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var model = new GroupModel({_id: id});

                model.fetch({
                    success: function (data) {
                        var view = new StudentListView({
                            model: model,
                            access: r.user.get('access'),
                            id: r.user.get('_id')
                        });
                        show(view, $MAIN);
                    },
                    error: function (data) {
                        alertify.error('Can\'t get group, try again later.');
                        Backbone.history.navigate('groups', {trigger: true});
                    }
                });
            },
            blogs: function () {
                console.log('#blogs');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var view = new BlogsPageView({
                    sessionAccess: r.user.get('access'),
                    author: r.user.get('name'),
                    authorID: r.user.get('_id')
                });

                show(view, $MAIN);
            },
            profile: function (id) {
                console.log('#profile/' + id);
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var model = new ProfileModel({_id: id});
                model.fetch({
                    success: function (data) {
                        var view = new ProfileView({model: model});
                        show(view, $MAIN);
                    },
                    error: function (data) {
                        alertify.error('Profile error.');
                        Backbone.history.navigate('main', {trigger: true});
                    }
                });
            },
            ccp: function () {
                console.log('#ccp');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                var access = r.user.get('access');
                if (access & 8) {
                    clear.sup();

                    var access = r.user.get('access');

                    var view = new CCPView();
                    show(view, $MAIN);
                }
                else {
                    alertify.error('Denied access!');
                    Backbone.history.navigate(C.routes.MAIN, {trigger: true});
                }
            },
            statistics: function () {
                console.log('#statistics');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var view = new StatisticsView();
                show(view, $MAIN);
            },
            notification: function () {
                console.log('#notification');
                var r = this;
                if (!r.user) return getUser(r, server.AUTH, routes.ROOT, routes.SIGN);

                clear.sup();

                var collection = new NotificationsCollection();
                collection.fetch({
                    success: function (data) {
                        if (collection.length === 0)
                            return Backbone.history.navigate('main', {trigger: true});

                        var view = new NotificationsView({collection: collection});
                        show(view, $MAIN);

                    },
                    error: function (data) {
                        alertify.error('Error notification');
                    }
                });
            }
        });

        return Router;
    });