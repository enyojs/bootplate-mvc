enyo.kind({
	name: "Bootplate.Application",
	kind: "enyo.Application",
	components: [{
		name: "message",
		kind: "Bootplate.MessageController"
	}, {
		name: "messages",
		kind: "Bootplate.MessagesController"
	}],
	view: "Bootplate.MainView",
	handlers: {
		onAddRecord: "handleAddRecord"
	},
	handleAddRecord: function (sender, event) {
		var data = this.$.message.get("data");
		this.$.messages.add({"message": data});
	}
});
