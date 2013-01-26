
// The `Sample.FilesController` kind
// ---------------------------------
// An overloaded _enyo.CollectionController_ shared by
// multiple views and owned by one (_Sample.FileTree_).
// As its _models_ changes it creates the nodes according
// to their paths effectively recreating the tree of the
// files and directories in our view.
enyo.kind({
    name: "Sample.FilesController",
    kind: "enyo.CollectionController",
    // This is a class of _Backbone.Collection_.
    collection: "Sample.NodeCollection",
    // Since we have set a _url_ property (or you could have
    // overloaded the _sync_ method of the Backbone.Collection
    // according to its API) we can set the _autoLoad_ flag to
    // true and it will fire off the asynchronous request.
    autoLoad: true,
    // We initialize a property called _index_ that will be shared
    // around the application to control its state.
    index: 0,
    ready: false,
    handlers: {
        // A special event fired by collection controllers when their
        // underlying _Backbone.Collection_ is reset.
        didreset: "didReset"
    },
    didReset: function () {
        this.syncModelsToNodes();
    },
    back: function () {
        var idx = this.get("index");
        if (0 === idx) return;
        else this.set("index", --idx);
    },
    filename: function (sender, event) {
        if (event.originator.get("content")) {
            this.set("index", 2);
        }
    },
    files: function () {
        this.set("index", 1);
    },
    welcome: function () {
        this.set("index", 0);
    },
    syncModelsToNodes: function () {
        var models = this.models;
        var model;
        enyo.forEach(models, function (model) {
            this.addNodeForModel(model);
        }, this);
        model = this.collection.where({basename: "start.js"})[0];
        this.select(model);
        this.owner.parent.reflow();
        this.set("ready", true);
    },
    addNodeForModel: function (model) {
        var parent = model.get("parent");
        var view = this.owner;
        var path = model.get("path");
        var basename = model.get("basename");
        var node;
        if (!parent) {
            node = view.createComponent({
                name: "root",
                kind: "Sample.Node"
            });
        } else {
            parent = this.getFilePath(parent);
            node = parent.createComponent({
                name: basename,
                kind: "Sample.Node"
            });
        }
        // Note this is one-way entry for this view-kind
        // as it was not designed to worry about removal
        // of nodes once they are entered. If this was to be used
        // and allow the removal of nodes it would need to cleanup
        // the stored references.
        this.setFilePath(path, node);
        node.controller.set("model", model);
        view.render();
    },
    setFilePath: function (path, node) {
        if ("/" !== path) path = "/." + path.split("/").join("_files_.");
        return this.set(path, node);
    },
    getFilePath: function (path) {
        if ("/" !== path) path = "/." + path.split("/").join("_files_.");
        return this.get(path);
    },
    nodeTap: function (sender, event) {
        var model = event.originator.get("model");
        if (model.get("isFile")) {
            this.select(model);
        }
    }
});
