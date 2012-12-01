//*@public
/**
*/
enyo.kind({
  name: "Mvc.ListRow",
  classes: "list-row",
  handlers: {
    ontap: "tapped"
  },
  bindings: [
    {from: "controller.selected", to: "selected"},
    {from: "controller.editing", to: "editing"}
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
  },
  tapped: function (sender, event) {
    Mvc.CollectionController.at(event.index).set({editing: true});
    return true;
  },
  editingChanged: function () {
    
  }
});