
// The `Sample.EditorController` kind
// -------------------------------
// The editor controller is responsible for setting up the content in
// the `Sample.Editor` view. It extends `enyo.ModelController` and proxies
// the selected record.
enyo.kind({
    // There is convention (not a requirement) to keep the names of
    // presentation objects closely linked with those of their
    // associated controllers. The controller name is typically formed
    // by appending `"Controller"` to the name of the view.
    name: "Sample.EditorController",
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
       Sample.panels.addDispatchTarget(this);
    },
    // We map the selected index from the panels controller to our own
    // `index` property.
    bindings: [
        {from: "Sample.panels.index", to: "index"}
    ],
    // Note that we can set up a `changed` event listener for a property
    // that only exists locally through bindings.
    indexChanged: function () {
        var idx = this.index;
        var model = Sample.panels.at(idx);
        if (model && model !== this.model) this.set("model", model);
    },
    input: function () {
        // Very important: Let changes in the model propagate to changes
        // in the view. We translate a UI-layer `oninput` event into a
        // model-layer change, and the rest of the UI is automatically
        // updated to reflect the change.
        this.model.set({header: this.owner.$.input.get("value")});
    }
});
