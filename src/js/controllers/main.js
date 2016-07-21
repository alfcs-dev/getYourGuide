(function() {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['dataService', '$interval', '$scope', '$timeout'];

    /* @ngInject */
    function mainCtrl(dataService, $interval, $scope, $timeout) {
        var vm = this;
        vm.title = 'Get Your Guide Applications'; //Defining a title in case it is needed to change it 
        vm.userInfo = {}; //Defining an empty array that later will contain the collected user info
        vm.counter = 0; //Basic counter initialitation for our top progress bar
        vm.loading = true; //Defining a boolean variable to manage the load of the screen while changing users

        vm.mapMarker= 'dist/img/tag.png'; // For our google maps, defining the image for the marker
        activate(); // First call to initialize our controller

        $interval(activate, 30000); //Defining an interval to change the user info
        $interval(function(){ // Creation of another interval to update the top progress bar
            vm.counter += 1;
        }, 300);
        
        ////////////////

        /* Created a watcher for the loading phase of the application to load our map and 
            hide de circular loader, we show while we get the data from server    */
        $scope.$watch('vm.loading', function(newValue, oldValue){ 
            //If the value of  vm.loading === false it means that the data from the server was reached correctly and the image has been loaded
            if(!newValue){ 
                //For the maps to load correctly we have to wait a litte fraction of time, so the DOM element exists and it can be rendered
                $timeout(initMap, 500); 
            }
        });

        /* Main function of our controller */
        function activate() {
            vm.loading = true; //Every time the controller gets invoked we change the status to loading
            vm.counter = 0; // And restart our counter
            var resp = dataService.getInfo(); // Save the promise returned from our service to a variable
            resp
                .then(function(data) {
                    vm.userInfo = data; //Asign the data to our current scope
                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        /* Basic Functionallity of Maps */
        function initMap() {    
            //Every time initMap gets called we change the values of lat anf lng
            var latLang = {
                lat: vm.userInfo.activityCoordinateLatitude,
                lng: vm.userInfo.activityCoordinateLongitude
            }

            //Create a new map object
            var map = new google.maps.Map(document.getElementById('map'), {
                center: latLang,
                zoom: 13
            });

            //With the correct marker
            var marker = new google.maps.Marker({
                position: latLang,
                title: vm.userInfo.customerFirstName + "It\'s right here!",
                icon: vm.mapMarker
            });
            //And then set it
            marker.setMap(map);

        }
    }
})();