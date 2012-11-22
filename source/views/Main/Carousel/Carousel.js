//*@public
/**
*/
enyo.kind({
  name: "Mvc.Carousel",
  id: "carousel",
  classes: "carousel-container",
  maxHeight: 400,
  reflow: function () {
    this.adjustBounds();
    this.inherited(arguments);
  },
  adjustBounds: function () {
    var r = enyo.application.rootView, t = r.$.toolbar.getBounds().height,
        w = r.getBounds().height, m = this.maxHeight, h = w - t, s;
    s = m<h? m: h;
    this.setBounds({height: s}, "px");
  },
  components: [
    {name: "controls", kind: "Mvc.CarouselControls"},
    {name: "panels", kind: "enyo.Panels", draggable: false, fit: true,
      id: "carousel-panels", wrap: false, arrangerKind: "enyo.TopBottomArranger",
      controller: "Mvc.CarouselController"}
  ]
})