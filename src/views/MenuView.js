var App = App || {};

App.views.MenuView = Backbone.View.extend({
  el: "#menu",

  events: {
    "click a": "onClick"
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/src/templates/menu.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
    });
  	return self;
  },
  onClick: function( e ) {
    // Uses the navigate() method save the application as URL
    // App.router.navigate('/');
  }
});
