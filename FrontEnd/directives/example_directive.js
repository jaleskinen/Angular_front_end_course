//Create own directive with name ofExample,NOTE camelcase syntax!
main_module.directive('ofExample', function () {
    
    //Create empty object. We will it with needed information below.
    var directive = {};
    
    //First define how our directive can be used using the strict attribute
    //Possible values are:
    //'A' as attribute
    //'C' as class
    //'E' as element
    //'M' as comment
    //or combination of previous like 'AE'
    directive.restrict = 'AEC';
    
    //Create isolated scope for our directive
    //From this point our directive CANNOT use parent scope
    //NOTE do not use underscore "_" on variable names
    directive.scope = {
        
        //Text binding
        name: '@',
        //name: '@myname' //On this case use myname variable on target html  
        
        //Two way binding
        users: '=',
        names: '='
    };
    
    //Normally you just override the link function in your directive
    directive.link = function (scope, elem, attrs) {
        
        $(elem).click(function () {
            
            console.log('directive clicked');
            //scope.getWeather();
        });
        
    };
    
   /* 
    //Compile function is called before this directive
    directive.compile = function (elem, attrs) {
        
        //Use JQuery to set background for our directive element
        $(elem).css('background-color', 'lightgrey');
        
        //Compile must always return link function
        //link function is called when component is rendered
        //on browser window
        return function link(scope, elem, attrs) {
            
            console.log('scope.name: ' + scope.name);
            console.log('scope.users:' + scope.users);
            
        };
    };*/
    
    //You can also defien own controller for your directive
    //
    directive.controller = function ($scope, $http) {
        
        //console.log('directive controller activated: ' + $scope.name);
        
            jQuery(document).ready(function($) {
              $.ajax({
              url : "http://api.wunderground.com/api/9f4c9f5718842fd6/geolookup/conditions/q/FI/oulu.json",
              dataType : "jsonp",
              success : function(parsed_json) {
                  var location = parsed_json['location']['city'];
                  var temp_c = parsed_json['current_observation']['temp_c'];

                  $scope.temperature = temp_c;
                  $scope.$apply();      
                  console.log('$scope.temperature: ' + $scope.temperature);
                      //alert("Current temperature in " + location + " is: " + temp_c);
              }
              });
            });
  
    };
    
    //Define the template code
    directive.templateUrl = "/FrontEnd/directives/content.html";

    
    //We must always return an object from directive!
    return directive;
    
    //Other syntax
    /*return {
        restrict = 'AEC'; 
        templateUrl = "/FrontEnd/directives/content.html";    
    }
*/

});