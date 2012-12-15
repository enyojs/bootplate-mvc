
// The `App.EditorController` kind
// -------------------------------
// The editor controller is responsible for setting up the content in
// the `App.Editor` view. It extends `enyo.ModelController` and proxies
// the selected record.
enyo.kind({
    // There is convention (not a requirement) to keep the names of
    // presentation objects closely linked with those of their
    // associated controllers. The controller name is typically formed
    // by appending `"Controller"` to the name of the view.
    name: "App.EditorController",
    // Be sure to read the documentation for `enyo.ModelController`.
    kind: "enyo.ModelController",
    // Even though the textarea is in the view, we are owned by the
    // view and all bubbled events are also passed to us. We have access
    // to the entirety of the view that owns us via the `owner` property.
    handlers: {
        oninput: "input",
        onready: "indexChanged"
    },
    constructor: function () {
       this.inherited(arguments);
       App.panels.addDispatchTarget(this);
    },
    // We map the selected index from the panels controller to our own
    // `index` property.
    bindings: [
        {from: "App.panels.index", to: "index"}
    ],
    // Note that we can set up a `changed` event listener for a property
    // that only exists locally through bindings.
    indexChanged: function () {
        var idx = this.index;
        var model = App.panels.at(idx);
        if (model && model !== this.model) this.set("model", model);
    },
    input: function () {
        // Very important: Let changes in the model propagate to changes
        // in the view. We translate a UI-layer `oninput` event into a
        // model-layer change, and the rest of the UI is automatically
        // updated to reflect the change.
        this.model.set({header: this.owner.$.input.get("value")});
    },
    // When the child view of the `owner` of this controller emits the
    // `done` named handler event, it gets sent here to the controller
    // (since it exists).
    done: function () {
        // We are all done editing and can reset the state property.
        App.panels.set("isEditing", false);
    }
});
