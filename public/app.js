var app = angular.module('myApp', ['ngResource', 'ui.bootstrap']);

app.controller('AppCtrl', function ($scope, $http, $resource) {
  $scope.hashtags = [];

  $scope.getHashtags = function (val) {
    var Tweets = $resource('/tweets', {q: '%23' + val});
    return Tweets.query()
      .$promise.then(
      function (res) {
        return res;
      },
      function (err) {
        console.log(err);
      })
  };

  $scope.addHashtag = function (tag) {
    $scope.hashtags.push(tag);
    $scope.asyncSelected = '';//clear input
  };

  $scope.removeHashtag = function (tag) {
    var index = $scope.hashtags.indexOf(tag);
    $scope.hashtags.splice(index, 1);
  };

  $scope.saveHashtags = function () {
    var Hashtags = $resource('/hashtags', {}, {'saveData': {method: 'POST'}});
    Hashtags.saveData({}, $scope.hashtags)
      .$promise.then(
      function (res) {
        $scope.success = true;
      },
      function (err) {
        $scope.error = true;
      });

    $scope.hashtags = [];
  };

  $scope.closeAlert = function () {
    $scope.success = false;
    $scope.error = false;
    $scope.noResults = false;
  };
});