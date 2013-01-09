
// The `Sample.Divider` kind
// ----------------------
enyo.kind({
    name: "Sample.Divider",
    id: "divider",
    kind: "onyx.Toolbar",
    controller: "Sample.files",
    selection: new enyo.ModelController(),
    bindings: [
        {from: ".controller.selection", to: ".selection.model"},
        {from: ".controller.index", to: ".$.back.disabled", transform: "back"},
        {from: ".selection.path", to: ".$.filename.content"}
    ],
    components: [
        {kind: "onyx.Button", content: "Welcome", ontap: "welcome"},
        {kind: "onyx.Button", content: "Files", ontap: "files"},
        {name: "back", kind: "onyx.Button", content: "Back", ontap: "back"},
        {name: "filename", classes: "filename", ontap: "filename"}
    ],
    back: function (value) {
        if (isNaN(value)) return false;
        else if (0 !== value) return false;
    },
    destroy: function () {
        if (this.selection) {
            this.selection.destroy();
        }
        return this.inherited(arguments);
    }
});
