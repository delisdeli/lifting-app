'use strict';

describe('WorkoutCtrl', function () {

  var should = chai.should();
  var WorkoutCtrl, scope;

  // load the controller's module
  beforeEach(module('Simplift'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkoutCtrl = $controller('WorkoutCtrl', {
      $scope: scope
    });
  }));

  it('begins a workout without an empty list of exercises', function () {
    scope.exercises.should.have.length(0);
  });

  it('starts with exercising state false', function () {
    scope.isExercising.should.equal(false);
  });

  describe('#createExercise', function () {
    beforeEach(function () {
      scope.createExercise('Some Exercise');
    });

    it('resets value of newExercise', function () {
      scope.newExercise.should.equal('');
    });

    it('adds an exercise with given name to workout', function () {
      scope.exercises.should.have.length(1);
      scope.exercises[0].name.should.equal('Some Exercise');
    });
  });

  describe('#startExercise', function () {
    it('sets exercising state to true', function () {
      scope.startExercise();
      scope.isExercising.should.equal(true);
    });
  });

  describe('#finishExercising', function () {
    it('sets exercising state to false', function () {
      scope.finishExercise();
      scope.isExercising.should.equal(false);
    });
  });
});
