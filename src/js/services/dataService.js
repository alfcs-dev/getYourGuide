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
            var  def, url, data;
            url = "https://www.getyourguide.com/touring.json?key=2Gr0p7z96D"
            def = $q.defer();
            $http.get(url).success(function(data) {
                    def.resolve(data);
                })
                .error(function(error) {
                    def.reject(error);
                });
            return def.promise;
        }
    }
})();