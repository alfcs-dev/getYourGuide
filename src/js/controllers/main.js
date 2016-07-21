(function() {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['dataService', '$interval'];

    /* @ngInject */
    function mainCtrl(dataService, $interval) {
        var vm = this;
        vm.title = 'mainCtrl';
        vm.userInfo = {};
        vm.counter = 0;
        vm.loading = true;
        vm.mapMarker= 'dist/img/tag.png';
        activate();
        $interval(activate, 30000)
        $interval(function(){
            vm.counter += 1;
        }, 300);
        ////////////////

        function activate() {
            vm.counter = 0;
            var resp = dataService.getInfo();
            resp
                .then(function(data) {
                    vm.userInfo = data;
                    vm.loading = false;
                    initMap();
                    console.log(data);
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        function initMap() {

            var latLang = {
                lat: vm.userInfo.activityCoordinateLatitude,
                lng: vm.userInfo.activityCoordinateLongitude
            }
            var map = new google.maps.Map(document.getElementById('map'), {
                center: latLang,
                zoom: 10
            });
            var marker = new google.maps.Marker({
                position: latLang,
                title: vm.userInfo.customerFirstName + "It\'s right here!",
                icon: vm.mapMarker
            });

            marker.setMap(map);

        }
    }
})();