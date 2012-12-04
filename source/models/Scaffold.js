(function () {
  
    // The Scaffolding
    // ---------------
    // We wanted to be able to start with some messages in the roller
    // so we simply create an array of would-be records and when the
    // application is starting up we go ahead and add these to the collection.
    // You'll see this in action in `Core.js`.
    Mvc.Scaffold = {
        "Roller": [
            {header: "Welcome to a new pattern of development in Enyo.js"},
            {header: "Make use of the new bindings, observers and notifications"},
            {header: "A model layer as strong as Backbone.js"}
        ]
    };
  
}());