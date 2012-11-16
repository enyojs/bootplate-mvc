//*@public
/**
*/
enyo.kind({
  name: "Todo.ControlsController",
  kind: "enyo.Controller",
  // we can automatically relay events through the
  // view's controller
  keyPressed: function (inSender, inEvent) {
    if (inEvent.which === 13) {
      Todo.Controller.add(this.get("todoContent"));
      return true;
    }
  },
  // example of a computed property with no dependents
  todoContent: enyo.Computed(function () {
    var o = this.owner, t = o.$.input.getValue();
    o.$.input.clear();
    return {text: t};
  })
});