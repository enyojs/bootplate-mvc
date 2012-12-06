(function () {
  
    // The `Mvc.Divider` kind
    // ---------------
    // Nothing too special here, just another kind with
    // some CSS applied to it.
    enyo.kind({
        name: "Mvc.Divider",
        id: "divider",
        kind: "onyx.MoreToolbar",
        controller: "Mvc.documents",
        handlers: {
            didadd: "addDocButton"
        },
        addDocButton: function (controller, event) {
            var src = event.value.src, label, child;
            label = src.slice(src.lastIndexOf("/")+1, src.length);
            child = this.createComponent({
                kind: "onyx.Button",
                content: label, 
                ontap: "selectSource",
                index: event.value.index
            });
            this.render();
        },
        components: [
            {content: "Annotated Source Files: "}
        ]
    });
  
}());