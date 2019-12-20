var App = App || {};

App.Router = Backbone.Router.extend({
  routes: {
    "": "homeView"
    // "*designers": "homeView"
  },

  initialize: function(options) {},

  homeView: function() {
    new App.views.HomeView();
  }
});
