var App = App || {};

App.views.CatalogView = Backbone.View.extend({
  el: "#root",

  events: {},

  initialize: function(options) {
    this.options = options;
    _.bindAll(this, "render", "doFetch", "detectScroll");
    $(window).scroll(this.detectScroll);
    this.collection = new App.collections.ProductCollection();
    App.helpers.setFilters({
      page: 1,
      limit: 24,
      sort: "pricing.retail;desc",
      view: "col-md-4",
      brands: this.options.brandName
    });
    App.eventBus.on(
      "GET_PRODUCTS",
      function(eventData) {
        this.doFetch();
      }.bind(this)
    );

    App.eventBus.trigger("GET_PRODUCTS");
  },

  doFetch: function() {
    var self = this;
    var filters = App.helpers.getFilters();
    this.collection.fetch({ data: filters }).done(function() {
      self.render();
    });
  },

  render: function() {
    var self = this;
    $.get("/src/templates/catalog.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
      self.renderSidebarView();
      self.renderProductContainerView();
    });

    return self;
  },

  renderSidebarView: function() {
    new App.views.SideBarView();
  },

  renderProductContainerView: function() {
    var appliedFilters = App.helpers.getFilters();
    new App.views.TopActionBarView({
      totalCount: this.collection.totalCount
    });
    if (appliedFilters.search || appliedFilters.brands) {
      new App.views.SearchCriteriaView({
        criteria: [appliedFilters.search, appliedFilters.brands]
      });
    }
    new App.views.ProductView({
      products: this.collection.toJSON()
    });
    new App.views.PaginationView({
      totalCount: this.collection.totalCount
    });
  },

  detectScroll: function() {
    if ($(window).scrollTop() > 96) {
      this.$el.find(".sidebar").css('overflow-y', 'scroll');
      // console.log("scroll detected", this.$el.find(".sidebar"));
    } else {
      this.$el.find(".sidebar").scrollTop(0);
      this.$el.find(".sidebar").css("overflow-y", "hidden");
    }
  }
});
