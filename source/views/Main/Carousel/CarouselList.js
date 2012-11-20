//*@public
/**
*/
enyo.kind({
  name: "Mvc.CarouselList",
  kind: "enyo.CollectionList",
  controller: "Mvc.CarouselController",
  components: [
    {name: "item", components: [
      {bindProperty: "header"}]}
  ]
});