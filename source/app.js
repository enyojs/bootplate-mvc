enyo.kind({
    name: "Bootplate.Application",
    kind: "enyo.Application",
    controllers: [{
        name: "Bootplate.bindingController",
        kind: "enyo.Controller",
        data: "Hello World",
        addRecord: function (sender, event) {
            Bootplate.arrayController.add({message: this.get("data")});
        }
    }, {
        name: "Bootplate.arrayController",
        kind: "enyo.ArrayController"
    }],
    view: {
    	kind: "FittableRows",
    	fit: true,
        bindings: [{
            from: "Bootplate.bindingController.data",
            to: ".$.input.value",
            transform: "placeholder",
            oneWay: false
        }, {
            from: "Bootplate.bindingController.data",
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
                controller: "Bootplate.arrayController",
                components: [{
                    bindFrom: "message"
                }]
            }]
        }, {
            kind: "onyx.Toolbar",
            components: [{
                kind: "onyx.Button",
                content: "Record Entry",
                ontap: "addRecord",
                controller: "Bootplate.bindingController"
            }, {
                kind: "onyx.InputDecorator",
                components: [{
                    name: "input",
                    kind: "onyx.Input",
                    placeholder: "Watch bindings work"
                }]
            }]
        }],
        placeholder: function (value, direction, binding) {
            return value? value: this.$.input.placeholder;
        }
    }
});
