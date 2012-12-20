
// The `Sample.RollerModel` kind
// --------------------------
// While this subkind of `enyo.Model` doesn't do a whole lot, it
// serves to illustrate one very important point: It is highly
// recommended (though not strictly mandatory) that you specify a
// default value for each property you set on a model-instance
// (record).
//
// Also note that when you create a new record at runtime (by
// pressing the "Add" button), the initial message is the one
// declared here in the model's `defaults` block.
enyo.kind({
    name: "Sample.RollerModel",
    kind: "enyo.Model",
    defaults: {
        header: "You just created a new record!",
        editing: false
    }
});
