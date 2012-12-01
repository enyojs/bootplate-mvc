//*@public
/**
*/
enyo.kind({
  name: "Mvc.EditorController",
  kind: "enyo.ModelController",
  handlers: {
    oninput: "input",
  },
  bindings: [
    {from: "Mvc.CollectionController.carouselIndex", to: "index"},
    {from: "Mvc.CollectionController.length", to: "length"}
  ],
  indexChanged: function () {
    var idx = this.index, model = Mvc.CollectionController.at(idx);
    if (model && model !== this.model) this.set("model", model);
  },
  lengthChanged: function () {
    if (this.length) this.indexChanged();
  },
  input: function () {
    // very, very important - let changes in the model propagate
    // to changes in the view, obviously we interpreted a UI layer
    // event for `oninput` but we translate the event into a model
    // layer change and it will automatically cause the rest of the
    // UI to update accordingly
    this.model.set({header: this.owner.$.input.get("value")});
  },
  //*@public
  /**
    This method fires when the `done` button on the view is pressed.
    Remember, named responders (on components in a component block) for
    events are exposed from the parent and any present controller.
  */
  done: function () {
    Mvc.CollectionController.set("isEditing", false);
  }
});