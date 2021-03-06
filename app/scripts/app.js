'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var simpliftApp = angular.module('Simplift', ['ionic',
  'firebase',
  'config',
  'controllers',
  // 'models',
  'directives'
]);

simpliftApp.constant('FirebaseUrl', 'https://simplift.firebaseio.com');

simpliftApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

simpliftApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/workout/1');

  $stateProvider.state('workout', {
    url: '/workout/:workoutId',
    views: {
      workout: {
        templateUrl: 'partials/workout.html',
        controller: 'WorkoutCtrl as workoutCtrl'
      }
    }
  });
});
