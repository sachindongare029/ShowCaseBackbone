var App = App || {};

App.views.SearchCriteriaView = Backbone.View.extend({
  el: "#catalog__search-criteria",

  events: {
    "click #criteria": "clearCriteria"
  },

  initialize: function(options) {
    _.bindAll(this, "render", "clearCriteria");
    this.options = options;
    this.render();
  },

  render: function() {
    var self = this;

    $.get("/src/templates/searchcriteria.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        criteria: self.options.criteria
      });
      self.$el.html(finalHtml);
    });
    return this;
  },

  clearCriteria: function(e) {
    $("input").val("");
    localStorage.removeItem("filters");
    App.helpers.setFilters({
      page: 1,
      limit: 24,
      sort: "pricing.retail;desc",
      view: "col-md-4"
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      page: 1,
      limit: 24,
      sort: "pricing.retail;desc"
    });
  }
});
