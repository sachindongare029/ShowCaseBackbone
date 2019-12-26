var App = App || {};

App.views.SideBarView = Backbone.View.extend({
  el: '#sidebar',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/src/templates/sidebar.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
    });
    return self;
  }
});
