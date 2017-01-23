angular.module('fundooHrApp').controller("AttCtrl", function($scope, $http,restService) {
  // var token=localStorage.getItem('satellizer_token');
  // console.log("token for attendance report"+token);
  // $http({
  //   "method":"GET",
  //   "url":"http://192.168.0.133:3000/readInternEmployee?token="+token
  // }).then(function(data){
  //   console.log(data);
  //   $scope.attendanceReport=data.data.allEmployee;
  //   console.log("accessing attendance report");
  // });

  //basic http get call withot using rest service


//by using restservice
var token=localStorage.getItem("satellizer_token");
var query={
  token:token
};
console.log(token);
restService.getRequest('readInternEmployee',query)
.then(function(data){
  console.log(data.data.allEmployee);
  $scope.attendanceReport = data.data.allEmployee;
  console.log("before");
  console.log($scope.attendanceReport);

   angular.forEach($scope.attendanceReport,function(key,value){
          console.log(key);
             angular.forEach(key,function(item){
        console.log(item);
        for(var i=0;i<item.length; i++)
        {
          item[i].selected="false";

        }
        console.log(item[i]);

             });



   });


  })
  $scope.toggleAll = function(index){
    console.log("company index"+index);
    console.log("single checkboxe");
      var toggleStatus = $scope.attendanceReport[index].selected;
      console.log(toggleStatus);
          console.log($scope.attendanceReport[index].employeeList);
      // angular.forEach($scope.CompanyList, function(){
      angular.forEach($scope.attendanceReport[index].employeeList, function(itm) {
          // console.log("in loop"+$scope.CompanyList[0].EmplList[0]);
          itm.selected = toggleStatus;


      });
    // }
   }
  $scope.optionToggled = function(index){
      console.log("multiple checkboxe");
      $scope.attendanceReport[index].selected =angular.forEach($scope.attendanceReport[index].employeeList, function(itm){
        console.log(" ****item vall "+$scope.attendanceReport[index].employeeList[index].name);
          return itm.selected;
      });
  }
  $scope.checkAll=function(){
    console.log($scope.attendanceReport);
  }



});
