var app = angular.module('fundooHrApp');
app.controller("selectAll", function($scope, $http, restService, $filter, $timeout) {
    console.log();
    // var token = localStorage.getItem("satellizer_token");
    var today = $filter('date')(new Date(), 'ddth' - 'Month' - 'yyyy');
    //REST call to access salary payslip info from server..
    restService.getRequest('readAllEmployee')
        .then(function(data) {
            $scope.employeesalary = data.data.allEmployee;
            $scope.employeesalary.forEach(function(item) {
                item.selected = false;
            });
        }).catch(function(error) {
            console.log(error);
        });

    //clicking on anchor element of html for a post call
    $scope.sendId = function() {
            console.log("sending req");
            console.log(selectedId)

            var query = {
                selectedEngineer: selectedId
            };
            console.log(" final array at the time of  posting");
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
        } //end of sendId method

    //making all checkboxes to be selected when we click on selectAll..
    $scope.toggleAll = function(index) {
            // console.log("selecting aall");
            var toggleStatus = $scope.all;
            console.log(toggleStatus);
            angular.forEach($scope.employeesalary, function(itm) {
                itm.selected = toggleStatus;
            });
            $scope.checkboxValid = $scope.employeesalary.every(function(item) {
                return item.selected;
            });
        }
        // adding selected indivdual checkbox value to an array for Posting to server.....
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
        $scope.employeesalary.forEach(function(item) {
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
    // pushing all checkbox values into array for Posting to server..

    $scope.selectedAllEmp = function(employeesalary) {
            console.log("calling1...");
            if ($scope.all) {
                for (var j = 0; j < employeesalary.length; j++) {
                    selectedId.push(employeesalary[j].engineerId);
                }
            } else {
                console.log("removed..");
                // for (var k = 0; k < selectedId.length; k++) {
                //     if (selectedId[k] === employeesalary[k].engineerId) {
                //         selectedId.splice(k, selectedId.length);
                //     }
                // }
                $scope.selectedId = [];
                console.log($scope.selectedId);
            }

        }
        //function to display icon when a button is clicked..
        $scope.disp = function() {
        $scope.loading = true;
        console.log("in display method...");
        $timeout(function() {
            $scope.loading = false;
            console.log("in timeout");
            $scope.showImage = true;
            $scope.fn = today + 'SalaryReport.csv';
            $scope.Message = "Click on the above icon to download";
        }, 3000);

        console.log(selectedId);

    }
});
