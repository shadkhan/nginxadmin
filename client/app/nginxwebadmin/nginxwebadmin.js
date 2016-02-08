'use strict';

angular.module('admintoolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('nginxwebadmin', {
        url: '/nginxwebadmin',
        templateUrl: 'app/nginxwebadmin/nginxwebadmin.html',
        controller: 'NginxwebadminCtrl'
      });
  });