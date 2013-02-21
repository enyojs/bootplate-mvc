enyo.ready(function () {

    enyo.kind({
        name: "Bootplate.MainView",
    	kind: "FittableRows",
    	fit: true,
        bindings: [{
            from: ".app.controllers.message.data",
            to: ".$.input.value",
            kind: "enyo.InputBinding"
        }, {
            from: ".app.controllers.message.data",
            to: ".$.toolbar.content"
        }],
        components: [{
            name: "toolbar",
            kind: "onyx.Toolbar"
        }, {
            kind: "enyo.Scroller",
            fit: true,
            components: [{
                name: "main",
                kind: "wip.Repeater",
                controller: ".app.controllers.messages",
                components: [{
                    classes: "nice-padding",
                    bindFrom: "message"
                }]
            }]
        }, {
            kind: "onyx.Toolbar",
            components: [{
                kind: "onyx.Button",
                content: "Record Entry",
                ontap: "addRecord",
                controller: ".app.controllers.message"
            }, {
                kind: "onyx.InputDecorator",
                components: [{
                    name: "input",
                    kind: "onyx.Input",
                    placeholder: "Watch bindings work"
                }]
            }]
        }]
    });
    
});
