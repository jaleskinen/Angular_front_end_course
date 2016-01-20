//Here we create our main module. First argument is the name of the module, the second one
//the '[] array' contains the dependencies to other angular modules
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

//This function will check if user is logged in or not. 
//This function is used in the rouer below in resolve attribute
function loginRequired ($q, $resource, $location, $http){
    
    //Create a promise object
    var deferred = $q.defer();
    $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
    
/*    if (!$http.defaults.headers.get) {
        $http.defaults.headers.get = {};    
    } 
    $http.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

    $http.defaults.headers.get['Cache-Control'] = 'no-cache';*/
    
    $resource('/islogged').query().$promise.then(function success(){
        
        //Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred;
        }, function fail(){
        
        //Mark promise to be failed
        deferred.reject();
        //Go back to root content
        $location.path('/');
        return deferred;
    });
}

//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The $routeProvider object comes from ngRoute module
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_login.html',
        controller:'controllerLogin',
        
    }).when('/list',{
        
        templateUrl:'partial_dataView.html',
        controller:'friendDataController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/edit',{
        
        templateUrl:'partial_editView.html',
        controller:'editController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/delete',{
        
        templateUrl:'partial_deleteView.html',
        controller:'deleteController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/insert',{
        
        templateUrl:'partial_addView.html',
        controller:'addController',
        resolve:{loginRequired:loginRequired}
    }).when('/here_you_are',{
        
        templateUrl:'here_you_are.html',
        resolve:{loginRequired:loginRequired}
    }).when('/chat_view',{
        
        templateUrl:'chat_view.html',
        resolve:{loginRequired:loginRequired}
    });
    
});
