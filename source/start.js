
// The `enyo.ready` method
// -----------------------
// Some things need to occur only after the `document` has fully
// initialized and is ready - thus ensuring the entirety of source
// has been loaded. You can call `enyo.ready` and pass it a function
// (and an optional context) as many times as you need and those method
// will only execute once the `document` is completely ready.
enyo.ready(function () {
    // This is a very imporant declaration. This is where we instance
    // our application. We arbitrarily assign it to a global variable
    // `app` for reference if we need it. All other components of this
    // application are instanced in the `Sample` namespace. See the
    // `apps/Sample.js` file for more information on namespaces and what
    // this actually means.
    app = new Sample.Application();
    // When our application renders for the first time we want it to have
    // some data already. Since we're not loading from a remote source we
    // go ahead and use some scaffolding we setup in `models/Scaffold.js`.
    Sample.panels.add(Sample.Scaffold.Roller);
    // Now that data is present for the _view_ layer to make use of, lets
    // go ahead and render it to the DOM. We could have had the application
    // automatically render when it was created but in `apps/Sample.js` we
    // deliberately told it not to so we can prepare our scaffold data before
    // the _view_ layer was initialized.
    app.render();
});
