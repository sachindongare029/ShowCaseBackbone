var App = App || {};

App.views.SideBarView = Backbone.View.extend({
  el: "#sidebar",

  events: {
    "click #reset-filter-btn": "resetFilters",
    "click #search-btn": "searchByText",
    "click #price-search-btn": "searchByPrice",
    "click #shop-all": "shopAll",
    "click .accordion-toggle": "accordionIcon",
    "click #brands": "accrodianBrandsFilter",
    "click #categories": "accrodianCategoriesFilter",
    "click #color": "accrodianColorFilter",
    "click #stone": "accrodianStoneFilter",
    "click #metal": "accrodianMetalFilter"
  },

  initialize: function() {
    _.bindAll(this, "render");
    var self = this;
    $.ajax({
      type: "GET",
      url:
        "https://opt-showcase-api-stage.optcentral.com/products?brand_ids=3,2,46,463,581,50,1119,145,1801,2086&limit=60&retailerId=143&showcase=OOO&sort=pricing.retail;desc&status=Active",
      dataType: "json",
      success: function(response) {
        var that = self;
        that.render(response.data);
      }
    });
  },

  render: function(options) {
    var self = this;
    var brands = [];
    var categories = [];
    var colorArr = [];
    var stoneArr = [];
    var metalArr = [];
    options.map(option => {
      if (brands.includes(option.brand.name) === false) {
        brands.push(option.brand.name);
      }
      option.categories.map(category => {
        if (categories.includes(category.name) === false) {
          categories.push(category.name);
        }
      });
      if (option.attributes.Metal) {
        option.attributes.Metal.map(metal => {
          if (metalArr.includes(metal) === false) {
            metalArr.push(metal);
          }
        });
      }
      if (option.attributes["Gemstone Color"]) {
        option.attributes["Gemstone Color"].map(color => {
          if (colorArr.includes(color) === false) {
            colorArr.push(color);
          }
        });
      }
      if (option.attributes["Gemstone Type"]) {
        option.attributes["Gemstone Type"].map(stone => {
          if (stoneArr.includes(stone) === false) {
            stoneArr.push(stone);
          }
        });
      }
    });
    var addedfilters = App.helpers.getFilters();
    $.get("/src/templates/sidebar.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        brands: brands.sort(),
        categories: categories.sort(),
        metal: metalArr.sort(),
        color: colorArr.sort(),
        stone: stoneArr.sort()
      });
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
  },
  shopAll: function() {
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

  accordionIcon: function(e) {
    var havingClass = this.$el
      .find(e.target)
      .find(".fa")
      .hasClass("fa-plus");
    if (havingClass) {
      this.$el
        .find(e.target)
        .find(".fa")
        .removeClass("fa-plus")
        .addClass("fa-minus");
    } else {
      this.$el
        .find(e.target)
        .find(".fa")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    }
  },

  accrodianBrandsFilter: function(e) {
    var brand = e.target.text;
    App.helpers.setFilters({
      brands: brand
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      brands: brand
    });
  },

  accrodianCategoriesFilter: function(e) {
    var category = e.target.text;
    App.helpers.setFilters({
      categories: category
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      categories: category
    });
  },

  accrodianColorFilter: function(e) {
    var color = e.target.text;
    App.helpers.setFilters({
      "attributes.Gemstone Color": color
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      "attributes.Gemstone Color": color
    });
  },

  accrodianStoneFilter: function(e) {
    var stone = e.target.text;
    App.helpers.setFilters({
      "attributes.Gemstone Type": stone
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      "attributes.Gemstone Type": stone
    });
  },

  accrodianMetalFilter: function(e) {
    var metal = e.target.text;
    App.helpers.setFilters({
      "attributes.Metal": metal
    });
    App.eventBus.trigger("GET_PRODUCTS", {
      "attributes.Metal": metal
    });
  }
});
