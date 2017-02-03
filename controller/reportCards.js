angular.module('fundooHrApp').controller('reportCtrl', function ($scope, $location, $stateParams, $state, $auth) {
  $state.go('home.report');
});
