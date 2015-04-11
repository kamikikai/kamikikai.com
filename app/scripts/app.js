angular.module('kamikikaiApp', [])
  .controller('MainCtrl', function ($scope, $timeout) {
    var diff = Date.now() - ps;
    if (diff < 500) {
      $timeout(function () {
        $scope.loaded = true;
      }, 500 - diff)
    } else {
      $scope.loaded = true
    }
  });
