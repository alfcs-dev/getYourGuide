(function() {
    'use strict';

    angular
        .module('app')
        .directive('loadedImage', loadedImage);

    loadedImage.$inject = [];

    /* @ngInject */
    function loadedImage() {
        // Usage:
        //
        // Creates:
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
        	element.bind('load', function () {
                vm.isLoading = false;
                console.log('img is loaded');
            });
        }
    }

    /* @ngInject */
    function LoadedImage() {
    	var vm = this;
    }
})();