'use strict';

angular.module('admintoolApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/nginxwebadmin/nginxwebadmin.html',
        controller: 'NginxwebadminCtrl'
      });
  });