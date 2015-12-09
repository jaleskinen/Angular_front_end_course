main_module.controller('addPersonController', function ($scope, $location, friendDataFactory, Flash) {
    
    console.log('addPersonController loaded');
    
    $scope.loginPerson = localStorage.username;
    
    //This is called when cancel clicked
    $scope.homeClicked = function () {
        console.log('Home Clicked');
        $location.path('/list');
    };
    
    //This is called when add clicked
    $scope.addClicked = function () {
        console.log('Add Clicked');
        //Disable save until previous request handled
        $('#add').attr("disabled", true);
        
        var temp = {
            name: $scope.name,
            address: $scope.address,
            age: $scope.age
        };

        friendDataFactory.insertData(temp).then(function (data) {
            
            friendDataFactory.friendsArray.push(data.data);
            console.log('Add OK');
            Flash.create('success', 'New friend added!', 'custom-class');
            $scope.name = "";
            $scope.address = "";
            $scope.age = "";
            $('#add').attr("disabled", false);
        }, function (error) {
            console.log('Add FAIL');
            $('#add').attr("disabled", false);
            Flash.create('warning', 'Failed to add friend!', 'custom-class');
        });
        
    };
});