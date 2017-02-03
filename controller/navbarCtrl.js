angular.module('fundooHrApp').controller('homeController', function ($scope, $location, $stateParams, $state, $auth) {
  $scope.isAuth = function () {
    // console.log("autentication")
    return $auth.isAuthenticated();
  };
  $scope.today = new Date();
  $scope.name = "Swati";
  $scope.email="swatidindurle@gmail.com";
//rendering dashboard page with navbar page...
});
