//*@public
/**
*/
enyo.kind({
  name: "Mvc.Carousel",
  id: "carousel",
  kind: "enyo.Panels",
  controller: "Mvc.CarouselController",
  draggable: false,
  wrap: false,
  fit: true,
  arrangerKind: "enyo.TopBottomArranger"
});