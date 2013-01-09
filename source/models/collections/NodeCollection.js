
enyo.ready(function () {
    Sample.NodeCollection = Backbone.Collection.extend({
        model: Sample.NodeModel,
        url: "assets/filestructure.json"
    });
});
