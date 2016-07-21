(function() {
    'use strict';

    angular
        .module('app')
        .directive('placeInfo', userPlace);

    userPlace.$inject = [];

    /* @ngInject */
    function userPlace() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: PlaceCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: {
            	image: '=',
            	activityName: '=',
                isLoading :'='
            },
            templateUrl: 'dist/templates/place.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function PlaceCtrl() {
    	var vm = this;
    	

    }
})();