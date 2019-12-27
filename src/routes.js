var App = App || {};

App.Router = Backbone.Router.extend({
  routes: {
    '': 'homeView',
    designers: 'designerView',
    catalog: 'catalogView',
    'catalog/b/:bid': 'catalogView'
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

  catalogView: function(bid) {
    if (bid) {
      new App.views.CatalogView({
        brandName: bid
      });
    } else {
      new App.views.CatalogView({
        brandName: ""
      });
    }
  }
});
