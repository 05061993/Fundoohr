// rest call with base url
angular.module("fundooHrApp").service('restService',function($q,$log,$http){
var baseUrl="http://192.168.0.16:3000/";
var token = localStorage.getItem("satellizer_token");
// getting data
this.getRequest=function(path,query){
var deferred=$q.defer();
$http({
  method:"GET",
  url:baseUrl+path,
  headers:{
    'x-token':token
  },
  params:query}).then(function(data){
  // console.log(data.headers());
    deferred.resolve(data);
  }),function(msg,code){
    deferred.reject(msg);
    $log.error(msg,code);
  };
  return deferred.promise;
};
//function to POST
this.postRequest=function(path,query){
  var deferred=$q.defer();
  $http({
    method:"POST",
    url:baseUrl+path,
    headers:{
      'x-token':token
    },
    data:query
  }).then(function(data){
    deferred.resolve(data);
  }),function(msg,code){
    deferred.reject(msg);
    $log.error(msg,code);
  };
  return deferred.promise;
};

  });
