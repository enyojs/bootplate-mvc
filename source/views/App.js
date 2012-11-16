//*@public
/**
  You start by creating an application (based off of the _enyo.Application_
  class) but instantiated with the helper method, _enyo.App_. The application
  is a special class and the framework expects there to only be one instance
  of _enyo.Application_ at any time. 
  
  The properties you pass to _enyo.App_ are the properties that will define
  the _rootView_ of the application. _rootView_ is an _enyo.View_ (_enyo.Control_)
  and will render itself into the DOM when the framework is ready.
*/
enyo.App({
  // the name of your application can be the scope reference for any
  // objects that comprise it
  name: "Todo",
  // the name of the app creates the default DOM id automatically
  // (in our case here it is #todo) but you can add any CSS classes
  // as you would normally
  kind: "enyo.Panels",
  arrangerKind: "enyo.CollapsingArranger",
  fit: true,
  classes: "todo-app",
  // components are defined the same way they always were, make sure
  // to take a close look at the other views in this sample application
  // and see some of the other features/conventions that are available
  components: [
    {classes: "todo-default-panel", layoutKind: "enyo.FittableRowsLayout", components: [
      {kind: "Todo.Controls", id: "todo-controls"},
      {kind: "Todo.List", id: "todo-list", fit: true}]},
    {content: "placeholder", fit:true}
  ]
});