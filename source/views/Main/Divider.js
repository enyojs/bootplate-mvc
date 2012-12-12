
// The `App.Divider` kind
// ----------------------
// This is designed to allow a selection of the
// available annotated source files from a drop-down
// menu. Selecting one of the options propagates the
// _onSelect_ event as is defined by `onyx.MenuItem`.
// Because we set the `controller` to `App.documents`
// this event is dispatched and handled there (since
// we don't handle it locally). The same is true of
// the _Welcome_ button.
enyo.kind({
    name: "App.Divider",
    id: "divider",
    kind: "onyx.MoreToolbar",
    controller: "App.documents",
    components: [
        {kind: "onyx.Button", content: "Welcome"},
        {kind: "onyx.MenuDecorator", components: [
            {content: "Annotated Source"},
            {kind: "onyx.Menu", maxHeight: 245, components: [
                {content: "Core.js"},
                {content: "PanelsController.js"},
                {content: "DocumentsController.js"},
                {content: "EditorController.js"},
                {content: "FitToTargetBoundsLayout.js"},
                {content: "RollerLayout.js"},
                {content: "RollerCollection.js"},
                {content: "RollerModel.js"},
                {content: "Scaffold.js"},
                {content: "App.js"},
                {content: "Editor.js"},
                {content: "Toolbar.js"},
                {content: "Divider.js"},
                {content: "Main.js"},
                {content: "Documents.js"},
                {content: "Roller.js"},
                {content: "RollerPanel.js"}]}]}
    ]
});
