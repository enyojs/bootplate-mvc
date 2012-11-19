//*@public
/**
*/
enyo.kind({
  name: "Mvc.CarouselContainer",
  classes: "carousel-container",
  maxHeight: 400,
  reflow: function () {
    this.adjustBounds();
    this.inherited(arguments);
  },
  adjustBounds: function () {
    var r = enyo.application.rootView, t = r.$.toolbar.getBounds().height,
        w = r.getBounds().height, m = this.maxHeight, h = w - t;
    this.setBounds({height: m<h? m: h}, "px");
  }
});