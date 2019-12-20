// Global configurations
Handlebars.logger.level = 0;

var App = {
  models: {},
  collections: {},
  views: {},
  helpers: {},
  eventBus: _.extend({}, Backbone.Events)
};
