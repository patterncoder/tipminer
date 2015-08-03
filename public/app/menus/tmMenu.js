(function(angular){
	
	angular.module('app').factory('tmMenu', ['$resource', Factory]);
	
	function Factory ($resource) {
		var MenuResource = $resource('/api/menus/:_id',
			{_id: '@id'},
            {update: {method: 'PUT', isArray: false}}
			);
		return MenuResource;
	}

	
}(this.angular));