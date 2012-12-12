
// The `App.RollerPanel` kind
// ---------------------------
// Each time a new record is added to the collection at runtime
// a new panel in our _roller_ is created and it is based off
// of this kind.
enyo.kind({
    name: "App.RollerPanel",
    classes: "roller-panel",
    // Each of these `App.RollerPanel`s will create its own
    // `enyo.ModelController` as its `controller` and this is what
    // allows the `App.Roller` kind to set the newly created
    // record as this controllers `model` property. You can see this
    // in action in the `createPanelForModel` method of the
    // `App.Roller` kind.
    controller: "enyo.ModelController",
    layoutKind: "enyo.FittableRowsLayout",
    fit: true,
    // Making sure that our _view_s have the corrent content is as
    // easy as creating the binding for them, thats it. Here
    // all we do is state we want a binding from our _controller_'s
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
