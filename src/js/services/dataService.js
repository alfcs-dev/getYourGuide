(function() {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q'];

    /* @ngInject */
    function dataService($http, $q) {
        var service = {
            getInfo: getInfo
        };
        return service;

        ////////////////

        function getInfo() {
            var  def, url, data; //Defining needed variables
            url = "https://www.getyourguide.com/touring.json?key=2Gr0p7z96D"; // Url of our service
            def = $q.defer(); //Create a defered promise using the q server
            $http.get(url).success(function(data) { // if the call is succesful return the resolve function
                    def.resolve(data);
                })
                .error(function(error) { //if the call is returned with the error we sent it to the controller
                    def.reject(error);
                });
            return def.promise;
        }
    }
})();