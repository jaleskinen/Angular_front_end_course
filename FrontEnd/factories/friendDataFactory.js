main_module.factory('friendDataFactory', function ($resource) {
    
    var factory = {};
    
    //In this array we cache the friends information
    //so that once stored in array we wont make any further request
    factory.friendsArray = [];
    
    factory.getFriendData = function () {
            
        var resource = $resource('/friends', {}, {'get': {method: 'GET'}});
        //Wait the response
        return resource.query().$promise;  
    };
    
    //Factory must always return an object!!!!
    return factory;
    
    /* // Can be also like this
    return {
        name: 'Tepe',
        getData = function(){
            }
    }*/

});