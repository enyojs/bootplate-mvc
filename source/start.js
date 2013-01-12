
// The `enyo.ready` method
// -----------------------
// Some things need to happen only after the `document` has been fully
// initialized--when we are sure that the entire source has been loaded.
// You may call `enyo.ready` and pass it a function (and an optional
// context) as many times as you need to and those methods will only be
// executed once the `document` is completely ready.
enyo.ready(function () {
    // This is a very imporant declaration, in which we instantiate our
    // application. We arbitrarily assign the instance to a global
    // variable called `app`, in case we need to refer to it later. All
    // other components of this application are instantiated in the
    // `Sample` namespace. See the `apps/Sample.js` file for more
    // information on namespaces and what this actually means.
    app = new Sample.Application();
    // When our application renders for the first time, we want it to
    // have some sample data to display. We'll use data that we've
    // prepared specifically for this purpose in the file
    // `models/Scaffold.js`. Check out the overloaded _load_ method
    // in the Sample.panels controller.
    Sample.panels.load();
    // Now that we have data for the view layer to display, let's go
    // ahead and render it to the DOM. We could have had the application
    // automatically render upon creation, but in `apps/Sample.js` we
    // deliberately told it not to do so. This gave us the opportunity
    // to prepare our scaffold data before the view layer was
    // initialized.
    app.render();
});
