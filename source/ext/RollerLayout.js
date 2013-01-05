
// The `Sample.RollerLayout` kind
// ---------------------------
// This special layout handler for `Sample.Roller` is designed to make
// adjustments in a mobile environment (where space is limited) or
// when an orientation change reduces the amount of vertical display
// space available.
enyo.kind({
  name: "Sample.RollerLayout",
  kind: "enyo.Layout",
  flow: function () {
    this.reflow();  
  },
  // This method should generally detect a mobile-ish environment and
  // reduce the number of calculations needed in a non-mobile
  // environment.
  reflow: function () {
      if (enyo.platform.gesture || enyo.platform.touch) {
          this.adjustBounds();
      }
  },
  // Makes adjustments if our desired height is greater than the available
  // height of the window minus the height of the toolbar. (This layout is
  // designed specifically for this view.)
  adjustBounds: function () {
      var root = enyo.application.rootView;
      var toolbar = root.$.toolbar;
      var frame = root.getBounds().height - toolbar.getBounds().height;
      var max = this.container.maxHeight;
      var calc = max < frame? max: frame;
      var curr = this.container.getBounds().height;
      if (curr !== calc) this.container.setBounds({height: calc}, "px");
  }
});
