var app = angular.module('myApp', ['ngResource', 'ui.bootstrap']);


app.controller('AppCtrl', function($scope, $http, $resource) {
    $scope.tags = [];

    $scope.getTags = function(val) {
        var Tweets = $resource('/tweets', {q: '%23' + val});
        return  Tweets.query()
            .$promise.then(
            function(res){
                return res;
            },
            function(err){
                console.log(err);
            })
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
        var Hashtags = $resource('/hashtags', {}, {'saveData': {method:'POST'}});
        Hashtags.saveData({}, $scope.tags)
            .$promise.then(
            function(res){
                console.log(res);
                $scope.success = true;
            },
            function(err){
                console.log(err);
                $scope.error = true;
            });

        $scope.tags = [];
    };

    $scope.closeAlert = function() {
        $scope.success = false;
        $scope.error = false;
        $scope.noResults = false;
    };
});