var App = App || {};

var base_url = 'https://opt-showcase-api.optcentral.com/products';
App.collections.ProductCollection = Backbone.Collection.extend({
  url: function() {
    return base_url;
  },
  model: App.models.ProductModel,
  parse: function(response) {
    this.totalCount = response.totalCount;
    return response.data;
  }
});
