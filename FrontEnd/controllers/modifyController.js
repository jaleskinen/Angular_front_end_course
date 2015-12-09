main_module.controller('modifyController', function ($scope, $location, modifyFactory, friendDataFactory, $http, Flash) {
    
    console.log('modifyController');
    
    //This is called when cancel clicked
    $scope.homeClicked = function () {
        console.log('Home Clicked');
        $location.path('/list');
    };
    
    var selectedFriend = friendDataFactory.getSelectedFriend();
    
    $scope.id = selectedFriend._id;
    $scope.name = selectedFriend.name;
    $scope.address = selectedFriend.address;
    $scope.age = selectedFriend.age;
    
    $scope.updateClicked = function(){
        
        var temp = {
            
            id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
        
        friendDataFactory.updateData(temp).then(success,error);
    }
    
    function success(){
        friendDataFactory.friendsArray = [];
        $location.path('/list').replace();
    }
    
    function error(data){
        Flash.create('danger',data.message, 'custom-class'); 
    }
    
    //This is called when modifyPerson/deleteClicked
    $scope.deleteClicked = function () {
        console.log('Delete Clicked');
        
        $http.delete('http://localhost:3000/persons/id=' + $scope.id + '/username=' + localStorage.username)
            .success(function (data) {
                console.log("delete response received");
                friendDataFactory.friendsArray = [];
                $location.path('/list').replace();
                Flash.create('success', "Friend " + $scope.name + " deleted from the database", 'custom-class');
            });
    };
    
});