var App = App || {};

var TemplateManager = (function() {
  var cache, defaults, fetchAndCache;

  defaults = {
    path: '/src/templates',
    ext: '.hbs'
  };

  cache = {};

  function TemplateManager(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, defaults);
    if (this.options.cache) {
      cache = this.options.cache;
    }
  }

  TemplateManager.prototype.load = function(tpl, callback) {
    if (_.has(cache, tpl)) {
      return callback(cache[tpl]);
    }
    tpl = fetchAndCache.apply(this, [tpl, callback]);
    if (!callback) {
      return tpl;
    }
    return tpl.done(function(tplString) {
      if (callback) {
        return callback(tplString);
      }
    });
  };

  fetchAndCache = function(tpl, callback) {
    var deferred,
      tplPath,
      _this = this;
    deferred = new $.Deferred();
    tplPath = '' + this.options.path + tpl + this.options.ext;
    $.ajax({
      url: tplPath,
      type: 'GET',
      dataType: 'text',
      cache: true,
      success: function(tplString) {
        cache[tpl] = Handlebars.compile(tplString);
        cache[tpl].tplString = tplString;
        return deferred.resolve(cache[tpl]);
      }
    });
    return deferred;
  };

  return TemplateManager;
})();

// Intitalize template manager
App.templateManager = new TemplateManager();
