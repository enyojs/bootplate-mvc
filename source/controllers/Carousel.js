enyo.kind({
  name: "Mvc.CarouselController",
  kind: "enyo.CollectionController",
  // here we actually set the collection property
  // to the global collection controller instance
  // we stood up in the main function
  collection: "Mvc.CollectionController",
  handlers: {
    oncollectionadd: "didAdd"
  },
  bindings: [
    {from: "owner.index", to: "index", oneWay: false}
  ],
  timer: null,
  isStarted: false,
  published: {
    index: 0
  },
  collectionChanged: function () {
    this.inherited(arguments);
    this.collection.set("selected", this.index);
  },
  didAdd: function (sender, model) {
    var panel = this.owner.createComponent({kind: "Mvc.CarouselPanel"});
    panel.controller.set("model", model);
    this.owner.render();
  },
  lengthChanged: function () {
    if (this.length > 1) this.start();
  },
  start: function () {
    if (this.isStarted) return;
    this.stop();
    this.timer = setInterval(enyo.bind(this, this.next), 5000);
    this.isStarted = true;
  },
  stop: function () {
    if (this.timer) clearInterval(this.timer);
    this.isStarted = false;
  },
  next: function () {
    // note that we're retrieving our local `index` property that
    // has a two-way binding to our owner view such that when
    // we set our local `index` it also updates the views index
    var idx = this.get("index"), len = this.get("length");
    if (idx+1 === len) {
      this.setIndex(0);
      idx = 0;
    } else {
      this.setIndex(++idx);
    }
    this.collection.set("selected", idx);
  }
});