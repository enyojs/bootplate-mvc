
// The `Sample.RollerCollection` kind
// -------------------------------
// It is helpful to abstract your application objects--for clarity's
// sake, if nothing else. In this case, we have no special properties
// in our collection definition except for `model`, which must be set.
//
// If you are absolutely certain that you will not extend the kind, and
// you prefer not to create an entry for the collection kind, you may
// choose not to create one.
//
// If you don't specify a collection kind in other kind definitions,
// they will use `enyo.Collection` by default. This means, however,
// that if you want to use a specific model kind with the collection,
// you must define the `model` property on the kind, so that it can be
// found during initialization. An `enyo.Collection` is useless if it
// doesn't know what the underlying `enyo.Model` type is, and it will
// let you know if it cannot figure out which model kind to use.
enyo.kind({
    name: "Sample.RollerCollection",
    kind: "enyo.Collection",
    model: "Sample.RollerModel"
});
