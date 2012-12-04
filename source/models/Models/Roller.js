(function () {
  
    // The `Mvc.RollerModel` class
    // ---------------------------
    // ## Extends `enyo.Model`
    // 
    // A very simple model that only has 2
    // default properties.
    enyo.kind({
        name: "Mvc.RollerModel",
        kind: "enyo.Model",
        defaults: {
            header: "You just created a new model! Definitely change the content.",
            editing: false
        }
    });
  
}());