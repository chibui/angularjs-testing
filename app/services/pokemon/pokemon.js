(function () {
    'use strict';

    angular
        .module('api.pokemon', [])
        .factory('Pokemon', function ($http, $q) {
            var API = 'https://pokeapi.co/api/v2/pokemon/',
                Pokemon = {};

            // spy on this method, chaining with callThrough() allows it to continue to $http.get()
            Pokemon.findByName = function (name) {
                return $http.get(API + name)
                    .then(function (value) {
                       return value.data;
                    })
                    .catch(function (reason) {
                        return reason.data;
                    });
            };

            return Pokemon;
        })
})();