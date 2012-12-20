(function () {

    // The `main` function
    // -----------------
    // The `main` function in Enyo MVC is similar to the `main` functions
    // you may have encountered in other languages. Think of it as the
    // main starting place for the application--all of the source that
    // should be loaded has been loaded (so all kinds are available in
    // their namespaces) but the application has not been executed. Use
    // `main` to set up any global objects that need to be instantiated
    // (say, for bindings in views) or to house other necessary logic
    // (e.g., to load additional libraries). You can do nearly anything in
    // `main`, but ideally you'll use it to set up application-scoped
    // objects and singletons.
    window.main = function () {
      
        // For this example application, "MVC" (or namespace `App`), we
        // are sharing a single collection of models.
        // This is convenient, but can be tricky depending on what you
        // need to do with the models or with the collection as a whole.
        // In our case, it's pretty straightforward. We have an
        // `enyo.Collection` of models and some additional functionality
        // specific to the application.
        //
        // We instantiate `App.PanelsController` as a global singleton.
        // This means that, from anywhere within the application, a
        // string path or hard reference to `App.panels` will be resolved
        // to this object.
        App.panels = new App.PanelsController();
        // We also create a singleton instance of another controller, which is
        // shared between the `App.Documents` view and the `App.Editor` view.
        App.documents = new App.DocumentsController();
    };
    
    // The `enyo.run` method
    // ---------------------
    // The `enyo.run` method lets us queue a function to be run after the
    // `main` and `enyo.Application` startup methods have been run. To use
    // this method effectively, it is important to understanding the timing
    // of its execution.
    //
    // In this case, we want to populate our app with some data in the form
    // of "scaffolded models" (models based on `Scaffold.js`). Since
    // `enyo.Application` has already been started, the controllers and
    // views are already set up and listening for events. Adding the new
    // objects to the collection should trigger some updates, but it turns
    // out we don't want that to happen for this initial set of data.
    enyo.run(function () {
        // We add the scaffolded models using the proxied `add` method
        // on our panels controller. Note that we pass an additional
        // parameter, `silent: true`, in order to suppress the events
        // notifying the view of the additions. This is because, by
        // default, the listener for the addition of models sets the
        // view's `isEditing` flag to `true`. We don't want this to happen,
        // so we supress these events and arbitrarily issue an event from
        // the controller to the view.
        App.panels.add(App.Scaffold.Roller, {silent: true});
        // We tell the Roller that we're ready by bubbling the `onready`
        // event from the panels controller.
        App.panels.bubble("onready", {});
    });

}());
