'use strict';

var models = angular.module('models', []);

models.factory('Set', function() {
  var Set = function (weight, reps, units) {
    if (typeof units === 'undefined') { units = 'lb'; }
    if (typeof weight !== 'number' || typeof reps !== 'number' ) {
      return;
    }

    this.weight = weight;
    this.reps = reps;
    this.units = units;
  };

  return Set;
});

models.factory('Exercise', ['Set', function(Set) {
  // instantiate our initial object
  var Exercise = function (name) {
    this.name = name;
    this.sets = [];
  };

  Exercise.prototype.addSet = function(set) {
    this.sets.push(set);
  };

  return Exercise;
}]);
