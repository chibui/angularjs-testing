(function () {
    'use strict';

    angular
        .module('meetIrl', [
            'ui.router',
            'api.pokemon',
            'api.users',
            'components.missingno',
            'components.profile',
            'components.users'
        ])
        .config(function ($urlRouterProvider) {
           $urlRouterProvider.otherwise("/users");
        });
})();