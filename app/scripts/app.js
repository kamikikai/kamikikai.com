angular.module('kamikikaiApp', ['duScroll'])
  .controller('MainCtrl', function ($scope, $timeout, $element) {
    var diff = Date.now() - ps;
    $timeout(function () {
      $scope.loaded = true;
    }, 500 - diff > 0 ? 500 - diff : 0);
  });
