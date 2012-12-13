
// The `App.RollerPanel` kind
// ---------------------------
// Each time a new record is added to the collection at runtime,
// a new panel based on this kind is created in our roller.
enyo.kind({
    name: "App.RollerPanel",
    classes: "roller-panel",
    // Each `App.RollerPanel` creates its own `enyo.ModelController`
    // as its `controller`. This allows the `App.Roller` kind to set
    // the newly created record as the value of this controller's
    // `model` property. You can see this in action in the method
    // `App.Roller.createPanelForModel()`.
    controller: "enyo.ModelController",
    layoutKind: "enyo.FittableRowsLayout",
    fit: true,
    // Making sure that our views have the corrent content is as
    // easy as creating the bindings for them. Here we declare a
    // binding from our controller's `header` property (remember
    // this isn't a real property of the `enyo.ModelController`;
    // it is proxied from the underlying model) to our child's
    // `content`.
    bindings: [
        {from: "controller.header", to: "$.header.content", oneWay: true}
    ],
    components: [
        {name: "header", tag: "h1"}
    ]
});
