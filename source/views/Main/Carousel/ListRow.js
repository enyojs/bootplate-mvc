//*@public
/**
*/
enyo.kind({
  name: "Mvc.ListRow",
  classes: "list-row",
  bindings: [
    {from: "controller.selected", to: "selected"}
  ],
  components: [
    {name: "container", classes: "item"}
  ],
  create: function () {
    this.inherited(arguments);
    this.selectedChanged();
  },
  controlParentName: "container",
  selectedChanged: function () {
    var child = this.getClientControls()[0];
    child.addRemoveClass("selected", this.selected === true);
  }
});