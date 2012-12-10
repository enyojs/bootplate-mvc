(function () {
    
    // Locally scoped variables to use during the loadup process.
    var documents = [
            "App", "ApplicationController", "Core", "Divider", "Documents",
            "DocumentsController", "Editor", "EditorController",
            "FitToTargetBoundsLayout", "Main", "Roller", "RollerCollection",
            "RollerLayout", "RollerModel", "RollerPanel", "Scaffold", "Toolbar",
            "Welcome"
    ], loadDocs, loadDoc, root = "source/views/Main/" +
        "Documents/docs/%..html";
    
    // The `Mvc.DocumentsController` kind
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
        name: "Mvc.DocumentsController",
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
            var content, target, found;
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
    
    // Simply iterates over the known pagelet files we're trying
    // to load via ajax and calls the loader method.
    loadDocs = function (target) {
        var loaded = enyo.bind(target, target.loadedDoc);
        enyo.forEach(documents, function (doc) {
           var src = enyo.format(root, doc);
           loadDoc(src, loaded);
        });
    };
    
    // This method issues an ajax request using `enyo.Ajax` and
    // sets the responder to the one provided in the _loaded_
    // parameter.
    loadDoc = function (src, loaded) {
        var xhr = new enyo.Ajax({url: src, handleAs: "text"});
        xhr.response(loaded).go();
    };
    
}());
