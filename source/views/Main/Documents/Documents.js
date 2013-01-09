
enyo.kind({
    name: "Sample.Documents",
    kind: "enyo.Panels",
    arrangerKind: "enyo.CollapsingArranger",
    realtimeFit: true,
    id: "documents",
    selection: null,
    controller: "Sample.files",
    ready: false,
    bindings: [
        {from: ".controller.index", to: ".index", oneWay: false},
        {from: ".controller.selection", to: ".$.documentation.controller.model"},
        {from: ".controller.selection", to: ".selection"},
        {from: ".controller.ready", to: ".ready"}
    ],
    components: [
        {name: "welcome", allowHtml: true, classes: "documents-panel"},
        {name: "tree", kind: "Sample.FileTree", classes: "documents-panel layered"},
        {name: "documentation", fit: true, kind: "Sample.DocumentationView", classes: "documents-panel layered"}
    ],
    create: function () {
        this.inherited(arguments);
        this.get("welcome");
    },
    selectionChanged: function () {
        var selection = this.get("selection");
        var index = this.get("index");
        var ready = this.ready;
        if (selection && ready) {
            this.set("index", 2);
        } else if (0 !== index) this.set("index", 1);
    },
    // This is a computed property that, on its initial
    // request will issue an asynchronous ajax call for
    // the file content (html).
    welcome: enyo.Computed(function (xhr, content) {
        var child = this.$.welcome;
        if (content) {
            // If the content parameter exists then we are
            // being called as a setter.
            child.set("content", content);
            this.reflow();
        } else {
            // We need to issue the ajax request for the
            // html content of our welcome child-view.
            var xhr = new enyo.Ajax({url: "assets/Welcome.html", handleAs: "text"});
            xhr.response(enyo.bind(this, this.welcome)).go();
        }
    }),
    reflow: function () {
        var height = 0;
        this.inherited(arguments);
        enyo.forEach(this.children, function (child) {
            var ch;
            child.applyStyle("bottom", "auto");
            ch = child.getBounds().height;
            if (ch > height) height = ch;
            child.applyStyle("bottom", 0);
        });
        this.applyStyle("height", height + "px");
    }
});

enyo.kind({
    name: "Sample.DocumentationView",
    controller: "enyo.ModelController",
    id: "documentation",
    allowHtml: true,
    bindings: [
        {from: ".controller.documentation", to: ".content", transform: "safely"}
    ],
    contentChanged: function () {
        this.log();
        this.inherited(arguments);
        this.parent.reflow();
    },
    safely: function (value, direction, binding) {
        if (!enyo.exists(value)) return "";
        else return value;
    }
});
