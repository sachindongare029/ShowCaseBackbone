var App = App || {};

App.models.ProductModel = Backbone.Model.extend({
  url: function() {
    return (
      'https://opt-showcase-api.optcentral.com/products/'
    );
  },
  defaults: {
    _id: null,
    title: '',
    sku: null,
    status: 'Active',
    pricing: null,
    images: []
  }
});
