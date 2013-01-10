
// The `Sample.Documents` kind
// ---------------------------
// This kind is used to control the _welcome_ message, the
// file-tree and the pane showing the selected, annotated source
// file.
enyo.kind({
    name: "Sample.Documents",
    kind: "enyo.Panels",
    arrangerKind: "enyo.CollapsingArranger",
    realtimeFit: true,
    id: "documents",
    selection: null,
    // We share the _Sample.files_ controller with other views
    // and bind to its _index_ property via a two-way binding
    // to control the index of our active panel.
    controller: "Sample.files",
    ready: false,
    bindings: [
        // Note that this is a two-way binding by setting the _oneWay_ property to false.
        {from: ".controller.index", to: ".index", oneWay: false},
        // Note that we are binding the selected model of our controller to the
        // _model_ property of one of our children's controllers.
        {from: ".controller.selection", to: ".$.documentation.controller.model"},
        // We also bind the controllers selection to a local property _selection_
        // so we can have local observers respond to its changes.
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
    // Typically in _enyo.Panels_ there is a fixed height. In this application
    // however we use dynamic content injected into some of our views driven
    // by models. To properly reevaluate and adjust our height according to the
    // needs of panels after having their content set override the _reflow_
    // method to find the largest height and reset it accordingly.
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

// The `Sample.DocumentationView` kind
// -----------------------------------
// This kind is designed to show content according to the model
// that is set on its model controller.
enyo.kind({
    name: "Sample.DocumentationView",
    controller: "enyo.ModelController",
    id: "documentation",
    allowHtml: true,
    bindings: [
        {from: ".controller.documentation", to: ".content", transform: "noShowTransform"}
    ],
    // In order for the parent view's height to be adjusted accordingly, we
    // tell it to remeasure when our content changes.
    contentChanged: function () {
        this.inherited(arguments);
        this.parent.reflow();
    },
    // Since bindings will set the value, even to undefined out of the box
    // we want to keep the presentation clean even when there isn't a model
    // to read from.
    noShowTransform: function (value, direction, binding) {
        if (!enyo.exists(value)) return "";
        else return value;
    }
});
