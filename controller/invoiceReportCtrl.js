angular.module('fundooHrApp').controller("AttinCtrl", function($scope, $http, restService) {
    var token = localStorage.getItem("satellizer_token");
    var query = {
        token: token
    };
    console.log(token);
    restService.getRequest('readInternEmployee', query)
        .then(function(data) {
            console.log(data.data.allEmployee);
            $scope.attendanceReport = data.data.allEmployee;
            console.log("before");
            console.log($scope.attendanceReport);
            angular.forEach($scope.attendanceReport, function(key, value) {
                console.log(key);
                angular.forEach(key, function(item) {
                    console.log(item);
                    for (var i = 0; i < item.length; i++) {
                        item[i].selected = false;
                    }
                });
            });
        })
    $scope.toggleAll = function(index) {
        console.log("company index" + index);
        console.log("single checkboxe");
        var toggleStatus = $scope.attendanceReport[index].selected;
        console.log(toggleStatus);
        console.log($scope.attendanceReport[index].employeeList);
        angular.forEach($scope.attendanceReport[index].employeeList, function(itm) {
            itm.selected = toggleStatus;
        });
    }
    $scope.checkAll = function() {
        console.log($scope.attendanceReport);
    }
});
