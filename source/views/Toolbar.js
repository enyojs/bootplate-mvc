//*@public
/**
*/
enyo.kind({
  name: "Mvc.Toolbar",
  kind: "onyx.MoreToolbar",
  id: "toolbar",
  controller: "Mvc.CollectionController",
  bindings: [
    {from: "controller.isEditing", to: "$.edit.disabled"},
    {from: "controller.isEditing", to: "$.add.disabled"},
    {from: "controller.length", to: "$.count.content"},
    {from: "controller.carouselIndex", to: "$.showing.content", transform: "showingTransform"}
  ],
  components: [
    {id: "app-label", content: "Enyo.js MVC"},
    {name: "edit", kind: "onyx.Button", content: "Edit", ontap: "editBinding"},
    {name: "add", kind: "onyx.Button", content: "Add", ontap: "addBinding"},
    {name: "next", kind: "onyx.Button", content: "Next", ontap: "nextBinding"},
    {components: [
      {tag: "label", content: "Models: "},
      {name: "count", tag: "span"}]},
    {components: [
      {tag: "label", content: "Showing: "},
      {name: "showing", tag: "span"}]}
  ],
  showingTransform: function (value) {
    return value+1;
  }
});