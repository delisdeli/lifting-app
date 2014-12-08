'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('WorkoutCtrl', [
  '$scope',
  'FirebaseUrl',
  '$firebase',
  '$stateParams',
  function ($scope, FirebaseUrl, $firebase, $stateParams) {
    var self = this;
    var fireRef;

    $scope.init = function () {
      self.workoutId = $stateParams.workoutId;
      fireRef = new Firebase(FirebaseUrl + '/workouts/' + self.workoutId);

      $firebase(fireRef).$update({ date: new Date() });
      $scope.exercises = $firebase(fireRef.child('exercises')).$asArray();
    };

    $scope.createExercise = function (name) {
      $scope.newExercise = '';
      $scope.exercises.$add({ name: name });
    };

    $scope.isExercising = function () {
      return self.activeExercise;
    };

    $scope.finishExercise = function () {
      self.activeExercise = null;
    };

    $scope.deleteExercise = function (exercise) {
      $scope.exercises.$remove(exercise);
      $scope.finishExercise();
    };
  }
]);

controllers.controller('ExerciseCtrl', [
  '$scope',
  'FirebaseUrl',
  '$firebase',
  function ($scope, FirebaseUrl, $firebase) {
    var fireRef;

    $scope.init = function () {
      fireRef = new Firebase(FirebaseUrl + '/workouts/' + $scope.workoutCtrl.workoutId + '/exercises/' + $scope.exercise.$id + '/sets');

      $scope.weight = '100';
      $scope.numReps = '8';
      $scope.exercise.sets = $firebase(fireRef).$asArray();
    };

    $scope.startExercise = function () {
      $scope.workoutCtrl.activeExercise = $scope.exercise.$id;
    };

    $scope.addReps = function (repsToAdd) {
      var reps = parseInt($scope.numReps) + repsToAdd;

      if (reps > 0 && reps < 100) {
        $scope.numReps = reps.toString();
      }
    };

    $scope.createSet = function () {
      $scope.exercise.sets.$add({
        weight: $scope.weight,
        reps: $scope.numReps
      });
    };

    $scope.isActive = function () {
      return $scope.exercise.$id === $scope.workoutCtrl.activeExercise;
    };
  }
]);
