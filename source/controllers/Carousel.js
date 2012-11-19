enyo.kind({
  name: "Mvc.Controllers.Carousel",
  kind: "enyo.CollectionController",
  collection: "Mvc.Models.CarouselEntries",
  handlers: {
    oncollectionadd: "didAdd"
  },
  didAdd: function (inSender, inModel) {
    var o = this.owner, p;
    if (!o) return;
    p = new Mvc.CarouselPanel();
    p.controller.set("model", inModel);
    o.addControl(p);
    o.render();
    return true;
  },
  timer: null,
  isStarted: false,
  published: {
    index: 0
  },
  lengthChanged: function () {
    if (this.length > 1) this.start();
  },
  bindings: [
    // example of a two-way binding, see the `next` method below
    {from: "owner.index", to: "index"}
  ],
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
    var i = this.get("index"), l = this.get("length");
    if (i+1 === l) this.setIndex(0);
    else this.setIndex(i+1);
  }
});