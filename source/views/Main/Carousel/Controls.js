//*@public
/**
*/
enyo.kind({
  name: "Mvc.CarouselControls",
  id: "carousel-controls",
  components: [
    {name: "list", kind: "enyo.CollectionList", components: [
      {name: "item", bindProperty: "header"}], controller: "Mvc.CollectionController"}
  ]
});