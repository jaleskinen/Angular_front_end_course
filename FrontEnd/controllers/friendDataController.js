main_module.controller('friendDataController', function ($scope, friendDataFactory) {
    
    console.log('friendDataController loaded');
    
    var response = friendDataFactory.getFriendData();
    $scope.loginPerson = localStorage.username;
    
    //Check if factory does not have the data
    if (friendDataFactory.friendsArray.length === 0) {

        response.then(function (data) {

            friendDataFactory.friendsArray = data;
            $scope.friendData = data;
        });
    } else {
        
        $scope.friendData = friendDataFactory.friendsArray;
    }
});