
// The `Sample.FileTree` kind
// --------------------------
// This is a very special view that builds a file-tree
// from the models of its controller. It also very carefully
// elects to set the _owner_ property of its controller so
// the controller will updated it accordingly.
enyo.kind({
    name: "Sample.FileTree",
    id: "tree",
    controller: "Sample.files",
    components: [
        {classes: "file", components: [
            {components: [
                {tag: "span", classes: "title", content: "Project Files"}]}]}
    ],
    create: function () {
        this.inherited(arguments);
        // By default, when an instance of a controller is assigned to
        // a view it does not set the _owner_ property of the controller
        // to itself. If the view creates an instance of the controller
        // kind it will. In this case, it is an instance of a controller
        // that is shared by other views but it was designed to interact
        // _on_ (not just _to_) this view so we elect to set its _owner_
        // property anyways.
        this.controller.set("owner", this);
    }
});

// The `Sample.Node` kind
// ----------------------
// A special sub-kind of the _enyo.Node_ kind that will
// automatically use the correct icon accoring to the attributes
// of the model assigned to its controller.
enyo.kind({
    name: "Sample.Node",
    kind: "enyo.Node",
    controller: "enyo.ModelController",
    isDirectory: false,
    expandable: true,
    expanded: true,
    bindings: [
        {from: ".controller.isDirectory", to: ".isDirectory"},
        {from: ".controller.isFile", to: ".isFile"},
        {from: ".controller.basename", to: ".content"}
    ],
    isDirectoryChanged: function () {
        if (true === this.isDirectory) {
            this.set("icon", "assets/folder-open.png");
        }
    },
    isFileChanged: function () {
        if (true === this.isFile) {
            this.set("icon", "assets/file.png");
        }
    },
    // A computed property that is used by the _Sample.FileTree_ parent
    // when building the tree.
    model: enyo.Computed(function () {
        return this.controller? this.controller.get("model"): null;
    })
});
