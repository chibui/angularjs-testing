(function () {
    'use strict';

    angular
        .module('meetUrl', [
            'ui.router'
        ])
        .config(function ($urlRouterProvider) {
           $urlRouterProvider.otherwise("/");
        });
})();