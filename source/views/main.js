enyo.kind({
	name: "Bootplate.MainView",
	kind: "FittableRows",
	fit: true,
	events: {
		// sent from view to indicate "Add Record" button hit
		onAddRecord: ""
	},
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
			kind: "enyo.DataRepeater",
			controller: ".app.controllers.messages",
			components: [{
				classes: "nice-padding",
				components: [{
					tag: "span",
					content: "Message: "
				}, {
					tag: "span",
					name: "message",
					classes: "nice-padding",
				}],
				bindings: [
					{from: ".model.message", to: ".$.message.content"}
				]
			}]
		}]
	}, {
		kind: "onyx.Toolbar",
		components: [{
			kind: "onyx.Button",
			content: "Record Entry",
			ontap: "addRecord"
		}, {
			kind: "onyx.InputDecorator",
			components: [{
				name: "input",
				kind: "onyx.Input",
				placeholder: "Watch bindings work"
			}]
		}]
	}],
	addRecord: function(inSender, inEvent) {
		this.doAddRecord();
	}
});
