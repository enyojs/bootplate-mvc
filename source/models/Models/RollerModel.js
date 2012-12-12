
// The `App.RollerModel` kind
// --------------------------
// While this subkind of `enyo.Model` doesn't do much
// magic it is important to note a paricular convention
// that can spare you many headaches. __While it is not
// required to set a default value for a property you
// intend to set on model-instances (records) it is
// better if you do!__ Also note that when you create a
// new record in the application by pressing the _Add_
// button the initial message is the one found here
// in the model defaults.
enyo.kind({
    name: "App.RollerModel",
    kind: "enyo.Model",
    defaults: {
        header: "You just created a new record!",
        editing: false
    }
});
