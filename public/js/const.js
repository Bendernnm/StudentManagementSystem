define([], function () {
    return {
        elements: {
            HD: 'header',
            MENU: '.menu',
            PROFILE: '.profile',
            FT: 'footer',
            WRAP: '#wrapper',
            MAIN: '#main',
            SUP: '#support'
        },
        routes: {
            ROOT: '',
            MAIN: 'main',
            SIGN_UP: 'signUp',
            SIGN: 'signIn',
            SIGN_OUT: 'signOut',
            FORGOT_PASSWORD: 'forgotPassword',
            BLOGS: 'blogs',
            BLOG: 'blogs/:id',
            GROUPS: 'groups',
            GROUP: function (id) {
                return 'groups/' + id;
            },
            TEACHERS: 'teachers',
            TEACHER: 'teacher',
            PROFILE: function (id) {
                return 'profile/' + id;
            }
        },
        message: {
            sign: {
                in: {
                    success: 'Successful sign in.',
                    error: 'Logon failure.'
                },
                up: {
                    success: 'Successful sign up.',
                    error: 'Registration error.'
                },
                out: {
                    success: 'Successful exit.',
                    error: 'Fatal error.'
                },
                fp: {
                    success: 'Password changed.',
                    error: 'Password didn\'t change.'
                }
            },
            vr: {
                success: 'Verified user.',
                error: 'User can not be verified.'
            },
            bg: {
                create: 'Blog created.',
                delete: 'Blog deleted.',
                follow: 'Followers.',
                post: {
                    create: 'Post created.',
                    delete: 'Post deleted.'
                }
            }
        },
        server: {
            routes: {
                AUTH: 'auth',
                SIGN: 'auth/sign',
                SIGN_UP: '/auth/registration',
                FP: 'auth/forgotPassword',
                VR: 'auth/verification',
                VR_A: 'auth/verification/admin',
                VR_T: 'auth/verification/teacher',
                VR_S: 'auth/verification/student',
                USERS: 'users',
                GRS: 'groups',
                SJS: 'subjects',
                TCHS: 'users/teachers',
                STS: 'users/students',
                JBS: 'jobs',
                BGS: 'blogs',
                PTS: 'posts',
                CMS: function (id) {
                    return 'posts/' + id + '/comments';
                },
                PR: 'profiles',
                STTS: {
                    ROOT: 'statistics',
                    GRS: 'statistics/groups',
                    CRS: 'statistics/courses',
                    SJS: 'statistics/subjects'
                },
                USWG: 'users/students/studentWithoutGroup',
                NTFS: 'notifications'
            },
            methods: {
                GET: 'GET',
                POST: 'POST',
                DELETE: 'DELETE',
                PUT: 'PUT',
                PATCH: 'PATCH'
            }
        }
    };
});