
// The `Sample.Application` kind
// -----------------------------
// There can be multiple `enyo.Application`s running simultaneously
// if you needed. In our case, we only need one. That being said the
// concept of an `enyo.Application` is simple: coordinate startup and
// initialization of a group of objects, if there is a view, render that
// when appropriate.
enyo.kind({
    // While the namespace of the application is `Sample` the namespace
    // of the instanced application is up to the developers discretion.
    // Go look at our `start.js` file if you haven't to see how this was
    // done.
    name: "Sample.Application",
    kind: "enyo.Application",
    // The `autoStart` flag is `true` by default but its explicitly
    // designated here for clarity. Since it is true, the `enyo.Application`
    // `start` method will be executed as soon as the constructor is called
    // on our application.
    autoStart: true,
    // Every application can potentially _own a single view_. This means that
    // it can programatically determine when to render its _view_ into the
    // DOM and where to render it when it does.
    view: "Sample.RootView",
    // The `enyo.Application` also lets us declare what controllers we want
    // to initialize for this application at the _application scope_. This is
    // a _very important concept_. Notice the name properties of these
    // declarations and also note the namespace of this _kind_. Its `Sample`.
    // By default, the `enyo.Application` will attempt to create instances of
    // these controllers in the namespace of _the application kind that owns them_.
    // In our case, this means that when the application is created there should
    // immediately be available 2 controllers on the `Sample` object: `Sample.panels`
    // and `Sample.documents`. This allows any other objects in the application to
    // reference these controllers at those paths. It is possible to instantiate
    // them in a different namespace (or none at all) by setting a flag on these
    // declarations `global: true`. The application will not attempt to prefix the
    // `name` with the namespace of the given _kind_.
    controllers: [
        {name: "panels", kind: "Sample.PanelsController"},
        {name: "documents", kind: "Sample.DocumentsController"}
    ]
});
