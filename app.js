
/**
* @define module
* @param {string} ngApp-parameter refers to the HTML element in which app will return
* @param {Array} injector-loading modules through injector
**/

 angular.module("fundooHrApp", ['ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'satellizer', 'toastr'])
 /** configure existing services */
     .config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
         var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
             var deferred = $q.defer();
             if ($auth.isAuthenticated()){
                 deferred.reject();
             } else {
                 deferred.resolve();
             }
             return deferred.promise;
         }];  //end of function

         /**
         * @default Login
         */

    /** This is a description of the loginRequired function. */
         var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
             var deferred = $q.defer();
             if ($auth.isAuthenticated()){
                 deferred.resolve();
             } else {
                 $location.path('/login');
             }
             return deferred.promise;
         }];
         $urlRouterProvider.otherwise('/dashboard');  // when application loads the dashboard page is rendered defaultly
         /** @define state */
         $stateProvider
         /** Login state */
             .state('login', {
                 url: '/login',
                 templateUrl: 'templates/login.html',
                 controller: 'loginController',
                 resolve: {
                     skipIfLoggedIn: skipIfLoggedIn
                 }
             })
             .state('logout', {
                 url: '/logout',
                 template: null,
                 controller: 'logoutController'
             })
             /** Home Page state */
             .state('home', {
                 url: '/',
                 templateUrl: 'templates/navbar.html',
                 controller: 'homeController',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
         /** Dashboard state */
         .state('home.dashboard',{
                 url: 'dashboard',
                 templateUrl: 'templates/cards.html',
                 controller: 'DashCtrl',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
             .state('home.report', {
                 url: 'report',
                 templateUrl: 'templates/reportcards.html',
                 controller: 'reportCtrl',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
             .state('home.payslip', {
                 url: 'salary',
                 templateUrl: 'templates/salpayslip.html',
                 controller: 'selectAll',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })

         .state('home.attReport', {
                 url: 'attReport',
                 templateUrl: 'templates/attendancereport.html',
                 controller: 'AttCtrl',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
             .state('home.invoiceReport', {
                 url: 'invoiceReport',
                 templateUrl: 'templates/invoicereport.html',
                 controller: 'AttinCtrl',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
             .state('home.next', {
                 url: 'attInvoice',
                 templateUrl: 'templates/nextpage.html',
                 controller: 'nextPageCtrl',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
             .state('home.zip', {
                 url: 'invoiceReport/Invoicezip',
                 templateUrl: 'templates/invocezip.html',
                 controller: 'invoceCtrl',
                 resolve: {
                     loginRequired: loginRequired
                 }
             })
     });
