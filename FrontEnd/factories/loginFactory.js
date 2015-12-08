main_module.factory('loginFactory', function ($resource) {
    
    var factory = {};
    
    //This function can be called from ANY controller using this factory implementation
    factory.startLogin = function (data) {
        
        console.log('startLogin: ' + data.username);
        //Create resource for context "/friends/login", empty object {} includes options
        var req = $resource('/friends/login', {}, {'post': {method: 'POST'}});
        //Use POST method to send the username and password to above context
        //Note that we return an promise object from here
        return req.post(data).$promise;
        
    };
    
    //This function can be called from ANY controller using this factory implementation
    factory.startRegister = function (data) {
        
        console.log('startRegister: ' + data.username);
        //Create resource for context "/friends/register"
        var req = $resource('/friends/register', {}, {'post': {method: 'POST'}});
        //Use POST method to send the username and password to above context
        //Note that we return an promise object from here
        return req.post(data).$promise;
        
    };
    
    //Factory must always return an object!!!!
    return factory;
    
});