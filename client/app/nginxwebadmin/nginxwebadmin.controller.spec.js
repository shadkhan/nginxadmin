'use strict';

describe('Controller: NginxwebadminCtrl', function () {

  // load the controller's module
  beforeEach(module('admintoolApp'));

  var NginxwebadminCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NginxwebadminCtrl = $controller('NginxwebadminCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
