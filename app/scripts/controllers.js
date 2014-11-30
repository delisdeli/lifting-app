'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('WorkoutCtrl', ['$scope', 'Set', 'Exercise',
  function ($scope, Set, Exercise) {
  // var defaultExercises = [new Exercise('Deadlift')];
  $scope.exercises = [];
  $scope.isExercising = false;

  $scope.createExercise = function (name) {
    $scope.newExercise = '';
    $scope.exercises.push(new Exercise(name));
  };

  $scope.startExercise = function () {
    $scope.isExercising = true;
  };

  $scope.finishExercise = function () {
    $scope.isExercising = false;
  };
}]);
