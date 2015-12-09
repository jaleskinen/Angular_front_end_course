main_module.controller('friendDataController', function ($scope, friendDataFactory, $location, $http) {
    
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.loginPerson = localStorage.username;
    
    function dataCallback(dataArray) {
        
        $scope.friendData = dataArray;
    }
    
    $scope.modifyPersonClicked = function(id){
        console.log('modifyPersonClicked id ' + id);
        friendDataFactory.selected_id = id;
        $location.path('/modifyPerson').replace();
    }
    
    //This is called when searchClicked
    $scope.searchClicked = function () {
        console.log('Search Clicked');
        $http.get('http://localhost:3000/persons/name=' + $scope.search + '/username=' + localStorage.username)
            .success(function (persons) {
            console.log('Search success');
                $scope.friendData = persons;
                $scope.search = "";
            });
    };
    
    //This is called when showAllClicked, load all friend back to table
    $scope.showAllClicked = function () {
        console.log('Show All Clicked');
        friendDataFactory.getFriendData(dataCallback);
        $scope.search = "";
    };
    
});