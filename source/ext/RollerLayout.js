(function () {
  
    // A special layout handler for the `Mvc.Roller` kind that
    // _should_ only make adjustments in a mobile environment when
    // the space is far more limited or an orientation change
    // cuts our vertical display space.
    enyo.kind({
      name: "Mvc.RollerLayout",
      kind: "enyo.Layout",
      reflow: function () {
          // While this is by no means a complete or bullet-proof
          // solution it should broadly detect a mobile-ish environment
          // and reduce the amount of calculation in non-mobile
          // environments.
          if (enyo.platform.gesture || enyo.platform.touch) {
              this.adjustBounds();
          }
      },
      adjustBounds: function () {
          // So we need to adjust to find if our desired height is greater
          // than the available height of the window minus the height of the
          // toolbar.
          var root = enyo.application.rootView, toolbar = root.$.toolbar,
              frame = root.getBounds().height - toolbar.getBounds().height,
              max = this.container.maxHeight, calc = max < frame? max: frame,
              curr = this.container.getBounds().height;
          // Ok, we have the correct height now lets adjust accordingly.
          if (curr !== calc) this.container.setBounds({height: calc}, "px");
      }
    });
  
}());