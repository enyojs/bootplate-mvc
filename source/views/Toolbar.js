(function () {
  
    // The `Mvc.Toolbar` view
    // ----------------------
    // The toolbar in our application is interesting because
    // of the number of things it connects to. It uses bindings
    // on the state of the application to control some of its
    // visual state as well as some properties of the application
    // controller as content in its views to be automatically
    // updated when changed.
    enyo.kind({
        // We name the toolbar as a class and in the namespace of
        // the application.
        name: "Mvc.Toolbar",
        // We based it off of `enyo.MoreToolbar` because we want this
        // application to look/work well on mobile devices out of the
        // box not just desktop browsers.
        kind: "onyx.MoreToolbar",
        // Here we arbitrarily set the DOM id for CSS selection and
        // ease-of-reference later on. This is not strictly necessary.
        id: "toolbar",
        // Although the toolbar does not have its own controller we
        // assign it the reference to the application controller
        // we setup in `main`. This does several things for us. We
        // now have a relative reference with `.controller` from the
        // view but the most important key here is that we will
        // automatically propagate 
        controller: "Mvc.controller",
        bindings: [
            // Notice we have bindings from the `isEditing` property of the
            // application controller to the `disabled` property of these
            // `onyx.Button`s. Before we used the same property to flag the
            // `showing` state of our `Mvc.Editor` _view_.
            {from: "controller.isEditing", to: "$.edit.disabled"},
            {from: "controller.isEditing", to: "$.add.disabled"},
            {from: "controller.length", to: "$.count.content"},
            // Make a special note that we are using a transform here. We name
            // the transform but elected to place it on the `owner` object of
            // the _binding_, but don't worry, the _binding_ will find it and
            // transform that 0-n index to 1-n+1 for our human-friendly pleasure.
            {from: "controller.index", to: "$.showing.content", transform: "showingTransform"}
        ],
        components: [
            {id: "app-label", content: "Enyo.js MVC"},
            {name: "edit", kind: "onyx.Button", content: "Edit", ontap: "editModel"},
            {name: "add", kind: "onyx.Button", content: "Add", ontap: "addModel"},
            {name: "next", kind: "onyx.Button", content: "Next", ontap: "nextModel"},
            {components: [
                {tag: "label", content: "Models: "},
                {name: "count", tag: "span"}]},
            {components: [
                {tag: "label", content: "Showing: "},
                {name: "showing", tag: "span"}]}
        ],
        // Transforms also provide a second paramater that is set to
        // the string value of the direction.
        showingTransform: function (value) {
            return value+1;
        }
    });
  
}());