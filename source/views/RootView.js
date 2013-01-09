
// The `Sample.RootView` kind
// --------------------------
// Every `enyo.Application` object starts with a single
// _view_ (if any). In our application we designate our root
// to be this _kind_. Essentially every _application_'s _view_
// is the top of a tree of _views_.
enyo.kind({
    // Note that our root _view_ makes use of the namespace we've
    // used consistently throughout the _kinds_ we've defined.
    name: "Sample.RootView",
    classes: "mvc-app",
    layoutKind: "enyo.FittableRowsLayout",
    components: [
        {name: "main", kind: "Sample.Main"}
    ]
});
