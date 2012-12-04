(function () {
  
    // The `Mvc.Divider` kind
    // ---------------
    // Nothing too special here, just another kind with
    // some CSS applied to it.
    enyo.kind({
        name: "Mvc.Divider",
        id: "divider",
        kind: "onyx.MoreToolbar",
        components: [
            {kind: "onyx.Button", content: "MVC"},
            {kind: "onyx.Button", content: "View"},
            {kind: "onyx.Button", content: "Model"},
            {kind: "onyx.Button", content: "Control"}
        ]
    });
  
}());