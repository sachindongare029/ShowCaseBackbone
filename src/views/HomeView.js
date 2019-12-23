var App = App || {};

App.views.HomeView = Backbone.View.extend({
  el: '#root',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/src/templates/home.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
    });
    return self;
  }
});
