var App = App || {};

App.views.DesignerViewContainer = Backbone.View.extend({
  el: '#root',

  events: {
    "click a[href='#']": "onOptionClick"
  },

  initialize: function() {
    _.bindAll(this, 'render');
    var self = this;
    this.collection = new App.collections.DesignersDataCollection();
    this.collection.fetch().done(function() {
      self.render();
    });
    this.listenTo(this.collection, 'sync', self.render);
  },

  render: function() {
    var self = this;
    $.get('/src/templates/designers.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      self.$el.html(
        template({
          designers: self.collection.toJSON()
        })
      );
    });
    return this;
  },

  onOptionClick: function(e) {
    e.preventDefault();
    var node = $('.designers-sort').find("h2:contains('" + e.target.text + "')");
    $('html, body').animate({ scrollTop: node.position().top + 200 }, 'slow');
  }
});
