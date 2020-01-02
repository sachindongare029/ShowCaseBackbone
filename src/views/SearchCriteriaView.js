var App = App || {};

App.views.SearchCriteriaView = Backbone.View.extend({
  el: "#catalog__search-criteria",

  events: {
    "click #criteria": "clearCriteria"
  },

  initialize: function(options) {
    _.bindAll(this, "render", "clearCriteria");
    this.options = options.criteria;
    this.render();
  },

  render: function() {
    var self = this;

    $.get("/src/templates/searchcriteria.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        criteria: self.options
      });
      self.$el.html(finalHtml);
    });
    return this;
  },

  clearCriteria: function(e) {
    var prntNode = e.target.parentNode;
    var clearFilter = $(prntNode).text();
    var filterToClear = _.invert(App.helpers.getFilters())[clearFilter];
    console.log("clear", filterToClear);
    if (filterToClear === "search") {
      $("input").val("");
    }
    // localStorage.removeItem("filters");
    App.helpers.setFilters({
      [filterToClear]: ''
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      page: 1,
      limit: 24,
      sort: "pricing.retail;desc"
    });
  }
});
