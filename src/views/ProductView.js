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
  },

  render: function() {
    var self = this;
    $.get('/src/templates/productcontainer.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: self.options.products
      });
      self.$el.html(finalHtml);
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
