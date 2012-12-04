(function () {
  
  // The `Mvc.Editor` class
  // ----------------------
  // The editor is a _view_ that is only visible when the application
  // state property (on `Mvc.controller`) is set to true. This is only
  // set to true when the `edit` button is selected. Using some CSS
  // (using Less!) we can create the effect of an overlay. With proper
  // bindings, we can setup a text-editor with the modifiable content
  // of the underlying model, and proper bindings to other views allows
  // real-time updates without any additional work.
  enyo.kind({
    name: "Mvc.Editor",
    id: "editor",
    // We use a custom controller _kind_. This controller is refered to
    // as a _view controller_ as it is _owned_ by this _view_ and has
    // awareness of it. By setting the `controller` property to a _class_
    // instead of an instance, the `enyo.View` (also `enyo.Control`)
    // automatically created an instance of the controller. All events from
    // the _view_ are propagated to the _controller_ where it can have its
    // own named event handlers, listeners, etc. If it returns true for any
    // handlers propagation (bubbling) ends as expected, if not the event
    // is routed right back up through the _view_. This allows us to take
    // non-view related logic and supplant it on a separate class that has
    // additional functionality.
    controller: "Mvc.EditorController",
    // We are able to create relative-pathed bindings for both the `from`
    // and `to` properties. One thing to note is that the controller is
    // a subclass of `enyo.ModelController` - this allows us to bind directly
    // to properties of the _controller_ as if it were the model itself.
    // It also means that we could make changes to the model directly or
    // swap it out altogether and those properties/changes would automatically
    // propagate back to the _view_ because of bindings. Notice the
    // explicit selection of target (_to_) properties. Fort he _label_ child
    // use content but for the _input_ child we selected the `value` property.
    bindings: [
      {from: "controller.header", to: "$.label.content"},
      {from: "controller.header", to: "$.input.value"}
    ],
    // TODO: Rework to use a layout?
    reflow: function () {
      // We need to target another element in the tree, we cannot be
      // beneath the same tree because we don't want the opacity to
      // apply to this layer - thus the ugly hacking here.
      this.setBounds(this.owner.$.roller.getBounds());
      this.inherited(arguments);
    },
    components: [
      {name: "info1", classes: "input-label", content: "There is a model being used to store " +
        "the message you see below. Edit it in the textarea and see the real-time changes to the " +
        "model and how they propagate to the view"},
      {name: "label", classes: "input-label model-view"},
      {name: "done", kind: "onyx.Button", content: "Done Editing", classes: "done-button", ontap: "done"},
      {kind: "onyx.InputDecorator", classes: "input-area", components: [
        {name: "input", kind: "onyx.TextArea"}]}
    ]
  });

}());