var App = App || {};

App.Router = Backbone.Router.extend({
  routes: {
    '': 'homeView',
    designers: 'designerView',
    catalog: 'catalogView'
  },

  initialize: function(options) {
    new App.views.MenuView();
  },

  homeView: function() {
    new App.views.HomeView();
  },

  designerView: function() {
    new App.views.DesignerViewContainer();
  },

  catalogView: function() {
  }
});
