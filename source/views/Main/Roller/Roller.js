
// The `Sample.Roller` kind
// ----------------------
// The `Sample.Roller` kind is a modified `enyo.Panels` housed in a
// container that dynamically creates panels based on the models in
// a collection. In this case, the collection is proxied via our
// panels controller, `Sample.panels`.
enyo.kind({
    name: "Sample.Roller",
    id: "roller",
    classes: "roller-container",
    // To receive events and have a relative path to the controller,
    // we set `Sample.panels` as our view's controller.
    controller: "Sample.panels",
    handlers: {
        // We need to provide our own handler for the event
        // that's bubbling up from the collection controller.
        oncollectionadd: "didAddModel"
    },
    bindings: [
        // We've bound the `isEditing` state property to a local `isEditing`
        // property so we can get change notifications; this is a two-way
        // binding.
        {from: ".controller.isEditing", to: ".isEditing", oneWay: false},
        // We bind our child's `index` property to our controller's `index`
        // property in a two-way binding.
        {from: ".$.panels.index", to: ".controller.index", oneWay: false},
    ],
    // Not only have we wrapped the `enyo.Panels` views in this wrapper,
    // we've also set a very important property, `controller`, to the
    // panels controller (which happens to be a collection controller),
    // thus giving us access to the collection and its events as well as
    // sending our events back to the controller.
    components: [
        {name: "panels", kind: "enyo.Panels", draggable: false, fit: true,
            id: "roller-panels", wrap: false, arrangerKind: "enyo.TopBottomArranger"}
    ],
    // This method handles the event notifying us that a new model has
    // been added. The event is dispatched from the panels controller.
    didAddModel: function (sender, event) {
        var model = event.model;
        // So we create a panel from the new model.
        this.createPanelForModel(model);
        // We update the index of our actual `enyo.Panels` child to that
        // of the new model so it is the one visible.
        this.$.panels.set("index", this.controller.indexOf(model));
        // We set our (two-way) binding state for `isEditing` to `true` so
        // the editor will become visible. Obviously, this is an indirect
        // reaction to the state change. This view does not need to be aware
        // of any details in the rest of the app.
        this.set("isEditing", true);
    },
    // Creates a panel for a model.
    createPanelForModel: function (model) {
        var panel = this.$.panels.createComponent({kind: "Sample.RollerPanel"});
        panel.controller.set("model", model);
        // Forcing a render here ensures that the new panel will correctly
        // position itself among the other existing panels.
        this.render();
    },
    // Synchronizes any models in the collection to panels
    // we now need in our roller.
    syncPanelsToCollection: function () {
        enyo.forEach(this.controller.models, function (model) {
            this.createPanelForModel(model)
        }, this);
    },
    // Does some view-centric work based on the state, adding and
    // removing classes, and thus triggering transitions in browsers
    // that support them.
    isEditingChanged: function () {
        if (this.isEditing) {
            if (this.hasClass("normal")) this.removeClass("normal");
            this.addClass("editing");
        } else if (this.hasClass("editing")) {
            this.addClass("normal");
            this.removeClass("editing");
        }
    },
    // We need to synchronize our collection (if any records already exist)
    // when we're initialized so we overload our `create` method to
    // execute our `syncPanelsToCollection` method to get caught up.
    create: function () {
        this.inherited(arguments);
        this.syncPanelsToCollection();
    }
});
