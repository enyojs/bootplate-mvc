
// The `Sample.PanelsController` kind
// -------------------------------
// This is the kind definition for the global singleton application
// panels controller (`Sample.panels`) instantiated in `Sample.js`.
enyo.kind({
    // We give the kind a name in the application namespace.
    name: "Sample.PanelsController",
    // We base this kind on `enyo.CollectionController` because we know
    // we need the collection controller's built-in methods. Even
    // though this is an `enyo.CollectionController`, we can add
    // functionality because it's ultimately just an `enyo.Controller`
    // with additional features.
    kind: "enyo.CollectionController",
    // We already know what the collection kind is going to be for this
    // controller. Furthermore, we know that there will not be a shared
    // global instance of the collection. We will hand this controller
    // a kind reference and it will instantiate the collection kind when
    // it is created.
    collection: "Sample.RollerCollection",
    // The entire application has state. One possible state is the
    // is the editing state. While the `isEditing` property is
    // designed to be used directly with the `Sample.Roller` view kind,
    // any other component in the application may respond to it as
    // well (as we will see).
    isEditing: false,
    // This is an example of abstracting common elements to the
    // outermost commonly-available controller to be shared between
    // objects that have no direct connection but may share some
    // state. In this case, some of the application's functionality
    // is separated because of how it needs to be represented in the
    // DOM, but both elements need to know what `index` the roller
    // has selected. Using bindings, we make this property available
    // from the outermost controller, so that any instance of
    // `enyo.View` or `enyo.Controller` may access it as needed.
    //
    // This value is actually bound to the view that implements the
    // `enyo.Panels` that coordinates the presentation of these
    // models in the `enyo.Collection`. The binding to this property
    // is initiated in the view.
    index: 0,
    // A simple boolean to keep track of whether or not the animation
    // is running
    isStarted: false,
    // The timer reference as returned by `setInterval`
    timer: null,
    // The following methods are actually dispatch event targets of an
    // `enyo.View` (the toolbar). These methods are executed in response
    // to events bubbled from the view layer.
    //
    // When the `"Edit"` button is tapped, we change to the editing state.
    editModel: function () {
        // We use the `set` method even though we've published the property.
        this.set("isEditing", true);
    },
    // When the `"Add"` button is tapped, we add a new model to the
    // collection.  Its properties have the default values defined in
    // `enyo.Model`.
    addModel: function () {
        // Here we call the `add` method that is proxying the underlying
        // collection API. Because we pass in an empty hash, it knows to
        // create the model using all of the defaults.
        this.add({});
    },
    // When the `"Next"` button is tapped, we have some additional things
    // to do to prepare the operation.
    nextModel: function () {
      // We freeze the current timer-driven operation/animation.
      this.stop();
      // We call our `next` method to select the next index.
      this.next();
      // Then we restart the timer operation to ensure the animation will
      // continue.
      if (!this.isEditing) this.start();
    },
    // Begins animation of any of the panels for the roller.
    start: function () {
        // If we're already started, we have nothing to do.
        if (this.isStarted) return;
        // Assign the `timer` property as we create a loop to animate
        // every 5 seconds. A great opportunity to use `enyo.bind`.
        this.timer = setInterval(enyo.bind(this, this.next), 5000);
        // We'll use the setter to notify anyone who happens to be
        // listening. It is good practice to do this so that if you add
        // a listener later you won't wonder why the value is changing
        // but the observer is being notified. (Though there are cases
        // in which it's desirable _not_ to use the setter.)
        this.set("isStarted", true);
    },
    // Stops animation if we are animating.
    stop: function () {
        // Clear the interval timer.
        if (this.timer) clearInterval(this.timer);
        // Reset our `isStarted` property, again using the setter
        // so that we trigger listeners (if there are any).
        this.set("isStarted", false);
    },
    // Selects our next index.
    next: function () {
        // Notice we're using and setting our local `index`
        // property, which is part of a two-way binding.
        var idx = this.get("index");
        var len = this.get("length");
        // If the next value for index goes beyond the number of
        // available panels, reset it to 0 so we can start over.
        if (idx+1 === len) {
          this.set("index", 0);
        } else {
          // Otherwise, increment the index and move forward.
          this.set("index", ++idx);
        }
    },
    // Listens for and lets us respond to changes in editing state.
    // Relies on the default behavior that if the `isEditing` property
    // is modified, the `isEditingChanged` method will be called (if
    // such a method exists).
    isEditingChanged: function () {
        // If we are editing now, stop animating.
        if (this.isEditing === true) this.stop();
        // Otherwise, start animating because we just left the editing
        // state.
        else this.start();
    },
    // Listens for length change notifications, so we can automatically
    // begin animating when appropriate.
    lengthChanged: function () {
        // If the length (i.e., the number of panels) is greater than
        // 1, start animating.
        if (this.length > 1) this.start();
        // If the length has fallen to 1, stop animating.
        if (this.length <= 1) this.stop();
    }
});
