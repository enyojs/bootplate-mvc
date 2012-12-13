
// The `App.RollerLayout` kind
// ---------------------------
// A special layout handler for the `App.Roller` kind that
// _should_ only make adjustments in a mobile environment when
// the space is far more limited or an orientation change
// cuts our vertical display space.
enyo.kind({
  name: "App.RollerLayout",
  kind: "enyo.Layout",
  flow: function () {
    this.reflow();  
  },
  // While this is by no means a complete or bullet-proof
  // solution it should broadly detect a mobile-ish environment
  // and reduce the amount of calculation in non-mobile
  // environments.
  reflow: function () {
      if (enyo.platform.gesture || enyo.platform.touch) {
          this.adjustBounds();
      }
  },
  // So we need to adjust to find if our desired height is greater
  // than the available height of the window minus the height of the
  // toolbar. Obviously this layout is designed specifically for this
  // _view_ and this application.
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
