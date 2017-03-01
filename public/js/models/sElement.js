define(['Backbone',
        '../const'],
    function (Backbone,
              C) {
        var SElementModel = Backbone.Model.extend({
            getData: function () {
                var course = this.get('course');
                course = course ? ' (' + course + ')  ' : '  ';
                return this.get('name') + course + ' :   ' + this.get('avg');
            }
        });

        return SElementModel;
    });