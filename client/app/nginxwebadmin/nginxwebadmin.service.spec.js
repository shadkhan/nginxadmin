'use strict';

describe('Service: nginxwebadmin', function () {

  // load the service's module
  beforeEach(module('admintoolApp'));

  // instantiate service
  var nginxwebadmin;
  beforeEach(inject(function (_nginxwebadmin_) {
    nginxwebadmin = _nginxwebadmin_;
  }));

  it('should do something', function () {
    expect(!!nginxwebadmin).toBe(true);
  });

});
