(function () {

    // The `main` function
    // -----------------
    // The idea behind the `main` function is similar to many other languages.
    // Think of this as the `main` starting place for the application -
    // all of the source that should be loaded has been (so all classes are
    // are available in the namespaces they should be) but the application
    // has not been executed. Use this method to effectively setup any global
    // objects that need to be instanced (say, for bindings in views) or other
    // programatic logic to perhaps load additional libraries if needed. You
    // can do anything in `main` really but ideally we setup application-scoped
    // objects/singletons - so that's what we've done in this app.
    window.main = function () {
      
        // For this example application, `MVC` (or namespace `Mvc`), we
        // are sharing a single collection of models throughout the app.
        // This is both awesome and can be tricky depending on what you
        // need to do with those models or the collection as a whole. In
        // our case, though, its pretty straight-forward. We have a
        // `enyo.Collection` of models and some additional functionality
        // that is application specific.
        //
        // So you can take a look at the source for the `Mvc.CollectionController`
        // class, and right here we go ahead and instance it as a global
        // singleton. This means that anywhere from within the application
        // any string-path or hard-reference to `Mvc.controller` it will
        // be resolved to this object.
        enyo.singleton({
            // The name of the global/application-scoped singleton is lower-case
            // because it is a instance.
            name: "Mvc.controller",
            // We know the kind to create it from, `Mvc.ApplicationController`.
            kind: "Mvc.ApplicationController"
        });
    };
    
    // The `enyo.run` method
    // ---------------------
    // Here is an example of the `enyo.run` method that allows us
    // to queue a function to be run _after the `main` function and
    // the `enyo.Application` startup methods have been run_. It is
    // _important to note the timing of execution of this method to
    // understand how to effectively use it_. Here we wanted to be able
    // to automatically add some _scaffolded models_ (prepared models
    // from `Scaffold.js`) so we actually start with some data. Since the
    // `enyo.Application` has already been started that means that
    // controllers and views are already setup and listening for events.
    // Issuing these additions to the collection should trigger some
    // updates, it turns out, for this initial batch we don't want that.
    enyo.run(function () {
        // Lets add the _scaffolded models_ using the proxied `add`
        // method of our application controller. Note that we pass
        // an additional pararmeter of `silent: true` because we actually
        // do not want the event to fire notifying the view because the
        // default listener for the addition of models tries to take
        // us into the `isEditing` state. Instead, we supress the events
        // and arbitrarily issue an event from the controller because
        // the view (the `enyo.Panels`) is a listener from the controller.
        Mvc.controller.add(Mvc.Scaffold.Roller, {silent: true});
        // Now we tell the Roller that we're ready by bubbling the event
        // it is waiting for from the application controller.
        Mvc.controller.bubble("onready", {});
    });
  
}());