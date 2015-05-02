angular.module('kamikikaiApp', ['duScroll'])
  .controller('MainCtrl', function ($scope, $timeout, $http) {
    var diff = Date.now() - ps;
    $timeout(function () {
      $scope.loaded = true;
    }, 500 - diff > 0 ? 500 - diff : 0);

    $scope.members = [];
    $http.get('/api/members').success(function (members) {
      $scope.members = members;
    });
  });
