
enyo.kind({
    name: "Sample.Application",
    kind: "enyo.Application",
    autoStart: false,
    renderOnStart: true,
    view: "Sample.RootView",
    controllers: [
        {name: "panels", kind: "Sample.PanelsController"},
        {name: "documents", kind: "Sample.DocumentsController"}
    ]
});