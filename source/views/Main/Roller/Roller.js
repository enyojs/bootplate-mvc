(function () {
  
  // The `Mvc.Roller` class
  // ----------------------
  // This is a modified `enyo.Panels` class housed by a container
  // that dynamically creates _panels_ based on the models in a collection.
  // It just so happens in this application that collection is being
  // proxied via our application controller, `Mvc.controller`.
  enyo.kind({
    name: "Mvc.Roller",
    id: "roller",
    classes: "roller-container",
    maxHeight: 400,
    // For no other reason than to receive events and have relative
    // pathing to the controller we set the application controller
    // as our _views_ controller
    controller: "Mvc.controller",
    handlers: {
      // We need to provide our own handler for the event
      // that is bubbling up from the collection controller
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
      // Bind our index property to our application controller's index
      // property in a two-way binding
      {from: "$.panels.index", to: "controller.index", oneWay: false}
    ],
    // TODO: Move to a layout?
    reflow: function () {
      this.adjustBounds();
      this.inherited(arguments);
    },
    adjustBounds: function () {
      var r = enyo.application.rootView, t = r.$.toolbar.getBounds().height,
          w = r.getBounds().height, m = this.maxHeight, h = w - t, s;
      s = m<h? m: h;
      this.setBounds({height: s}, "px");
    },
    // Notice we have wrapped the `enyo.Panels` _views_ in this wrapper
    // but also a very important property - `controller` that is set to
    // the application controller (which just so happens to be a collection
    // controller) thus giving us access to the collection and its events as
    // well as sending our events back to the controller.
    components: [
      {name: "panels", kind: "enyo.Panels", draggable: false, fit: true,
        id: "roller-panels", wrap: false, arrangerKind: "enyo.TopBottomArranger"}
    ],
    // Handle the request when a new model has been added, this event
    // is dispatched from the application controller
    didAddModel: function (collection, model) {
      this.createPanelForModel(model);
      this.$.panels.set("index", this.controller.indexOf(model));
      this.set("isEditing", true);
    },
    // Create a panel for a model
    createPanelForModel: function (model) {
      var panel = this.$.panels.createComponent({kind: "Mvc.RollerPanel"});
      panel.controller.set("model", model);
      this.render();
    },
    // Synchronize any models in the collection to panels
    // we now need in our roller, the event that triggers
    // this is only done once, from the function in `enyo.run`
    // in the `Core.js` file because it loads the scaffolded
    // models silently then has our controller (application controller)
    // notify us that we can create the panels now, normally
    // we would go into edit mode when we detected a model
    // had been added.
    syncPanelsToCollection: function () {
      enyo.forEach(this.controller.models, function (model) {this.createPanelForModel(model)}, this);
    },
    // So we do a little view-centric logic here with the state
    // by adding and remove classes thus triggering transitions
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

}());