var App = App || {};

App.collections.DesignersDataCollection = Backbone.Collection.extend({
  url:
    "https://opt-showcase-api-stage.optcentral.com/brands?brand_ids=3%2C2%2C46%2C463%2C581%2C50%2C1119%2C145%2C1801%2C2086&retailerId=143&showcase=OOO&status=Active",
  model: App.models.DesignersDataModel
});