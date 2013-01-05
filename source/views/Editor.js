
// The `Sample.Editor` kind
// ----------------------
// The editor is a view that is only visible when the application
// state property (on `Sample.panels`) is set to true. This is only
// the case when the "Edit" button is selected. By applying some CSS
// (using LESS) we can create the effect of an overlay. With the
// proper bindings, we can set up a text editor with hooks into the
// modifiable content of the underlying record; proper bindings to
// other views can give us real-time UI updates with no additional work.
enyo.kind({
    name: "Sample.Editor",
    id: "editor",
    // We use a custom controller kind, which we call a "view controller"
    // because it is owned by this view and has awareness of it. Because
    // we set the `controller` property to a kind instead of an instance,
    // the view automatically creates an instance of the controller.
    //
    // All events from the view are propagated to the controller, which
    // may have its own named event handlers, listeners, and so on. If
    // a handler returns true, event propagation (bubbling) ends as
    // expected; if not, the event is routed right back up through the
    // view. This allows us to take non-view-related logic and graft it
    // onto a separate kind that has additional functionality.
    controller: "Sample.EditorController",
    // We are able to create bindings with relative paths for both the
    // `from` and `to` properties. One thing to note is that the
    // controller is subkinded from `enyo.ModelController`--this allows
    // us to bind directly to properties of the controller as if it were
    // the model itself. It also means that we could make changes to the
    // model directly (or swap it out altogether) and those changes would
    // automatically propagate back to the view because of bindings.
    // Notice the explicit selection of target (`to`) properties. We bind
    // to the `content` property on the `label` child, but to the `value`
    // property on the `input` child.
    bindings: [
        {from: "controller.header", to: "$.label.content"},
        {from: "controller.header", to: "$.input.value"}
    ],
    // We use a custom layout kind that can be found in the `ext` directory
    // in the project source.
    layoutKind: "Sample.FitToTargetBoundsLayout",
    // The layout looks for the `fitTarget` property when detecting the
    // view for which we want to match the bounds. This is only necessary
    // due to limitations in the way the CSS is applied--this editor
    // becomes visible over the roller, but the roller's opacity changes.
    // In order to keep our opacity unaffected, we have a different parent,
    // but to match sizes we need to have a reference to the target view.
    // The layout finds the target in the value of `fitTarget`and sets our
    // bounds accordingly.
    fitTarget: "owner.$.roller",
    components: [
        {name: "info1", classes: "input-label", content: "There is a model " +
            "being used to store the message you see below. Edit it in the " +
            "textarea and see the real-time changes to the model and how they " +
            "propagate to the view"},
        {name: "label", classes: "input-label model-view"},
        {name: "done", kind: "onyx.Button", content: "Done Editing",
            classes: "done-button", ontap: "done"},
        {kind: "onyx.InputDecorator", classes: "input-area", components: [
            {name: "input", kind: "onyx.TextArea"}]}
    ]
});
