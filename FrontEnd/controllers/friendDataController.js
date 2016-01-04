main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
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
        console.log('search pressed');
        friendDataFactory.search($scope.search_term).then(function(data){
            console.log(data);
            $scope.friendData = data;
            
        });
    }
});