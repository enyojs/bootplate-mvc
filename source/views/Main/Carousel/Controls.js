//*@public
/**
*/
enyo.kind({
  name: "Mvc.CarouselControls",
  id: "carousel-controls",
  components: [
    {name: "list", kind: "enyo.CollectionList", components: [
      {name: "item", kind: "Mvc.ListRow", components: [
        {bindProperty: "header"}]}], controller: "Mvc.CollectionController"}
  ]
});