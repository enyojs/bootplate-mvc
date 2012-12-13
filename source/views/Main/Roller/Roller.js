
// The `App.Roller` kind
// ----------------------
// This is a modified `enyo.Panels` kind housed by a container
// that dynamically creates _panels_ based on the models in a collection.
// It just so happens in this application that collection is being
// proxied via our panels controller, `App.panels`.
enyo.kind({
    name: "App.Roller",
    id: "roller",
    classes: "roller-container",
    maxHeight: 400,
    // To receive events and have relative pathing to the controller
    // we set the application's `App.panels` as our _view_'s controller
    controller: "App.panels",
    handlers: {
        // We need to provide our own handler for the event
        // that is bubbling up from the collection controller.
        oncollectionadd: "didAddModel",
        // We wait for the ready event before we start listening
        // for added models, though.
        onready: "syncPanelsToCollection"
    },
    bindings: [
        // We have bound the `isEditing` state property to a local `isEditing`
        // property so we can get change notifications, this is a two-way
        // binding.
        {from: "controller.isEditing", to: "isEditing", oneWay: false},
        // Bind our child's `index` property to our ontroller's `index`
        // property in a two-way binding.
        {from: "$.panels.index", to: "controller.index", oneWay: false},
        // If for no other reason than to show it can be done, lets set
        // yet another two-way binding from this now bound _index_ value
        // from the controller to ourselves.
    ],
    // We have some specific layout functionality for mobile-ish platforms.
    layoutKind: "App.RollerLayout",
    // Notice we have wrapped the `enyo.Panels` _views_ in this wrapper
    // but also a very important property - `controller` that is set to
    // the panels controller (which just so happens to be a collection
    // controller) thus giving us access to the collection and its events as
    // well as sending our events back to the controller.
    components: [
        {name: "panels", kind: "enyo.Panels", draggable: false, fit: true,
            id: "roller-panels", wrap: false, arrangerKind: "enyo.TopBottomArranger"}
    ],
    // Handle the request when a new model has been added, this event
    // is dispatched from the panels controller.
    didAddModel: function (collection, model) {
        // So we create a panel from the new model.
        this.createPanelForModel(model);
        // We update the index of our actual `enyo.Panels` child to that
        // of the new model so it is the one visible.
        this.$.panels.set("index", this.controller.indexOf(model));
        // We flag our (two-way!) binding state for `isEditing` to _true_
        // so the editor will become visible. Obviously this is an indirect
        // reaction to the state change amongst those for any other
        // observers on the application state property `isEditing` but this
        // view did not need to be aware of any details in the rest of the app.
        this.set("isEditing", true);
    },
    // Create a panel for a model
    createPanelForModel: function (model) {
        var panel = this.$.panels.createComponent({kind: "App.RollerPanel"});
        panel.controller.set("model", model);
        // Forcing a render here ensures the new panel will correctly
        // position itself amongst the other existing panels.
        this.render();
    },
    // Synchronize any models in the collection to panels
    // we now need in our roller, the event that triggers
    // this is only done once, from the function in `enyo.run`
    // in the `Core.js` file because it loads the scaffolded
    // models silently then has our controller (panels controller)
    // notify us that we can create the panels now, normally
    // we would go into edit mode when we detected a model
    // had been added but this first batch is an exception.
    syncPanelsToCollection: function () {
        enyo.forEach(this.controller.models, function (model) {this.createPanelForModel(model)}, this);
    },
    // So we do a little view-centric logic here with the state
    // by adding and removing classes thus triggering transitions
    // in browsers that support them.
    isEditingChanged: function () {
        if (this.isEditing) {
            if (this.hasClass("normal")) this.removeClass("normal");
            this.addClass("editing");
        } else if (this.hasClass("editing")) {
            this.addClass("normal");
            this.removeClass("editing");
        }
    }
});
