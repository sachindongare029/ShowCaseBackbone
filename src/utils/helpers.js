var App = App || {}

App.helpers = {
	setFilters: function(newFilters) {
		var oldFilters = this.getFilters();
		var finalFilters = _.extend({}, oldFilters, newFilters);
		localStorage.setItem('filters', JSON.stringify(finalFilters));
	},
	getFilters: function() {
		var filters = localStorage.getItem('filters');
		if(!filters) {
			return {}
		};
		filters = JSON.parse(filters);
		return filters;
	}
}



