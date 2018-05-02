(function () {
    'use strict';

    // define component and controller we load in test
    angular
        .module('components.profile', [])
        .controller('ProfileController', function (resolvedUser, Pokemon) {
            var vm = this;

            vm.user = resolvedUser;

            // call pokemon service using resovled users pokemon
            Pokemon.findByName(vm.user.pokemon.name)
                .then(function (pokemon) {
                    vm.user.pokemon.id = pokemon.id;
                    vm.user.pokemon.image = pokemon.sprites.front_default;
                    vm.user.pokemon.type = pokemon.types[0].type.name;
                })
                .catch(function (error) {
                    // catch error and set pokemon image to default
                    vm.user.pokemon.image = 'http://i.imgur.com/HddtBOT.png';
                });
        })
        .config(function ($stateProvider) {
            $stateProvider
                .state('profile', {
                    url: '/user/:id',
                    templateUrl: 'components/profile/profile.html',
                    controller: 'ProfileController as pc',
                    resolve: {
                        // add resolvedUser with a call to Users using $stateParams.id
                        resolvedUser: function (Users, $stateParams) {
                            return Users.findById($stateParams.id);
                        }
                    }
                });
        });
})();