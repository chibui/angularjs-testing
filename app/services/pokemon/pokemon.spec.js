describe('Pokemon factory', function () {
    var Pokemon, $q, $httpBackend;

    // add pokeapi endpoint
    var API = 'http://pokeapi.co/api/v2/pokemon/';

    // mock api SUCCESS response
    var RESPONSE_SUCCESS = {
        'id': 25,
        'name': 'pikachu',
        'sprites': {
            'front_default': 'http://pokeapi.co/mdeia/sprites/pokemon/25.png'
        },
        'types': [{
          'type': { 'name': 'electric' }
        }]
    };

    // mock ERROR response
    var RESPONSE_ERROR = {
        'detail': 'Not found.'
    };

    // load pokemon api module
    beforeEach(angular.mock.module('api.pokemon'));

    // inject pokemon service
    beforeEach(inject(function (_Pokemon_, _$q_, _$httpBackend_) {
        Pokemon = _Pokemon_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    it('should exist', function () {
        expect(Pokemon).toBeDefined();
    });

    describe('findByName()', function () {
        var result;

        beforeEach(function () {
            // initialize local result objective before tests
            result = {};

            //spy on service call and allow to continue to implementation
            spyOn(Pokemon, "findByName").and.callThrough();
        });

        it('should return a Pokemon when call with valid name', function () {
            var search = 'pikachu';

            // declare expected endpoint and provide mocked return values
            $httpBackend.whenGET(API + search).respond(200, $q.when(RESPONSE_SUCCESS));

            expect(Pokemon.findByName).not.toHaveBeenCalled();
            expect(result).toEqual({});

            Pokemon
                .findByName(search)
                .then(function (resp) {
                    result = resp;
                });

            // flush pending HTTP requests
            $httpBackend.flush();

            expect(Pokemon.findByName).toHaveBeenCalledWith(search);
            expect(result.id).toEqual(25);
            expect(result.name).toEqual('pikachu');
            expect(result.sprites.front_default).toContain('.png');
            expect(result.types[0].type.name).toEqual('electric');
        });

        it('should return 404 when called with invalid name', function () {
            var search = 'godzilla';

            // mock status code and response object
            $httpBackend.whenGET(API + search).respond(404, $q.reject(RESPONSE_ERROR));

            expect(Pokemon.findByName).not.toHaveBeenCalled();
            expect(result).toEqual({});

            // update chained method to catch error
            Pokemon
                .findByName(search)
                .catch(function (reason) {
                   result = reason;
                });

            $httpBackend.flush();

            expect(Pokemon.findByName).toHaveBeenCalledWith(search);
            expect(result.detail).toEqual('Not found.');
        });
    });
});