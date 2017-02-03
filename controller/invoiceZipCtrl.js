angular.module('fundooHrApp').controller("invoceCtrl", function($scope, $http) {
    // var AttReport={};
    $http.get('json/invoceZip.json').then(function(data, headers, config, status) {
        $scope.Invoicedata = data.data;
      

    })
    $scope.download = function(){
      console.log("in method...");
      $scope.showImage = true;
      // $scope.file=fn;

    }
});
