
// The `Sample.RollerModel`
// --------------------------
// Models are native Backbone models and should be implemented
// according to their API.
enyo.ready(function() {
    Sample.RollerModel = Backbone.Model.extend({
        defaults: {
            header: "You just created a new record!",
            editing: false
        }
    });
});
