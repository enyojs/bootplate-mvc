enyo.kind({
  name: "App.AppController",
  kind: "enyo.ApplicationController",
  handlers: {
    ontap: "tapped"
  },
  tapped: function (inSender, inEvent) {
    if (inSender.name === "hello")
      App.$.hello.addContent("<br/><b>hello</b> control was tapped");
  }
});