
// The `Sample.NodeCollection`
// ---------------------------
// The _Sample.NodeCollection_ uses the built-in _sync_ mechanism
// of _Backbone_ by setting a _url_ value. In this case it is pointing
// directly at a JSON manifest of data from which it will constrcuct the
// records for the file-tree.
enyo.ready(function () {
    Sample.NodeCollection = Backbone.Collection.extend({
        model: Sample.NodeModel,
        url: "assets/filestructure.json"
    });
});
