
// The `App.Main` kind
// -------------------
// This is the main presentation portion of the application. We place
// all the content for the app in a vertical scroller. The presentation
// is then broken down further into conveniently-named parts. While it
// isn't always necessary to break out each view into its own kind,
// it's generally a good idea to do so for any section that has specific
// behavior or needs to encapsulate behavior beneath it by providing
// scope-relevant bindings to its children.
enyo.kind({
    // Notice that we use our application namespace for this kind.
    name: "App.Main",
    kind: "enyo.Scroller",
    id: "main",
    classes: "main",
    fit: true,
    // One useful feature of bindings is the ability to do
    // "transforms"--conversions of data types such that different values
    // exist on each end of the binding. However, sometimes you can achieve
    // the same effect without the transform, simply by binding the
    // appropriate type.
    //
    // In the current example, we bind a state property of the panels
    // controller (the boolean `isEditing`) to the `showing` property of
    // one of our child views (`editor`). This causes the `editor` child
    // to only be visible when `isEditing` is set to true.
    bindings: [
        // Of the many ways to work with `enyo.Bindings`, going through the
        // _bindings_ array is perhaps the most convenient. Note that we
        // only need to specify two properties when declaring a binding.
        //
        // Bindings are one-way by default. We will see an example of a
        // two-way binding in another component.
        {from: "App.panels.isEditing", to: "$.editor.showing"}
    ],
    handlers: {
        // Ugly hack for a Chrome-related bug.
        oninput: "chromeworkaround"
    },
    components: [
        {name: "roller", kind: "App.Roller"},
        {name: "editor", kind: "App.Editor"},
        {name: "divider", kind: "App.Divider"},
        {name: "documents", kind: "App.Documents"},
        {name: "footer", id: "footer", tag: "footer"}
    ],
    // This is an ugly hack to force Chrome to re-render sublayers
    // with pseudo-transparent layers above them.
    chromeworkaround: function () {
        if (enyo.platform.chrome) this.$.roller.render();
    }
});
