(function() {
    'use strict';

    angular
        .module('app')
        .directive('loadedImage', loadedImage);

    loadedImage.$inject = [];

    /* @ngInject */
    function loadedImage() {
        // Usage: Check wheater or not the images has been completely loaded to the DOM
        //
        // Creates: Nothing, only checks load of functions
        //
        var directive = {
            bindToController: true,
            controller: LoadedImage,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            	isLoading : '='
            }
        };
        return directive;

        function link(scope, element, attrs, vm) {
        	element.bind('load', function () { //Once the element has been rendered we check for the load event of the image
                vm.isLoading = false; //If the element has been completely rendered we change the global loading variable to notify the controller
            });
        }
    }

    /* @ngInject */
    function LoadedImage() {
        //Binding the scope to vm
    	var vm = this;
    }
})();