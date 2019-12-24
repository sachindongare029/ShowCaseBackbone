var App = App || {};

App.models.DesignersDataModel = Backbone.Model.extend({
  url: "https://opt-showcase-api-stage.optcentral.com/brands/:_id",
  defaults: {
    _id: "",
    name: ""
  }
});

