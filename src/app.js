(function() {
  $(document).ready(function() {
    //Store router instance
    App.router = new App.Router();
    if (!Backbone.History.started) {
      Backbone.history.start({
        pushState: false
      });
    }
  });
})(jQuery); // IIFE
