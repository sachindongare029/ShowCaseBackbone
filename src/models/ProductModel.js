var App = App || {};

App.models.ProductModel = Backbone.Model.extend({
  url: function() {
    return (
      'https://opt-showcase-api.optcentral.com/products/' + this.get('_id')
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
