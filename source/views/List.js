//*@public
/**
*/
enyo.kind({
  name: "Todo.List",
  kind: "enyo.CollectionList",
  classes: "todo-list",
  controller: "Todo.Controller",
  components: [
    {name: "item", tag: "span", classes: "todo-item", components: [
      {name: "text", tag: "span", bindProperty: "text"}]}
  ]
});