
angular.module('admintoolApp')
  .controller('NginxwebadminCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.errorMessage = '';
    $scope.error = false;
    

    $http.get('/api/nginxwebadmin').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('nginxwebadmin', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/nginxwebadmin', { name: $scope.newThing })
         .success(function (data, status) {
        if(status === 500 && data.status){
                $scope.errorMessage = 'Your IP is not valid IP4' + data.status;
                $scope.error = true;
              } else {
                 $scope.error = false;
              }
      })
    // handle error
       .error(function (data) {
          $scope.error = true;
           $scope.errorMessage = 'Your IP is not valid IP4  : ' + data;
            $scope.newThing = data;
         // deferred.reject();
          });
        $scope.newThing = '';
        return;
        
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/nginxwebadmin/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('nginxwebadmin');
    });
  });
