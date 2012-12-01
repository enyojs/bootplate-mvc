//*@public
/**
*/
enyo.kind({
  name: "Mvc.Main",
  kind: "enyo.Scroller",
  id: "main",
  classes: "main",
  fit: true,
  bindings: [
    {from: "Mvc.CollectionController.isEditing", to: "$.editor.showing"}
  ],
  handlers: {
    oninput: "chromeworkaround"
  },
  components: [
    {name: "carousel", kind: "Mvc.Carousel"},
    {name: "editor", kind: "Mvc.Editor"},
    {name: "divider", kind: "Mvc.Divider"},
    {name: "default", kind: "Mvc.Default"},
    {name: "documents", kind: "Mvc.Documents"},
    {name: "footer", kind: "Mvc.Footer"}
  ],
  // this is an ugly hack because chrome has a bug that keeps
  // sublayers from properly rerendering when their opacity
  // is set
  chromeworkaround: function () {
    this.$.carousel.render();
  }
});