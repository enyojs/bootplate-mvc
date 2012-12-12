
// The `App.EditorController` kind
// -------------------------------
// The editor controller is responsible for setup of the content in
// the `App.Editor` _view_. It extends `enyo.ModelController` and proxies
// the selected record.
enyo.kind({
    // There is a naming convention (not required) to keep presentation
    // objects closely linked with their _controller_ layer counterparts by
    // appending `Controller` to the end of the controller title.
    name: "App.EditorController",
    // Make sure to check out the documentation for `enyo.ModelController`.
    kind: "enyo.ModelController",
    // Even though the _textarea_ is in the _view_, we are owned by the _view_
    // and all bubbled events will also be passed to us. We have access to the
    // entirety of the view that owns us via the `owner` property.
    handlers: {
        oninput: "input",
        onready: "indexChanged"
    },
    constructor: function () {
       this.inherited(arguments);
       App.panels.addDispatchTarget(this);
    },
    // So we map the selected index from the panels controller to
    // our own `index` property.
    bindings: [
        {from: "App.panels.index", to: "index"}
    ],
    // Note that we can setup a _changed_ event watcher for a property
    // that only exists locally through bindings!
    indexChanged: function () {
        var idx = this.index;
        var model = App.panels.at(idx);
        if (model && model !== this.model) this.set("model", model);
    },
    input: function () {
        // Very, very important - let changes in the model propagate
        // to changes in the view, obviously we interpreted a UI layer
        // event for `oninput` but we translate the event into a model
        // layer change and it will automatically cause the rest of the
        // UI to update accordingly.
        this.model.set({header: this.owner.$.input.get("value")});
    },
    // When the child view of the `owner` of this controller emits the
    // _done_ named handler event it gets sent here to the controller
    // since it exists.
    done: function () {
        // We are all done editing and can reset the state property.
        App.panels.set("isEditing", false);
    }
});
