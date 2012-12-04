(function () {
  
  // The `Mvc.RollerPanel` class
  // ---------------------------
  //
  enyo.kind({
    name: "Mvc.RollerPanel",
    classes: "roller-panel",
    controller: "enyo.ModelController",
    layoutKind: "enyo.FittableRowsLayout",
    fit: true,
    bindings: [
      {from: "controller.header", to: "$.header.content", oneWay: true}
    ],
    components: [
      {name: "header", tag: "h1"}
    ]
  });
  
}());