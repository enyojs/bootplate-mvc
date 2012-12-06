(function () {
    
    var root = "source/views/Main/Documents/docs/%..html", documents = [
        "Toolbar", "Scaffold", "RollerLayout", "FitToTargetBoundsLayout",
        "Editor", "Core", "ApplicationController", "App"
    ], loadDocs, loadDoc;
    
    enyo.kind({
        name: "Mvc.DocumentsController",
        kind: "enyo.ArrayController",
        public: {
            selected: 0
        },
        create: function () {
            this.inherited(arguments);
            loadDocs(this);
        },
        loadedDoc: function (xhr, content) {
            this.push({src: xhr.url, content: content, index: this.length});
            if (this.length === 0) this.set("selected", 0);
        },
        selectSource: function (sender, event) {
            console.log("selectSource", sender.index);
            this.set("selected", sender.index);
        }
    });
    
    
    // Eventually general support for something like this may be
    // added but for now we're just loading these adhoc to make
    // their content available to our views
    loadDocs = function (target) {
        var loaded = enyo.bind(target, target.loadedDoc);
        enyo.forEach(documents, function (doc) {
           var src = enyo.format(root, doc);
           loadDoc(src, loaded);
        });
    };
    
    loadDoc = function (src, loaded) {
        var xhr = new enyo.Ajax({url: src, handleAs: "text"});
        xhr.response(loaded).go();
    };
    
}());