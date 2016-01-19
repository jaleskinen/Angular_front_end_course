main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.name = "Jarmo Leskinen";
    
    
    $scope.rowCliked = function(id){
        
        friendDataFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
    
        //This is called when logoutClicked
    $scope.logoutClicked = function () {
        console.log('logout Clicked');
        window.location.href = "#/";
        /*personFactory.logoutPerson();*/
    };
    
    $scope.search = function(){
        friendDataFactory.search($scope.search_term).then(function(data){
            console.log('data received: ' + data);
            $scope.friendData = data;
        });
    }
    
     $scope.showAll = function () {
        location.reload();
    };
});