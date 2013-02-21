enyo.kind({
    name: "Bootplate.Application",
    kind: "enyo.Application",
    controllers: [{
        name: "message",
        kind: "Bootplate.MessageController"
    }, {
        name: "messages",
        kind: "Bootplate.MessagesController"
    }],
    view: "Bootplate.MainView",
    addRecord: function (sender, event) {
        var data = this.controllers.message.get("data");
        var messages = this.controllers.messages;
        messages.add({message: data});
    }
});
