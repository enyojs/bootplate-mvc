//*@public
/**
*/
enyo.kind({
  name: "Mvc.Main",
  kind: "enyo.Scroller",
  id: "main",
  classes: "main",
  fit: true,
  components: [
    {kind: "Mvc.CarouselContainer", components: [
      {name: "carousel", kind: "Mvc.Carousel"}]},
    {name: "divider", kind: "Mvc.Divider"},
    {name: "default", kind: "Mvc.Default"},
    {name: "documents", kind: "Mvc.Documents"},
    {name: "footer", kind: "Mvc.Footer"}
  ]
});