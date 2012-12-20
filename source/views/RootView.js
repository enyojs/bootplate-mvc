
enyo.kind({
    name: "Sample.RootView",
    classes: "mvc-app",
    fit: true,
    layoutKind: "enyo.FittableRowsLayout",
    components: [
        {name: "toolbar", kind: "App.Toolbar"},
        {name: "main", kind: "App.Main"}
    ]
});
