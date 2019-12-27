var App = App || {};

App.views.PaginationView = Backbone.View.extend({
  el: "#catalog__products-pagination",

  events: {
    "click .prev-page": "prevPage",
    "click .next-page": "nextPage"
  },

  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    var appliedFilters = App.helpers.getFilters();
    var countOfProduct = self.options.totalCount;
    var numberOfPages = countOfProduct / appliedFilters.limit;
    var itemDisplayed = appliedFilters.page * appliedFilters.limit;
    var prevPage = "<< Previous Page |&nbsp;";
    var nextPageNode = " | Next Page >>";
    if (appliedFilters.page === 1) {
      prevPage = "";
    }
    if (appliedFilters.page === parseInt(numberOfPages) + 1) {
      nextPageNode = "";
    }
    var countNode =
      "<div class='pagination'><span class='prev-page'>" +
      prevPage +
      "</span> page " +
      appliedFilters.page +
      " | " +
      itemDisplayed +
      " of " +
      countOfProduct +
      "&nbsp;<span class='next-page'>" +
      nextPageNode +
      "</span></div>";

    $.get("/src/templates/catalog.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      self.$el.html(template());
      self.$el.html(countNode);
    });
    return this;
  },

  prevPage: function() {
    var appliedFilters = App.helpers.getFilters();
    var nextPage = appliedFilters.page - 1;
    App.helpers.setFilters({
      page: nextPage,
      view: appliedFilters.view
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      page: nextPage,
      view: appliedFilters.view
    });
  },

  nextPage: function(e) {
    var appliedFilters = App.helpers.getFilters();
    var nextPage = appliedFilters.page + 1;
    App.helpers.setFilters({
      page: nextPage,
      view: appliedFilters.view
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      page: nextPage,
      view: appliedFilters.view
    });
  }
});
