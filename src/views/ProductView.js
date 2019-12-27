var App = App || {};

App.views.ProductView = Backbone.View.extend({
  el: '#catalog__product-container',

  events: {
    'mouseenter .product': 'mouseentercard'
  },

  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, "render", "selectView");
    App.eventBus.on(
      "GRID_UPDATE",
      function(eventData) {
        this.selectView(eventData);
      }.bind(this)
    );

    App.eventBus.trigger("GRID_UPDATE");
    this.render();
  },

  selectView: function(eventData) {
    $(".product-header").css("display", "none");
    if($('#catalog__top-action-bar').find(".fa").hasClass("active")) {
      $('#catalog__top-action-bar').find(".fa").removeClass("active")
    }
    if (this.$el.find(".product").hasClass("list-view-hide")) {
      this.$el.find(".product").removeClass("list-view-hide");
      this.$el.find(".product-list-view").removeClass("list-view-display");
    }

    if (this.$el.find(".product").hasClass("col-md-4")) {
      this.$el.find(".product").removeClass("col-md-4");
    } else if (this.$el.find(".product").hasClass("col-md-6")) {
      this.$el.find(".product").removeClass("col-md-6");
    } else if (this.$el.find(".product").hasClass("col-md-12")) {
      this.$el.find(".product").removeClass("col-md-12");
    }

    if (eventData) {
      this.$el.find(".product").addClass(eventData.viewSelected);
    }
    if (eventData && eventData.viewSelected === "col-md-12") {
      this.$el.find(".product").addClass("list-view-hide");
      this.$el.find(".product-list-view").addClass("list-view-display");
      $(".product-header").css('display', 'block');
    }
    var appliedFilters = App.helpers.getFilters();
    $('#catalog__top-action-bar').find("#" + appliedFilters.view).addClass('active');
  },

  render: function() {
    var self = this;
    var appliedFilters = App.helpers.getFilters();
    $.get('/src/templates/productcontainer.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: self.options.products
      });
      self.$el.html(finalHtml);
      App.eventBus.trigger("GRID_UPDATE", {
        viewSelected: appliedFilters.view
      });
    });
    return self;
  },

  mouseentercard: function(e) {
    e.preventDefault();
    var actionNode = e.target.querySelector('.product-action-links');
    $(actionNode).addClass('product-hovered');
    $(e.target).hover(
      function() {
        $(actionNode).addClass('product-hovered');
      },
      function() {
        $(actionNode).removeClass('product-hovered');
      }
    );
  }
});
