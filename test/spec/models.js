'use strict';

describe('Set', function() {

  var should = chai.should();
  var set;

  // load the controller's module
  beforeEach(module('Simplift'));

  beforeEach(inject(function(Set) {
    set = Set;
  }));

  describe('#Set', function() {
    it('sets instance variables', function() {
      var newSet = new set(100, 8, 'kg');
      newSet.weight.should.equal(100);
      newSet.reps.should.equal(8);
      newSet.units.should.equal('kg');
    });

    it('defaults units to lbs', function () {
      var newSet = new set(100, 8);
      newSet.units.should.equal('lb');
    });
  });
});

describe('Exercise', function() {

  var should = chai.should();
  var exercise, newExercise;

  // load the controller's module
  beforeEach(module('Simplift'));

  beforeEach(inject(function(Exercise) {
    exercise = Exercise;
    newExercise = new exercise('deadlift');
  }));

  describe('#exercise', function() {
    it('sets instance variables', function() {
      newExercise.name.should.equal('deadlift');
      newExercise.sets.should.have.length(0);
    });
  });

  describe('#addSet', function() {
    it('adds a given Set to our list of Sets', function() {
      newExercise.addSet('set')
      newExercise.sets.should.have.length(1);
    });
  });
});