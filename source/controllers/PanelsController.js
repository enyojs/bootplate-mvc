
// The `App.PanelsController` kind
// -------------------------------
// This is the kind definition of the global/singleton
// application _panels controller_ `App.panels` that is instanced
// in the `main` function in `Core.js`.
enyo.kind({
    // We name it as a kind in the application namespace.
    name: "App.PanelsController",
    // We subkind the `enyo.CollectionController` kind because
    // we know we need the collection-controller built-in methods.
    // Just note that even though it is a `enyo.CollectionController`
    // we can add additional functionality to it because it is
    // ultimately just another `enyo.Controller` with additional
    // features.
    kind: "enyo.CollectionController",
    // In this application we already know what the collection kind
    // is going to be for this controller, there is no global instance
    // of the collection that is shared, we are going to hand this
    // controller a kind reference and it will instantiate it when it
    // is created
    collection: "App.RollerCollection",
    // While in `Enyo.js 2.2+` it is not required to create the
    // `published` hash so that the corresponding getters/setters
    // are created - it is still considered good practice if
    // for no other reason than clarity and consistency. But it should
    // be noted that calling `get` or `set` on any `enyo.Object` or
    // subkind gives you the equivalent to _any property on the object_,
    // can resolve paths, handle `enyo.Computed` properties and more.
    // More on that another time, for now, we publish any publicly
    // accessible properties.
    published: {
        // The entire application has state, one of these states
        // is the editing state. While this property is designed to
        // be used directly with the `App.Roller` _view_ kind, any
        // other _component_ in the application can respond to it as
        // we will see.
        isEditing: false,
        // This is an example of abstracting common elements to
        // the outermost-commonly-available-controller to be
        // shared between objects in potentially different trees
        // that have no direct connection but may share some state.
        // In this case, some functionality in the application is
        // separated because of how it needs to be represented in the
        // DOM, but the elements both need to know what `index` the
        // the _roller_ has selected. We present this property via
        // `enyo.Bindings` from the outermost controller so any
        // `enyo.View` or `enyo.Controller` can access it as needed.
        // This value is actually bound to the `enyo.View` that implements
        // the `enyo.Panels` that coordinate the presentation of these
        // models in the `enyo.Collection`. The binding to this property
        // is actually initiated in the view, though.
        index: 0,
        // Simple boolean to keep track of whether or not the animation
        // is running (_is started_).
        isStarted: false
    },
    // The timer reference as returned by `setInterval`.
    timer: null,
    // We listen for one special event to trigger that we're ready
    // to start inspecting and listening on our property observers.
    handlers: {
        onready: "collectionChanged"
    },
    // Here we have some methods that are actually _dispatch event targets_
    // of an `enyo.View` (the toolbar). We'll see how that works when we
    // examine that view, but suffice it to say these methods are executed
    // because of _bubbled events_ from a part of the view layer.
    //
    // When the `edit` button is tapped, we change our state to editing.
    editModel: function () {
        // We use the `set` setter even though we published the property.
        this.set("isEditing", true);
    },
    // When the `add` button is tapped, we add a new model to the collection
    // with the default properties as defined in the `enyo.Model` kind.
    addModel: function () {
        // Here we call the `add` method that is proxying the underlying
        // collection API. By passing the empy hash, it knows to create the
        // model with all of the defaults.
        this.add({});
    },
    // When the `next` button is tapped we have some additional things to
    // do to prepare the operation.
    nextModel: function () {
      // We want to freeze the current timer-driven operation/animation.
      this.stop();
      // We call our `next` method to select the next index appropriately.
      this.next();
      // Now we restart the timer operation to ensure the animation will
      // continue.
      if (!this.isEditing) this.start();
    },
    // Begin animation of any of the panels for the roller.
    start: function () {
        // If we're already started, we don't have anything to do.
        if (this.isStarted) return;
        // Assign the `timer` property as we create our loop to
        // animate every 5 seconds. Great opportunity to use `enyo.bind`.
        this.timer = setInterval(enyo.bind(this, this.next), 5000);
        // Just in case anyone is listening we'll use the setter
        // to trigger them. It is good practice to do this so that
        // if you (or anyone else) adds a listener later you aren't
        // scratching your head wondering why the value is changing
        // but the `enyo.Observer` is being notified! There are
        // cases where it is desirable _not_ to use the setter.
        this.set("isStarted", true);
    },
    // Stop animation if we are animating.
    stop: function () {
        // Clear the interval timer.
        if (this.timer) clearInterval(this.timer);
        // Reset our `isStarted` property, again
        // using the setter so we trigger listeners if
        // there are any.
        this.set("isStarted", false);
    },
    // Select our next index.
    next: function () {
        // Notice we're using and setting our local `index`
        // property that is part of a _two-way_ `enyo.Binding`.
        var idx = this.get("index");
        var len = this.get("length");
        // If the next value for index goes beyond the number
        // of available panels, reset it to _0_
        // so we can start over.
        if (idx+1 === len) {
          this.set("index", 0);
        } else {
          // Otherwise let's increment the index and move forward.
          this.set("index", ++idx);
        }
    },
    // Listen for and allow us to respond to _editing state_ changes
    // using the default behavior that if the `isEditing` property
    // is modified any `isEditingChanged` method will be called.
    isEditingChanged: function () {
        // If we are indeed editing now we want to stop animation
        // pronto!
        if (this.isEditing === true) this.stop();
        // Otherwise we should start animating because we just left
        // the editing state.
        else this.start();
    },
    // Here we listen and respond to the _length change_ notification
    // so we can automatically begin animating when appropriate.
    lengthChanged: function () {
        // If the length is greater than a single panel let's
        // go ahead and start 'er up.
        if (this.length > 1) this.start();
        // If the length has fallen to 1 (or lower?) let's
        // stop animating.
        if (this.length <= 1) this.stop();
    }
});
