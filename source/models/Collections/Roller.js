(function () {
  
  // The `Mvc.RollerCollection` class
  // --------------------------------
  // ## Extends `enyo.Collection`
  //
  // Really nothing special, simply subclasses `enyo.Collection`
  // and provides the default (and required) `enyo.Model`
  // identifier.
  enyo.kind({
    name: "Mvc.RollerCollection",
    kind: "enyo.Collection",
    model: "Mvc.RollerModel"
  });
  
}());