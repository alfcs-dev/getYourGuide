(function() {
    'use strict';

    angular
        .module('app')
        .directive('placeInfo', userPlace);

    userPlace.$inject = [];

    /* @ngInject */
    function userPlace() {
        // Usage: Displays a basic introduction text and the picture corresponding the tour 
        //        the customer is taking
        // Creates: New DOM element with a title and an image, which are styled in _place.scss
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
    function PlaceCtrl() { //Create controller incase we want to add functionallity to our directive later
    	var vm = this; 
    }
})();