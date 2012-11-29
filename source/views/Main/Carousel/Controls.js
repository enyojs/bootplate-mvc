//*@public
/**
*/
enyo.kind({
  name: "Mvc.CarouselControls",
  id: "carousel-controls",
  components: [
    {name: "list", kind: "enyo.CollectionList", components: [
      {kind: "Mvc.ListRow", components: [
        {bindProperty: "header"}]}], controller: "Mvc.CollectionController"}
  ]
});