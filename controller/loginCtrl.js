angular.module('fundooHrApp').controller('loginController', function($scope, $state, $auth) {
  $scope.emailformat =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   $scope.pwformat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var config = {
        method: 'POST',
        url: 'http://192.168.0.16:3000/login'
    };
    $scope.login = function() {
      $scope.loginloading=true;
        $auth.login($scope.user, config)
            .then(function(data) {
                console.log("You have successfully signed in!");
                $state.go('home.dashboard'); //after login page navbar page is redirected...
                // $location.path('/');
            })
            .catch(function(error) {
                $scope.loginloading=false;
                console.log(error.data.message, error.status);
                $scope.error = "Incorrect email/password !";
                // toastr.error(error.data.message, error.status);
            });
    };
    $scope.authenticate = function(provider){
        $auth.authenticate(provider)
            .then(function() {
                console.log("You have successfully signed in!" + provider + "!");
                $state.go('home.dashboard'); //after login page,authentication, navbar page is redirected...
            })
            .catch(function(error) {
                if (error.message) {
                    // Satellizer promise reject error.
                    console.log(error.message);
                } else if (error.data) {
                    // HTTP response error from server
                    console.log(error.data.message, error.status);
                } else {
                    console.log(error);
                }
            });
    };

});
