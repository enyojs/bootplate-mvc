
// The `Sample.Documents` kind
// ------------------------
// `Sample.Documents` is a special container kind that works in tandem
// with its controller, `Sample.DocumentsController`.  The controller
// is responsible for asynchronously loading static HTML "pagelets".
// This particular view is agnostic as to what pages actually exist
// or which one is selected (beyond knowing its index). It is bound
// to the `selected` property of its controller; when that value
// changes, `Sample.Documents` retrieves the pagelet content and injects 
// it into itself.
enyo.kind({
    name: "Sample.Documents",
    controller: "Sample.documents",
    id: "documents",
    allowHtml: true,
    // The `selected` property maps back to the controller's currently
    // selected model by reference and is implemented via the binding.
    selected: null,
    // We only need one binding to make this happen.
    bindings: [
        {from: "controller.selected", to: "selected"}
    ],
    // When the `selected` property is modified, check to make sure it
    // exists; if it does, display that content. The proper CSS is
    // already included for each pagelet.
    selectedChanged: function () {
        var doc = this.controller.at(this.selected);
        if (doc) {
            this.set("content", doc.content);
        }
    }
});
