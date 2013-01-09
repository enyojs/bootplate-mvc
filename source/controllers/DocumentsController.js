(function () {

    // Locally-scoped variable that contains the fixed names of each of
    // the documentation files we're going to load via `enyo.Ajax` calls.
    var documents = [ "RootView", "PanelsController", "start", "Divider",
        "Documents", "DocumentsController", "Editor", "EditorController",
        "FitToTargetBoundsLayout", "Main", "Roller", "RollerCollection",
        "RollerLayout", "RollerModel", "RollerPanel", "Scaffold",
        "Toolbar", "Welcome", "Sample"];
    
    // Locally-scoped variable that is the known root of all file requests.
    // It is used with `enyo.format` to format the appropriate string
    // for the individual file paths.
    var root = "assets/docco/generated/%..html";
    
    // Locally-scoped method to load each of the known document sources.
    // It simply iterates over the set of known pagelet files and calls
    // the loader method.
    var loadDocs = function (target) {
        var loaded = enyo.bind(target, target.loadedDoc);
        enyo.forEach(documents, function (doc) {
           var src = enyo.format(root, doc);
           loadDoc(src, loaded);
        });
    };
        
    // Locally-scoped method that issues a request using `enyo.Ajax` and
    // sets the responder to the one provided in the `loaded` parameter.
    var loadDoc = function (src, loaded) {
        var xhr = new enyo.Ajax({url: src, handleAs: "text"});
        xhr.response(loaded).go();
    };
    
    // The `Sample.DocumentsController` kind
    // -------------------------------------
    // `Sample.DocumentsController` is derived from `enyo.ArrayController`,
    // a kind designed to act like an array, but with support for bindings
    // and observers. Because it inherits from `enyo.Controller`, it can
    // have multiple event targets, which makes it a perfect fit for our
    // present needs.
    //
    // A singleton instance of this kind is created in `Sample.js` and
    // shared between the `Documents.js` view and the `Divider.js` view.
    // Neither view is aware of the other, but `Divider.js` dispatches its
    // events to this controller, and when the `selected` property changes,
    // the `Documents.js` view responds.
    enyo.kind({
        name: "Sample.DocumentsController",
        kind: "enyo.ArrayController",
        handlers: {
            onSelect: "selectSource",
            ontap: "selectSource"
        },
        selected: 0,
        create: function () {
            this.inherited(arguments);
            loadDocs(this);
        },
        // Once a document/pagelet is loaded via Ajax, we create an entry
        // for it. If it is the "Welcome" pagelet, we go ahead and select
        // it. Because the loading transactions are asynchronous, we don't
        // know what the index will be.
        loadedDoc: function (xhr, content) {
            var idx = this.push({src: xhr.url, content: content})-1;
            if (xhr.url.indexOf("Welcome") > -1) {
                this.set("selected", idx);
            }
        },
        // We've mapped the `onSelect` and `ontap` events to this handler.
        // When those events are fired, we attempt to find a matching
        // entry in our set of known documents/pagelets by calling the
        // `find` method on `enyo.ArrayController`.
        selectSource: function (sender, event) {
            var content;
            var target;
            var found;
            content = event.content || event.originator.content;
            content = content.replace(/\.js/, "") + ".html";
            found = this.find(function (val) {
                return val.src.indexOf(content) > -1
                });
            if (found && !isNaN(found.index)) {
                this.set("selected", found.index);
            }
        }
    });
    
}());
