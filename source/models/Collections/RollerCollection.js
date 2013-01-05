
// The `Sample.RollerCollection`
// -----------------------------
// It is helpful to abstract your application objects--for clarity's
// sake, if nothing else. In this case, we have no special properties
// in our collection definition except for `model`, which must be set.
enyo.ready(function () {
    Sample.RollerCollection = Backbone.Collection.extend({
        model: Sample.RollerModel
    });
});
