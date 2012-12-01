//*@public
/**
*/
enyo.kind({
  name: "Mvc.Editor",
  id: "editor",
  controller: "Mvc.EditorController",
  bindings: [
    {from: "controller.header", to: "$.label.content"},
    {from: "controller.header", to: "$.input.value"}
  ],
  reflow: function () {
    // we need to target another element in the tree, we cannot be
    // beneath the same tree because we don't want the opacity to
    // apply to this layer - thus the ugly hacking here
    this.setBounds(this.owner.$.carousel.getBounds());
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