
//This is the way you define controllers
//the main_module variable is defined in mainModule.js file (located in module folder)
//The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view
//The $scope object is the glue between the view and controller. You use this object to transfer
//data between the view and controller
main_module.controller('controllerLogin', function ($scope, loginFactory, $location) {
    
    //var user = $scope.user;
    //$scope.pass = "halituli";
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function () {
        
        console.log('login was pressed');
        
        var temp = {
            username: $scope.user,
            password: $scope.pass
        };
        
        var waitPromise = loginFactory.startLogin(temp);
        //wait the response from server
        waitPromise.then(function (data) {
            console.log('Login OK');
            //Code inside this block will be called when success responce
            //from server receives
            $location.path('/list');
            
        }, function error(data) {
            console.log('Login Error');
            $('.error').text('Wrong username or password!');
            console.log('bool: ' + $scope.bool);
        });
    };
    
    $scope.registerClicked = function () {
        
        console.log('register was pressed');
        var temp = {
            username: $scope.user,
            password: $scope.pass
        };
        
        var waitPromise = loginFactory.startRegister(temp);
        
        //wait the response from server
        waitPromise.then(function (data) {
            if (data.status === "Ok") {
                console.log('Register status was ok');
                alert('Register OK');
            } else {
                console.log('Register status was NOT ok');
                $('.error').text('Registration failed!');
            }
            
        }, function error(data) {
            console.log('Register Error');
            $('.error').text('Register Error!');
        });
    };
});