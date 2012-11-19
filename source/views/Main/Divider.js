//*@public
/**
*/
enyo.kind({
  name: "Mvc.Divider",
  id: "divider",
  kind: "onyx.MoreToolbar",
  components: [
    {kind: "onyx.Button", content: "MVC"},
    {kind: "onyx.Button", content: "View"},
    {kind: "onyx.Button", content: "Model"},
    {kind: "onyx.Button", content: "Control"}
  ]
});