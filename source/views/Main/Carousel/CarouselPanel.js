//*@public
/**
*/
enyo.kind({
  name: "Mvc.CarouselPanel",
  classes: "carousel-panel",
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