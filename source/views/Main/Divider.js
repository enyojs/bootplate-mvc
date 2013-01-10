
// The `Sample.Divider` kind
// -------------------------
// The divider is a toolbar with options to control the panels
// beneath it.
enyo.kind({
    name: "Sample.Divider",
    id: "divider",
    kind: "onyx.Toolbar",
    // The _Sample.files_ controller has an API for controlling its
    // _index_ property (the same one that controlls the panels beneath
    // this view). The buttons on this toolbar have their _ontap_ events
    // properly mapped to that API and since the controller property of
    // this view is set to _Sample.files_ it will receive and handle those
    // events.
    controller: "Sample.files",
    // We may not be able to bind directly to models or collections but
    // it we use an _enyo.ModelController_ we can bind to that instead
    // and as you'll see in our bindings block we have the _selection_
    // (selected model) of the _Sample.files_ controller bound to the
    // _model_ property of our newly created model controller. Because this
    // view will only be implemented once it is safe to assign it directly
    // to an instance of _enyo.ModelController_, but if this was to be
    // subclassed, all future instances would share a reference to this
    // controller and that would likely not be intended.
    selection: new enyo.ModelController(),
    bindings: [
        // Here we have create the binding from the selected model of
        // _Sample.files_ to the _model_ property of our local model controller.
        {from: ".controller.selection", to: ".selection.model"},
        // We bind to the index of our controller and use a transform to properly
        // set the _disabled_ property of our back button. Note we name the transform
        // here but implement it on the view. There are other ways of using transforms
        // as well.
        {from: ".controller.index", to: ".$.back.disabled", transform: "backTransform"},
        // Because the _selection_ property is a model controller we want to use its
        // _path_ attribute as the content of one of our children. This is a clickable
        // path that also uses the API associated with controlling the _index_ property
        // of the _Sample.files_ controller.
        {from: ".selection.path", to: ".$.filename.content"}
    ],
    components: [
        {kind: "onyx.Button", content: "Welcome", ontap: "welcome"},
        {kind: "onyx.Button", content: "Files", ontap: "files"},
        {name: "back", kind: "onyx.Button", content: "Back", ontap: "back"},
        {name: "filename", classes: "filename", ontap: "filename"}
    ],
    // While we don't use them, note the additional parameters for this transform.
    // When it is executed, the _direction_ parameter contains either "source" or
    // "target" which indicates which of those ends will have their values set. The
    // third parameter, _binding_, is a reference to the binding being executed. If
    // there is a case where you did not want the value to be set you could simply
    // call _binding.stop()_ and it interrupt the binding and continue. Transforms
    // are executed in the context of their owner - and since we created the binding
    // in our bindings block the _owner_ of the binding is this view.
    backTransform: function (value, direction, binding) {
        if (isNaN(value)) return false;
        else if (0 !== value) return false;
    },
    // We overload the cleanup here even though it will never be called to show
    // good awareness that we have an instance of a kind that needs to have its own
    // destructor called.
    destroy: function () {
        if (this.selection) {
            this.selection.destroy();
        }
        return this.inherited(arguments);
    }
});
