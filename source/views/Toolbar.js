
// The `Sample.Toolbar` kind
// ----------------------
// The toolbar in our application is interesting because
// of the number of things it connects to. It uses bindings
// on the state of the application to control some of its
// visual state and binds to some properties of the panels
// controller to obtain content in its views that automatically
// updates when it changes.
enyo.kind({
    // We name the toolbar as a kind in the namespace of the
    // application.
    name: "Sample.Toolbar",
    // We base the new kind on `enyo.MoreToolbar` because we want
    // this application to look good and work well on mobile devices
    // as well as desktop browsers.
    kind: "onyx.MoreToolbar",
    // We arbitrarily set the DOM id for CSS selection and ease of
    // reference later on. This is not strictly necessary.
    id: "toolbar",
    // Although the toolbar does not have its own controller, we
    // give it a reference to the panels controller. This gives us
    // a relative reference to the controller from the view; more 
    // importantly, it gives us automatic propagation of events.
    controller: "Sample.panels",
    bindings: [
        // Notice that we have bindings from the `isEditing` property of
        // the panels controller to the `disabled` property of these
        // `onyx.Button` objects. Previously, we used the same property
        // to set the `showing` state of our `Sample.Editor` view.
        {from: "controller.isEditing", to: "$.edit.disabled"},
        {from: "controller.isEditing", to: "$.add.disabled"},
        {from: "controller.length", to: "$.count.content"},
        // Make special note of the fact that we are using a transform
        // here. We name the transform but elect to place it on the
        // `owner` object of the binding. The binding will find it and
        // transform the `0-n` index to `1-n+1` for our benefit.
        {from: "controller.index", to: "$.showing.content", transform: "showingTransform"}
    ],
    components: [
        {id: "app-label", content: "Enyo.js MVC"},
        {name: "edit", kind: "onyx.Button", content: "Edit", ontap: "editModel"},
        {name: "add", kind: "onyx.Button", content: "Add", ontap: "addModel"},
        {name: "next", kind: "onyx.Button", content: "Next", ontap: "nextModel"},
        {components: [
            {tag: "label", content: "Models: "},
            {name: "count", tag: "span"}]},
        {components: [
            {tag: "label", content: "Showing: "},
            {name: "showing", tag: "span"}]}
    ],
    // Transforms also accept a second parameter, which is set to
    // the string value of the direction.
    showingTransform: function (value) {
        return value+1;
    }
});
