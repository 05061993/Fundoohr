var app = angular.module('fundooHrApp');
app.controller("selectAll", function($scope, $http,restService){

    // var token=localStorage.getItem('satellizer_token');
    // console.log("salarypayslip key"+token);
    // $http({
    //   "method":"GET",
    //   "url":"http://192.168.0.144:3000/readAllEmployee?token="+token
    // }).  then(function(data){
    //   console.log(data);
    //     $scope.employeesalary=data.data.allEmployee;
    //     console.log("getting salary info..");
    //   });       without restservice or without base url


    //fetching data by making rest servic call
var key = localStorage.getItem("satellizer_token");
var query = {
  token:key
};
restService.getRequest('readAllEmployee', query)
.then(function (data) {

  $scope.employeesalary = data.data.allEmployee;
  console.log("before"+data.data.allEmployee);
  $scope.employeesalary.forEach(function(item){
    // console.log(item);
    item.selected="false";
  });


// $scope.employeesalary.selected="false";


  console.log("data after addind new attr:",data.data.allEmployee);

}).catch(function (error) {
  console.log(error);
});

//selecting checkboxes..
var alldata=[];
$scope.toggleAll = function(index,employeesalary){
  console.log("selecting aall");
        var toggleStatus = $scope.all;
        // console.log(toggleStatus);
angular.forEach($scope.employeesalary, function(itm){
            itm.selected = toggleStatus;

        });
$scope.checkboxValid = !$scope.employeesalary.every(function(item) {
            return item.selected;

        });
if(toggleStatus)
{
          for (var j = 0; j <$scope.employeesalary.length; j++)
          {
          alldata.push(employeesalary[j].engineerId);
            console.log(employeesalary[j].engineerId);
        }
      }
      else{
          for (var i = 0; i < data.length; i++) {
            if(data[i]===employeesalary.emp.engineerId)
            {
              alldata.splice(j,1);
            }
          }
        }
        console.log("all data");
        console.log(alldata);
    }
    //selecting & deselecting indivdual checkboxes...
// $scope.optionToggled = function(index) {
//         var selectedUsers = [];
//         // console.log("in:" + index);
//         // console.log("single checkbox");
//         // console.log($scope.employeesalary);
//         $scope.employeesalary.forEach(function(item) {
//           // console.log(selectedUsers);
//             // console.log(item);
//             if (item.selected === true) {
//               for(var i=0;i<$scope.employeesalary.length;i++)
//               {
//                 selectedUsers[i]=item;
//                 console.log(selectedUsers[i]);
//                                 }
//             // console.log(selectedUsers[i].engineerId);
//
//           }
//         });
//         // console.log(selectedUsers[index]);
//         var i = 1;
//         $scope.employeesalary.forEach(function(item) {
//
//             if (item.selected === true) {
//
//                 // console.log(i);
//                 $scope.checkboxValid = false;
//                 // console.log(value.id);
//
//                 return; //terminates foreach..
//             } else {
//                 // console.log(i,'==',$scope.checkboxes.length);
//                 if ($scope.employeesalary.length === i) {
//                     $scope.checkboxValid = true;
//                 }
//                 i++;
//             }
//         });
//
//         // console.log($scope.checkboxValid);
//         $scope.all = $scope.employeesalary.forEach(function(itm) {
//
//             return itm.selected;
//         })
//     }
  var data=[];
$scope.selectedEmp=function(selected,emp){
  console.log("calling...");
  console.log("emp salary record");
  console.log(emp);

  if(selected){
    data.push(emp.engineerId);

  }
  else{
    for (var i = 0; i < data.length; i++) {
      if(data[i]===emp.engineerId)
      {
        data.splice(i,1);
      }
    }
  }
  console.log(data);
}




    //function to display icon when a button is clicked..
$scope.disp = function() {
    // console.log("in method...");
    $scope.image = 'images/download.png';
    $scope.Message = "Click on the above icon to download";
}





        });


        // ssss

        //         var i = 1;
        //         $scope.employeesalary.forEach(function(item) {
        //
        //             if (item.selected === true) {
        //
        //                 // console.log(i);
        //                 $scope.checkboxValid = false;
        //                 // console.log(value.id);
        //
        //                 return; //terminates foreach..
        //             } else {
        //                 // console.log(i,'==',$scope.checkboxes.length);
        //                 if ($scope.employeesalary.length === i) {
        //                     $scope.checkboxValid = true;
        //                 }
        //                 i++;
        //             }
        //         });
        //
        //         // console.log($scope.checkboxValid);
        //         $scope.all = $scope.employeesalary.forEach(function(itm) {
        //
        //             return itm.selected;
        //         })
