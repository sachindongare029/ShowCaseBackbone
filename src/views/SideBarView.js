var App = App || {};

App.views.SideBarView = Backbone.View.extend({
  el: "#sidebar",

  events: {
    "click #reset-filter-btn": "resetFilters",
    "click #search-btn": "searchByText",
    "click #price-search-btn": "searchByPrice"
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    var addedfilters = App.helpers.getFilters();
    $.get("/src/templates/sidebar.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
      if (addedfilters.search) {
        self.$el.find("#srch-by-keyword").val(addedfilters.search);
      }
      if (addedfilters.price_max) {
        self.$el.find("#price-end").val(addedfilters.price_max);
      }
      if (addedfilters.price_min) {
        self.$el.find("#price-start").val(addedfilters.price_min);
      }
    });
    return self;
  },
  resetFilters: function() {
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
  },

  searchByText: function() {
    var searchByTextVal = this.$el.find("#srch-by-keyword").val();
    if (searchByTextVal === "") {
      return;
    } else {
      App.helpers.setFilters({
        search: searchByTextVal
      });
      App.eventBus.trigger("GET_PRODUCTS", {
        search: searchByTextVal
      });
    }
  },
  searchByPrice: function() {
    var minPrice = this.$el.find("#price-start").val();
    var maxPrice = this.$el.find("#price-end").val();
    App.helpers.setFilters({
      price_min: minPrice,
      price_max: maxPrice
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      price_min: minPrice,
      price_max: maxPrice
    });
  }
});
