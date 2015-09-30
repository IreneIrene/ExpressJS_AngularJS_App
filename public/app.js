var app = angular.module('myApp', ['ui.bootstrap']);


app.controller('AppCtrl', function($scope, $http) {
    $scope.tags = [];

    $scope.getTags = function(val) {
        return $http.get('/tweets', {
            params: {
                q: '%23' + val,
            }
        }).then(function(res){
            console.log(res.data);
            return res.data;
        });
    };

    $scope.addTag = function(tag) {
        $scope.tags.push(tag);
        $scope.asyncSelected = '';//clear input
    };

    $scope.removeTag = function(tag) {
        var index = $scope.tags.indexOf(tag);
        $scope.tags.splice(index,1);
    };

    $scope.saveTags = function() {
        console.log('test');
    };

});