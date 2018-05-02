describe('components.profile', function () {
    var $controller,
        PokemonFactory,
        $q,
        $httpBackend,
        API = 'http://pokeapi.co/api/v2/pokemon/';

    // mock success api response
    var RESPONSE_SUCCESS = {
            'id': 58,
            'name': 'growlithe',
            'sprites': {
                'front_default': 'http://pokeapi.co/media/sprites/pokemon/58.png'
            },
            'types': [{
                'type': { 'name': 'fire' }
            }]
        };

    // mock error api response
    var RESPONSE_ERROR = {
        'detail': 'Not found.'
    };

    // load ui router and modules needed
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('api.pokemon'));
    beforeEach(angular.mock.module('components.profile'));

    // inject controller
    beforeEach(inject(function (_$controller_, _Pokemon_, _$q_, _$httpBackend_) {
        $controller = _$controller_;
        PokemonFactory = _Pokemon_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    describe('ProfileController', function () {
        var ProfileController,
            singleUser;

        beforeEach(function () {

            // define singleUser and add resolved user as controller dependency
            singleUser = {
                id: 2,
                name: 'Bob',
                role: 'Developer',
                location: 'New York',
                twitter: 'billybob',
                pokemon: { name: 'growlithe'}
            };

            // create instance of controller and add dependencies
            ProfileController = $controller('ProfileController', { resolvedUser: singleUser, Pokemon: PokemonFactory });
        });

        // verify controller exists
        it('should be defined', function () {
            expect(ProfileController).toBeDefined();
        });
    });

    describe('Profile Controller with a valid resolved user and a valid pokemon', function () {
        var ProfileController,
               singleUser;

        beforeEach(function () {
            // mock valid user
            singleUser = {
                id: 2,
                name: 'Bob',
                role: 'Developer',
                location: 'New York',
                twitter: 'billybob',
                pokemon: { name: 'growlithe'}
            };

            // add spy to service call
            spyOn(PokemonFactory, "findByName").and.callThrough();

            // add valid user as resolved dependency
            ProfileController = $controller('ProfileController', { resolvedUser: singleUser, Pokemon: PokemonFactory });
        });

        it('should set the view model user object to the resolvedUser', function () {
            expect(ProfileController.user).toEqual(singleUser);
        });

        it('should call Pokemon.findByName and return a Pokemon object', function () {
            // add expectations before request is finished
            expect(ProfileController.user.pokemon.id).toBeUndefined();
            expect(ProfileController.user.pokemon.name).toEqual('growlithe');
            expect(ProfileController.user.pokemon.image).toBeUndefined();
            expect(ProfileController.user.type).toBeUndefined();

            // add http request expectation and resolved response value
            $httpBackend.whenGET(API + singleUser.pokemon.name).respond(200, $q.when(RESPONSE_SUCCESS));
            $httpBackend.flush();

            // add expectations aftert the request is finished
            expect(PokemonFactory.findByName).toHaveBeenCalledWith('growlithe');
            expect(ProfileController.user.pokemon.id).toEqual(58);
            expect(ProfileController.user.pokemon.name).toEqual('growlithe');
            expect(ProfileController.user.pokemon.image).toContain('.png');
            expect(ProfileController.user.pokemon.type).toEqual('fire');

        });
    });

    // add test for pokemon not found
    describe('Profile Controller with a valid resolved user and a invalid pokemon', function () {
        var singleUser,
            ProfileController;

        beforeEach(function () {
            // Update pokemon name
            singleUser = {
                id: 2,
                name: 'Bob',
                role: 'Developer',
                location: 'New York',
                twitter: 'billybob',
                pokemon: { name: 'godzilla'}
            };

            spyOn(PokemonFactory, 'findByName').and.callThrough();

            ProfileController = $controller('ProfileController', { resolvedUser: singleUser, Pokemon: PokemonFactory });
        });

        it('should call Pokemon.findByName and default to a placeholder image', function () {
            expect(ProfileController.user.pokemon.image).toBeUndefined();

            // declare the endpoint we expect our srvice to hit and provide it with our mocked return values
            $httpBackend.whenGET(API + singleUser.pokemon.name).respond(404, $q.reject(RESPONSE_ERROR));
            $httpBackend.flush();

            // add expectation that our image will be set to a placeholder image
            expect(PokemonFactory.findByName).toHaveBeenCalledWith('godzilla');
            expect(ProfileController.user.pokemon.image).toEqual('http://i.imgur.com/HddtBOT.png');
        });
    });
});