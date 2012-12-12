
// The `App.Documents` kind
// ------------------------
// This is a special container kind that works in tandem
// with its controller. The controller (`App.DocumentsController`)
// is responsible for asynchronously loading static html
// _pagelets_. This particular view is agnostic to what
// pages actually exist or which is selected except for its
// index. It is bound to the `selected` property of its
// controller and when that value changes it retrieves the
// _pagelet_ content and injects it into itself.
enyo.kind({
    name: "App.Documents",
    controller: "App.documents",
    id: "documents",
    allowHtml: true,
    // This property maps back to the controller's currently
    // selected model by reference and is implemented via the
    // binding.
    selected: null,
    // We only needed one binding to make this magic happen.
    bindings: [
        {from: "controller.selected", to: "selected"}
    ],
    // Quite simple really. When the `selected` property is
    // modified, check to make sure it exists and if it does
    // display that content. The proper _css_ is already included
    // for each _pagelet_. Doesn't get much easier.
    selectedChanged: function () {
        var doc = this.controller.at(this.selected);
        if (doc) {
            this.set("content", doc.content);
        }
    }
});
