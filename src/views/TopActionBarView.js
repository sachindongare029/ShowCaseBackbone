var App = App || {};

App.views.TopActionBarView = Backbone.View.extend({
  el: "#catalog__top-action-bar",

  events: {
    "click #list-view": "chooseListView",
    "click #two-grid-view": "chooseTwoGridView",
    "click #three-grid-view": "chooseThreeGridView",
    "change #sort": "sortProducts"
  },

  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get("/src/templates/topactionbar.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        totalCount: self.options.totalCount
      });
      self.$el.html(finalHtml);
    });
    return self;
  },

  chooseListView: function() {
    App.eventBus.trigger("GRID_UPDATE", {
      viewSelected: "col-md-12"
    });
  },

  chooseTwoGridView: function() {
    App.eventBus.trigger("GRID_UPDATE", {
      viewSelected: "col-md-6"
    });
  },

  chooseThreeGridView: function() {
    App.eventBus.trigger("GRID_UPDATE", {
      viewSelected: "col-md-4"
    });
  },

  sortProducts: function() {
  }
});
