//Create own directive with name ofExample,NOTE camelcase syntax!
main_module.directive('navBar', function () {
    
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
    

    
    //Define the template code
    directive.templateUrl = "/FrontEnd/views/navbar.html";

    
    //We must always return an object from directive!
    return directive;
    
/*    return {
        restrict: 'AEC',
        templateUrl: "/FrontEnd/views/navbar.html"
    };*/
});