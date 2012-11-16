(function () {
  
  //*@public
  /**
    This method, if it exists, will be called after the source has been
    loaded and processed but before the application is executed. This
    is the method in which you would instantiate singleton objects that
    may be referenced by bindings when _enyo.View_ objects are created.
  */
  window.main = function () {
    // for example...
    enyo.singleton({name: "Todo.Controller", kind: "Todo.TodoController"});
  };
  
  //*@public
  /**
    You can also register functions (from anywhere) to execute after the
    framework has started even if the method was loaded early.
  */
  enyo.run(function () {
    // let's add a default todo entry
    Todo.Controller.add({text: "This is the first todo!"});
  });
  
}());