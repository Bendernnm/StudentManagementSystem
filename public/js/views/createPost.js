define(['Backbone', 'jQuery',
        'alertify',
        '../models/post',
        'text!templates/createPost.html',
        '../const'],
    function (Backbone, $,
              alertify,
              PostModel,
              template,
              C) {
        var CreatePostView = Backbone.View.extend({
            initialize: function (options) {
                var v = this;
                v.blog = options.blog;
            },
            render: function () {
                var v = this;
                v.$el.html(template);
                return v;
            },
            events: {
                'click button': 'createPost'
            },
            createPost: function () {
                var v = this;
                var data = {
                    name: v.$el.find('[name="name"]').val(),
                    text: v.$el.find('[name="text"]').val()
                };
                data.blog = v.blog;

                var $fileInput = $('input[type="file"]')[0];
                var file = $fileInput.files && $fileInput.files[0];
                var fd = new FormData();

                fd.append('file', file);
                fd.append('data', JSON.stringify(data));

                $.ajax({
                    method: 'POST',
                    url: '/posts',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (xhr) {
                        alertify.success('Post was created.');
                    },
                    error: function (xhr) {
                        alertify.error('Post wasn\'t created.');
                    }
                });

                v.remove();
            }
        });

        return CreatePostView;
    }
);