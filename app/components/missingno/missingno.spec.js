describe('components.missingno', function () {
    var $controller,
        MissingnoController;

    // load dependencies
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('components.missingno'));

    // inject the $controller service to create instances of the controller we want to test
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        MissingnoController = _$controller_('MissingnoController', {});
    }));

    // verify controller exists
    it('MissingnoController should be defined', function () {
        expect(MissingnoController).toBeDefined();
    });
});