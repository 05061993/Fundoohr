/**
* Attendance controller*/

angular.module('fundooHrApp').controller("AttCtrl", function($scope, $http,restService) {



//REST call by using restservice
var token=localStorage.getItem("satellizer_token");
var query={
  token:token
};
console.log(token);
/**
*  calling restService function to get data from backend.
**/
restService.getRequest('readInternEmployee',query)
.then(function(data){
  // console.log(data.data.allEmployee);
  $scope.attendanceReport = data.data.allEmployee;
  // console.log("before");
  // console.log($scope.attendanceReport);

/**
* iterating backend json array to push extra item
**/
   angular.forEach($scope.attendanceReport,function(key,value){
        // console.log(key);
        angular.forEach(key,function(item){
        console.log(item);
        for(var i=0;i<item.length; i++)
        {
          item[i].selected="false";

        }
        // console.log(item[i].selected);

             });
}); //end of for each
})

/**
* method to check  group of particular comapny employees when a company name is selected
**/
$scope.toggleAll = function(index){
    console.log("company index"+index);
    console.log("single checkboxe");
      var toggleStatus = $scope.attendanceReport[index].selected;
      console.log(toggleStatus);
          console.log($scope.attendanceReport[index].employeeList);
         angular.forEach($scope.attendanceReport[index].employeeList, function(itm){
        itm.selected = toggleStatus;
});
  }

  $scope.checkAll=function()
  {
    console.log($scope.attendanceReport);
  }



});
