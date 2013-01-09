
enyo.ready(function () {
    Sample.NodeModel = Backbone.Model.extend({
        defaults: {
            isDirectory: false,
            isFile: true,
            parent: null,
            path: "",
            basename: ""
        }
    });
});
