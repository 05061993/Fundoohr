var app = angular.module('fundooHrApp');
app.controller("selectAll", function($scope, $http, restService, $filter) {
    // without restservice or without base url
    // var token=localStorage.getItem('satellizer_token');
    // console.log("salarypayslip key"+token);
    // $http({
    //   "method":"GET",
    //   "url":"http://192.168.0.144:3000/readAllEmployee?token="+token
    // }).  then(function(data){
    //   console.log(data);
    //     $scope.employeesalary=data.data.allEmployee;
    //     console.log("getting salary info..");
    //   });
    //fetching data by making rest servic call

    var key = localStorage.getItem("satellizer_token");
      var today = $filter('date')(new Date(),'ddth'-'Month'-'yyyy');
    var query = {
        token: key
    };
    restService.getRequest('readAllEmployee', query)
        .then(function(data) {
            $scope.employeesalary = data.data.allEmployee;
            // console.log("before" + data.data.allEmployee);
            $scope.employeesalary.forEach(function(item) {
                // console.log(item);
                item.selected = "false";
            });
            // console.log("data after addind new attr:", data.data.allEmployee);
        }).catch(function(error) {
            console.log(error);
        });
    $scope.sendId = function(){
        console.log("sending req");
        var query = {
            token: key,
            selectedEngineer: $scope.selectedIdList

        };
        console.log($scope.selectedIdList);

        console.log(today);
        restService.postRequest('downloadSalaryReport', query)
            .then(function(data, status, headers, config) {
                console.log(data.data);
                var anchor = angular.element('<a/>');
                anchor.attr({
                    href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data.data),
                    target: '_blank',
                    download: today + 'SalaryReport.csv'
                })[0].click();
            });
    }

    //selecting checkboxes..
    $scope.toggleAll = function(index) {
            // console.log("selecting aall");
            var toggleStatus = $scope.all;
            console.log(toggleStatus);
            angular.forEach($scope.employeesalary, function(itm) {
                itm.selected = toggleStatus;
                // console.log("all data"+itm);
            });
            $scope.checkboxValid = $scope.employeesalary.every(function(item) {
                return item.selected;
            });
        }
        // selecting & deselecting indivdual checkboxes...
    var selectedId = [];
    $scope.selectedEmp = function(selected, emp) {
        console.log("calling...");
        console.log("emp salary record");
        // console.log(emp);
        if (selected) {
            selectedId.push(emp.engineerId);
        } else {
            for (var i = 0; i < selectedId.length; i++) {
                if (selectedId[i] === emp.engineerId) {
                    selectedId.splice(i, 1);
                }
            }
        }

        console.log(selectedId);
        //enabling button while atleast one checkbox is checked..
        var i = 1;
        $scope.employeesalary.forEach(function(item){
            //  console.log(item.selected);
            //  console.log(item);
            if (item.selected === true) {
                $scope.checkboxValid = true;
                return; //terminates foreach..
            } else {
                if ($scope.employeesalary.length === i) {
                    $scope.checkboxValid = false;
                }
                i++;
            }
        });
    }
    $scope.selectedIdList = selectedId;
    console.log($scope.selectedIdList);
    //selectinin all
    var alldata = [];
    $scope.selectedAllEmp = function(employeesalary) {
        console.log("calling1...");
        if ($scope.all) {
            for (var j = 0; j < employeesalary.length; j++) {
                alldata.push(employeesalary[j].engineerId);
            }
        } else {
            console.log("removed..");
            for (var k = 0; k < alldata.length; k++) {
                if (alldata[k] === employeesalary[k].engineerId) {
                    alldata.splice(k, alldata.length);
                }
            }
        }
        //function to display icon when a button is clicked..
}
        $scope.disp = function() {
            // var today1 = $filter('date')(new Date(), 'MM/dd/yy');
        console.log("in display method...");
        $scope.fn =today + ' SalaryReport.csv';
        $scope.Message = "Click on the above icon to download";
        console.log(alldata);

    }
});
