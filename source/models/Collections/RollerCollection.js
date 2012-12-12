
// The `App.RollerCollection` kind
// -------------------------------
// It is helpful to abstract your application objects
// if for no other reason than clarity. In this case
// we have no special properties on our _collection_
// definition except for the `model` property that must
// be set. If you are _absolutely certain_ you will not
// extend the class and prefer __not__ to create an entry
// for the _collection_ kind, you're in luck. If you don't
// specify a _collection_ kind in other kind definitions
// they will automatically use `enyo.Collection` generically.
// This means, though, that if you want to use a specific
// _model_ kind with that collection you must instead
// provide that property (`model`) on the kind so it can
// be found during initialization. A `enyo.Collection` is
// useless without knowing what the underlying `enyo.Model`
// type is and it will let you know if it cannot figure out
// what _model_ kind to use.
enyo.kind({
    name: "App.RollerCollection",
    kind: "enyo.Collection",
    model: "App.RollerModel"
});
