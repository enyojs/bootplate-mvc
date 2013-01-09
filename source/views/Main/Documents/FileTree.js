
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
        this.controller.set("owner", this);
    }
});


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
    model: enyo.Computed(function () {
        return this.controller? this.controller.model: null;
    })
});
