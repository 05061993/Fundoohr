angular.module('fundooHrApp')
  .controller('logoutController', function($location, $auth,$state,toastr) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        console.log("logout")
        toastr.info('You have been logged out');
        $state.go('login'); //after logout option is clicked login page is redirected..
      }).catch(function (error) {
        console.log(error.data.message, error.status);
        // toastr.error(error.data.message, error.status);
      });
  });
