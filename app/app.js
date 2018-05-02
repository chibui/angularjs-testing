(function () {
    'use strict';

    angular
        .module('meetIrl', [
            'ui.router',
            'api.users',
            'components.users',
            'components.missingno'
        ])
        .config(function ($urlRouterProvider) {
           $urlRouterProvider.otherwise("/users");
        });
})();