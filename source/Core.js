(function () {
  
  //*@public
  /**
    This method, if it exists, will be called after the source has been
    loaded and processed but before the application is executed. This
    is the method in which you would instantiate singleton objects that
    may be referenced by bindings when _enyo.View_ objects are created.
  */
  window.main = function () {
    // lets set up a global controller that will proxy our underlying
    // data collection
    enyo.singleton({
      name: "Mvc.CollectionController", 
      kind: "enyo.CollectionController",
      collection: "Mvc.CarouselCollection",
      published: {
        selected: 0
      },
      lengthChanged: function (prev, cur) {
        if (prev === 0 && cur > 0) this.selectedChanged();
      },
      selectedChanged: function () {
        var data = this.data, selected = this.selected;
        enyo.forEach(data, function (model, idx) {
          model.set({selected: idx === selected});
        });
      }
    });
  };
  
  //*@public
  /**
    You can also register functions (from anywhere) to execute after the
    framework has started even if the method was loaded early.
  */
  enyo.run(function () {
    // lets go ahead and add our included scaffold (fake) data-models to
    // our collection through the collection controller we stood up
    Mvc.CollectionController.add(Mvc.Scaffold.Carousel);
  });
  
}());