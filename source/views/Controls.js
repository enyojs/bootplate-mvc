//*@public
/**
*/
enyo.kind({
  name: "Todo.Controls",
  controller: "Todo.ControlsController",
  classes: "todo-controls",
  kind: "enyo.FittableRows",
  components: [
    {kind: "onyx.InputDecorator", components: [
      {name: "input", kind: "onyx.Input", placeholder: "Todo...", onkeyup: "keyPressed"}]}
  ]
});