(function () {

    // Locally scoped variable that contains the fixed names of each of
    // the documentation files we're going to load via `enyo.Ajax` calls.
    var documents = [ "App", "PanelsController", "Core", "Divider",
        "Documents", "DocumentsController", "Editor", "EditorController",
        "FitToTargetBoundsLayout", "Main", "Roller", "RollerCollection",
        "RollerLayout", "RollerModel", "RollerPanel", "Scaffold",
        "Toolbar", "Welcome"];
    
    // Locally scoped variable that is the known root of all file requests.
    // It is used with `enyo.format` to format the appropriate string
    // for the individual file's paths.
    var root = "assets/docco/generated/%..html";
    
    // Locally scoped method to load each of the known document sources.
    // It simply iterates over the known pagelet files we're trying
    // to load via ajax and calls the loader method.
    var loadDocs = function (target) {
        var loaded = enyo.bind(target, target.loadedDoc);
        enyo.forEach(documents, function (doc) {
           var src = enyo.format(root, doc);
           loadDoc(src, loaded);
        });
    };
        
    // Locally scoped method that issues an ajax request using
    // `enyo.Ajax` and sets the responder to the one provided in the 
    // _loaded_ parameter.
    var loadDoc = function (src, loaded) {
        var xhr = new enyo.Ajax({url: src, handleAs: "text"});
        xhr.response(loaded).go();
    };
    
    // The `App.DocumentsController` kind
    // ----------------------------------
    // This is an `enyo.ArrayController` - a class designed
    // to act like an _array_ but with the added benefit of
    // allowing bindings and observers. And because it is
    // a kind of `enyo.Controller` it can have multiple event
    // targets which makes it perfect for how we're implementing
    // it here. A singleton instance of this class is implemented
    // in `Core.js` and that instance is shared between the
    // `Documents.js` _view_ and the `Divider.js` _view_. Neither
    // _view_ is aware of the other but `Dividerj.js` dispatches
    // its events to this _controller_ and when the `selected`
    // property changes the `Documents.js` _view_ responds.
    enyo.kind({
        name: "App.DocumentsController",
        kind: "enyo.ArrayController",
        handlers: {
            onSelect: "selectSource",
            ontap: "selectSource"
        },
        public: {
            selected: 0
        },
        create: function () {
            this.inherited(arguments);
            loadDocs(this);
        },
        // Once a document/pagelet is loaded via ajax we create
        // an entry for it. If it is the _Welcome_ pagelet then
        // we go ahead and select that one. Because these are
        // asynchronous we don't know what the index will be.
        loadedDoc: function (xhr, content) {
            var idx = this.push({src: xhr.url, content: content})-1;
            if (xhr.url.indexOf("Welcome") > -1) {
                this.set("selected", idx);
            }
        },
        // We mapped the _onSelect_ and _ontap_ events to this handler. When
        // fired we attempt to find a matching entry in our known
        // document/pagelets. We manage this through the use of
        // the `enyo.ArrayController.find` method.
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
