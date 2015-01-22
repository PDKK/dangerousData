'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Dakota','North Carolina','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
        $scope.selectedSystem= '';
        $scope.getSystem = function(viewValue) {
            console.log(viewValue);

            $http.get('api/starSystemsByName/' + viewValue).then (function(res){
                if (res) {
                    var names = res.data.map(function (obj) {
                        return obj.name;
                    });
                    console.log(names);
                    return names;
                }
            });
        };
	}
]);
