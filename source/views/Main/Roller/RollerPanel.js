(function () {
  
    // The `Mvc.RollerPanel` class
    // ---------------------------
    // Each time a new record is added to the collection at runtime
    // a new panel in our _roller_ is created and it is based off
    // of this kind.
    enyo.kind({
        name: "Mvc.RollerPanel",
        classes: "roller-panel",
        // Each of these `Mvc.RollerPanel`s will create its own
        // `enyo.ModelControll` as its `controller` and this is what
        // allows the `Mvc.Roller` kind to set the newly created
        // record as this controllers `model` property. You can see this
        // in action in the `createPanelForModel` method of the
        // `Mvc.Roller` kind.
        controller: "enyo.ModelController",
        layoutKind: "enyo.FittableRowsLayout",
        fit: true,
        // Making sure that our _view_s have the corrent content is as
        // easy as creating the binding for them, thats it. Here
        // all we do is state we want a binding from our _controller_s
        // `header` property (remember this isn't a _real_ property of
        // the `enyo.ModelController` it is proxied from the underlying
        // model!) to our child's `content` and we're done!
        bindings: [
            {from: "controller.header", to: "$.header.content", oneWay: true}
        ],
        components: [
            {name: "header", tag: "h1"}
        ]
    });
  
}());