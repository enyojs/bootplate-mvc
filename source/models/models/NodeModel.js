
// The `Sample.NodeModel`
// --------------------------
// Models are native Backbone models and should be implemented
// according to their API. This particular model is used to construct
// the file-tree of source files.
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
