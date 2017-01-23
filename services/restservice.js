// rest call with base url
angular.module("fundooHrApp").service('restService',function($q,$log,$http){
var baseUrl="http://192.168.0.36:3000/";
// getting data
this.getRequest=function(path,query){
var deferred=$q.defer();
console.log(query);
// console.log(headers()['Content-disposition']);
$http({
  method:"GET",
  url:baseUrl+path,
  params:query}).then(function(data){
  console.log(data.headers());
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
