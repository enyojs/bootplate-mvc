(function () {
  
  //*@public
  /**
    This method, if it exists, will be called after the source has been
    loaded and processed but before the application is executed. This
    is the method in which you would instantiate singleton objects that
    may be referenced by bindings when _enyo.View_ objects are created.
  */
  window.main = function () {
    enyo.singleton({name: "Mvc.CarouselController", kind: "Mvc.Controllers.Carousel"});
  };
  
  //*@public
  /**
    You can also register functions (from anywhere) to execute after the
    framework has started even if the method was loaded early.
  */
  enyo.run(function () {
    // lets go ahead and add some default models to our carousel controller
    // and see where they show up, later we'll see how their hooked up
    // and even let you edit these in real-time or add more entries
    // note that we already had some local-testing models defined in
    // a scaffold object we are simply inserting here
    Mvc.CarouselController.add(Mvc.Scaffold.CarouselEntries);
  });
  
}());