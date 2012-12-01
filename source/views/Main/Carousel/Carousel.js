//*@public
/**
*/
enyo.kind({
  name: "Mvc.Carousel",
  id: "carousel",
  classes: "carousel-container",
  maxHeight: 400,
  bindings: [
    {from: "Mvc.CollectionController.isEditing", to: "isEditing"}
  ],
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
    {name: "panels", kind: "enyo.Panels", draggable: false, fit: true,
      id: "carousel-panels", wrap: false, arrangerKind: "enyo.TopBottomArranger",
      controller: "Mvc.CarouselController"}
  ],
  isEditingChanged: function () {
    if (this.isEditing) {
      if (this.hasClass("normal")) this.removeClass("normal");
      this.addClass("editing");
    } else if (this.hasClass("editing")) {
      this.addClass("normal");
      this.removeClass("editing");
    }
  }
})