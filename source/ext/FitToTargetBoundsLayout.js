
// `Sample.FitToTargetBoundsLayout`, an interesting layout kind
// ---------------------------------------------------------
// We need to make sure that the editor matches the current
// dimensions of another view not directly in its own tree.
// Using `enyo.getPath`, we can easily abstract this
// functionality into something reuseable by other objects.
// On the view implementing this layout kind, we specify a
// value for the `fitTarget` property, which can be a string
// path (relative to the view) or a full path to an instance
// or an object reference.
enyo.kind({
    name: "Sample.FitToTargetBoundsLayout",
    kind: "enyo.Layout",
    // Local copy of the property from the container
    targetPath: "",
    constructor: function (container) {
        this.inherited(arguments);
        this.targetPath = container.fitTarget;
        if (this.targetPath && "string" !== typeof this.targetPath) {
            this._target = this.targetPath;
        }
        // Register a listener for changes to the `showing` state
        // of our container.  If resizing occurs while we're not
        // visible, we won't be triggered to reflow.
        container.addObserver("showing", this.reflow, this);
    },
    // This is where `enyo.getPath` comes in.
    reflow: function () {
        // By default, layout kinds do not inherit the `get` method,
        // but we can instead call `enyo.getPath` with the context
        // set as ourselves.
        var target = enyo.getPath.call(this, "target");
        this.container.setBounds(target.getBounds(), "px");
    },
    // This method computes the value of the `target` property,
    // caching the results of its initial run. While not completely
    // necessary, it lets us store the logic associated with the
    // property in a single location, eliminating the need for extra
    // tests to detect whether `target` has been initialized.
    target: enyo.Computed(function () {
        var target;
        if (this._target) return this._target;
        target = enyo.getPath.call(this.container, this.targetPath);
        if (!target) enyo.error("Cannot find the requested target");
        return (this._target = target);
    })
});
