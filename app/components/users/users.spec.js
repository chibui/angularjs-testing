describe('UsersController', function () {

    var $controller, UsersController, UsersFactory;

    // Mock user list we expect to use in ctrl
    var userList = [
        { id: '1', name: 'Jane', role: 'Designer', location: 'New York', twitter: 'gijane' },
        { id: '2', name: 'Bob', role: 'Developer', location: 'New York', twitter: 'billybob' },
        { id: '3', name: 'Jim', role: 'Developer', location: 'Chicago', twitter: 'jimbo' },
        { id: '4', name: 'Bill', role: 'Designer', location: 'LA', twitter: 'dabill' }
    ];

    // load dependancies
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('components.users'));

    // add the module for Users service
    beforeEach(angular.mock.module('api.users'));

    // inject controller service to test
    beforeEach(inject(function (_$controller_, _Users_) {

        $controller = _$controller_;
        UsersFactory = _Users_;

        // spy and force the return value when UsersFactory.all() is called
        spyOn(UsersFactory, 'all').and.callFake(function () {
            return userList;
        });

        // add the factory as a dependency
        UsersController = $controller('UsersController', { Users: UsersFactory });

    }));

    it('should be defined', function () {
        expect(UsersController).toBeDefined();
    });

    // new test for expected ctrl behaviour
    it('should initialize with a call to Users.all()', function () {
        expect(UsersFactory.all).toHaveBeenCalled();
        expect(UsersController.users).toEqual(userList);
    });
});