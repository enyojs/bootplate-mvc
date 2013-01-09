
// The `Sample.Application` kind
// -----------------------------
// The job of an `enyo.Application` is straightforward--to coordinate
// startup and the initialization of a group of objects and, if there is
// a view, to render the view when appropriate.
//
// It's possible to have multiple instances of `enyo.Application` running
// simultaneously, if needed; in our case, we only need one.

enyo.kind({
    // While the namespace of the application is `Sample`, the namespace
    // of the application instance is up to the developer's discretion.
    // For more information, see the `start.js` file.
    name: "Sample.Application",
    kind: "enyo.Application",
    // The `autoStart` flag is `true` by default, but it's explicitly
    // designated here for clarity. Since the value is true, the
    // `enyo.Application.start` method will be executed as soon as the
    // constructor is called on our application.
    autoStart: true,
    // Every application may potentially own a single view. This means
    // that it may programatically determine when and where to render
    // its view into the DOM.
    view: "Sample.RootView",
    // The `enyo.Application` also lets us declare the controllers we
    // want to initialize for the application at the _application
    // scope_. This is a very important concept.
    //
    // Notice the `name` properties of these declarations, as well as
    // the namespace of this kind (`Sample`). By default, an
    // `enyo.Application` will attempt to create instances of controllers
    // in the namespace of the application kind that owns them. In our
    // case, this means that when the application is created, there
    // should be two controllers immediately available on the `Sample`
    // object: `Sample.panels` and `Sample.documents`. Any other objects
    // in the application may use these paths to reference the controllers.
    //
    // It is possible to instantiate a controller in a different namespace
    // (or none at all) by setting `global: true` in its declaration. In
    // that case, the application will not attempt to prepend the
    // namespace of the owning kind to controller's `name` property.
    controllers: [
        {name: "Sample.panels", kind: "Sample.PanelsController"},
        {name: "Sample.documents", kind: "Sample.DocumentsController"}
    ]
});
