enyo.ready(function () {
    
    enyo.kind({
        name: "Bootplate.MessageController",
        kind: "enyo.Controller",
        data: "Hello World"
    });
    
    enyo.kind({
        name: "Bootplate.MessagesController",
        kind: "enyo.ArrayController"
    });
    
});
