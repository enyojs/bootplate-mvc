(function () {
  
  // The _main_ view
  // ---------------
  // The _main_ presentation portion of the application. We
  // Capture the rest of the content for the app in a vertical
  // scroller. The presentation is then broken down further into
  // conveniently named parts. It isn't always necessary to do break
  // every view into its own kind but for any section that has
  // specific behavior or needs to encapsulate behavior beneath it
  // by providing scope-relevant bindings to its children - is a
  // pretty good indicator you might benefit from breaking it out.
  enyo.kind({
    // Notice we use our application namespace for this _kind_.
    name: "Mvc.Main",
    kind: "enyo.Scroller",
    id: "main",
    classes: "main",
    fit: true,
    // Bindings can be used for many things and they provide a means
    // to convert datatypes differently on each end if desired (_transform_)
    // but sometimes you can make it work without the _transform_ simply
    // by binding the appropriate type. Here we bound a state property of
    // the application controller (a boolean) to the `showing` property of
    // one of our child views. Now, without any additional logic, the _editor_
    // child will only show when `isEditing` is set to true.
    bindings: [
      // Also note how only 2 properties are defined, there are many options
      // and ways to build `enyo.Bindings` but the _bindings array_ is one of
      // the most convenient. `enyo.Bindings` are _oneWay_ by default. We will
      // see an example of a _two way_ binding in another component.
      {from: "Mvc.controller.isEditing", to: "$.editor.showing"}
    ],
    handlers: {
      // Ugly hack for a chrome related bug.
      oninput: "chromeworkaround"
    },
    components: [
      {name: "roller", kind: "Mvc.Roller"},
      {name: "editor", kind: "Mvc.Editor"},
      {name: "divider", kind: "Mvc.Divider"},
      {name: "default", id: "default"},
      {name: "documents", id: "documents", tag: "section"},
      {name: "footer", id: "footer", tag: "footer"}
    ],
    // This is an ugly hack for forcing Chrome to re-render sub-layers
    // with pseudo transparent layers above them.
    chromeworkaround: function () {
      this.$.roller.render();
    }
  });

}());