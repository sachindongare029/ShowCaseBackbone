var App = App || {};

App.views.TopActionBarView = Backbone.View.extend({
  el: "#catalog__top-action-bar",

  events: {
    "click #col-md-12": "chooseListView",
    "click #col-md-6": "chooseTwoGridView",
    "click #col-md-4": "chooseThreeGridView",
    "change #sort": "sortProducts",
    "change #items-per-page": "productPerPage"
  },

  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    var addedFilters = App.helpers.getFilters();
    $.get("/src/templates/topactionbar.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        totalCount: self.options.totalCount
      });
      self.$el.html(finalHtml);
      self.$el
        .find('#sort option[value="' + addedFilters.sort + '"]')
        .attr("selected", "selected");
      self.$el
        .find('#items-per-page option[value="' + addedFilters.limit + '"]')
        .attr("selected", "selected");
    });
    return self;
  },

  chooseListView: function() {
    App.helpers.setFilters({
      view: 'col-md-12'
    });
    App.eventBus.trigger("GRID_UPDATE", {
      viewSelected: "col-md-12"
    });
  },

  chooseTwoGridView: function() {
    App.helpers.setFilters({
      view: 'col-md-6'
    });
    App.eventBus.trigger("GRID_UPDATE", {
      viewSelected: "col-md-6"
    });
  },

  chooseThreeGridView: function() {
    App.helpers.setFilters({
      view: 'col-md-4'
    });
    App.eventBus.trigger("GRID_UPDATE", {
      viewSelected: "col-md-4"
    });
  },

  sortProducts: function() {
    var selectedSortOption = this.$el.find("#sort option:selected").val();

    App.helpers.setFilters({
      sort: selectedSortOption
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      sort: selectedSortOption
    });
  },

  productPerPage: function() {
    var selectedPageLimit = this.$el.find("#items-per-page option:selected").val();
    App.helpers.setFilters({
      limit: selectedPageLimit
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      limit: selectedPageLimit
    });
  }
});
