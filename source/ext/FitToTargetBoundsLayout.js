(function () {
  
    // An interesting `enyo.Layout`, `Mvc.FitToTargetBounds`
    // -----------------------------------------------------
    // We needed to make sure that the editor would match the
    // current dimensions of another _view_ that was not directly
    // in its own tree. Using the logic behind `enyo.getPath` we
    // can easily abstract this desire to something that is
    // reuseable for other objects. On the _view_ implementing the
    // `Mvc.FitToTargetBounds` _layoutKind_ simply have a property
    // `fitTarget` that can be a string path (relative to the _view_)
    // or a full path to an instance or an object reference.
    enyo.kind({
        // The name seemed "fitting"...
        name: "Mvc.FitToTargetBoundsLayout",
        kind: "enyo.Layout",
        // Local copy of the property from the container.
        targetPath: "",
        constructor: function (container) {
            this.inherited(arguments);
            this.targetPath = container.fitTarget;
            if (this.targetPath && "string" !== typeof this.targetPath) {
                this._target = this.targetPath;
            }
        },
        // Here is where that `enyo.getPath` magic occurs.
        reflow: function () {
            // By default, `enyo.Layout` kinds do not inherit the
            // `get` method but we can easily facade it by calling
            // `enyo.getPath` with the context set as ourselves.
            var target = enyo.getPath.call(this, "target");
            this.container.setBounds(target.getBounds(), "px");
        },
        // Here we use a computed property that ultimately caches
        // its initial run. While not completely necessary it does
        // organize the logic associated with the property to a
        // single location rather than have it spread out with
        // lots of additional tests attempting to detect if it has
        // been initialized.
        target: enyo.Computed(function () {
            if (this._target) return this._target;
            var target = enyo.getPath.call(this.container, this.targetPath);
            if (!target) enyo.error("Cannot find the requested target");
            return (this._target = target);
        })
    });
  
}());