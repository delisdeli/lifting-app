'use strict';

describe('Controllers:', function () {

  var should = chai.should();
  var WorkoutCtrl, ExerciseCtrl, scope, exerciseScope, $timeout;

  // load the controller's module
  beforeEach(function() {
    module('Simplift', function($provide) {
      $provide.constant('FirebaseUrl', 'https://simplift.firebaseio.com/test_db');
      $provide.value('$stateParams', {
          workoutId: 1
      });
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$timeout_, $httpBackend) {
    $timeout = _$timeout_;
    $httpBackend.whenGET("partials/workout.html").respond('');
  }));

  describe('WorkoutCtrl', function () {
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      WorkoutCtrl = $controller('WorkoutCtrl', {
        $scope: scope
      });
    }));

    describe('#init', function () {
      beforeEach(function () {
        scope.init();
      });

      it('sets the workoutId', inject(function () {
        WorkoutCtrl.workoutId.should.equal(1);
      }));

      it('begins a workout without an empty list of exercises', inject(function () {
        scope.exercises.should.have.length(0);
      }));
    });

    describe('#createExercise', function () {
      beforeEach(function () {
        scope.init();
        scope.exercises.$remove(scope.exercises[0]);
        $timeout.flush();
        scope.createExercise('exercise_name');
      });

      it('clears newExercise variable', inject(function () {
        scope.newExercise.should.equal('');
      }));

      it('begins a workout without an empty list of exercises', inject(function () {
        scope.exercises.should.have.length(1);
      }));
    });

    describe('#isExercising', function () {
      it('returns false when there is no activeExercise', inject(function () {
        expect(scope.isExercising()).to.not.exist;
      }));

      it('returns true when activeExercise defined initialized', inject(function () {
        WorkoutCtrl.activeExercise = 'something';
        expect(scope.isExercising()).to.exist;
      }));
    });

    describe('#finishExercise', function () {
      it('sets active exercise as null', inject(function () {
        WorkoutCtrl.activeExercise = 'something';
        scope.finishExercise();
        expect(WorkoutCtrl.activeExercise).to.be.null;
      }));
    });

    describe('#deleteExercise', function () {
      it('removes given exercise from workout', inject(function () {
        scope.init();
        scope.createExercise('exercise_name');
        $timeout.flush();
        var prevNumExercises = scope.exercises.length;
        scope.deleteExercise(scope.exercises[0]);
        $timeout.flush();
        scope.exercises.should.have.length(prevNumExercises - 1);
      }));
    });
  });

  describe('ExerciseCtrl', function () {
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      ExerciseCtrl = $controller('ExerciseCtrl', {
        $scope: scope
      });

      scope.workoutCtrl = { workoutId: 1 };
      scope.exercise = { $id: 10 };
    }));

    describe('#init', function () {
      beforeEach(function () {
        scope.init();
      });

      it('initializes weight', inject(function () {
        scope.weight.should.equal('100');
      }));

      it('initializes number of reps', inject(function () {
        scope.numReps.should.equal('8');
      }));

      it('begins a workout without an empty list of exercises', inject(function () {
        scope.sets.should.have.length(0);
      }));
    });

    describe('#startExercise', function () {
      beforeEach(function () {
        scope.startExercise();
      });

      it('sets workout active exercise to this one', inject(function () {
        scope.workoutCtrl.activeExercise.should.equal(10);
      }));
    });

    describe('#addReps', function () {
      beforeEach(function () {
        scope.numReps = '8';
      });

      describe('when given an appropriate input', function () {
        it('updates total number of reps', inject(function () {
          scope.addReps(1);
          scope.numReps.should.equal('9');
          scope.addReps(-1);
          scope.numReps.should.equal('8');
        }));
      });

      describe('when given an inappropriate input', function () {
        it('does not update numReps', inject(function () {
          scope.addReps(-101);
          scope.addReps(100);
          scope.numReps.should.equal('8');
        }));
      });
    });

    describe('#isActive', function () {
      describe('when the current exercise is the active exercise', function () {
        it('returns true', inject(function () {
          scope.workoutCtrl.activeExercise = 10;
          scope.isActive().should.equal(true);
        }));
      });

      describe('when the current exercise is not the active exercise', function () {
        it('returns false', inject(function () {
          scope.workoutCtrl.activeExercise = 1;
          scope.isActive().should.equal(false);
        }));
      });
    });

    describe('#createSet', function () {
      beforeEach(function () {
        scope.init();
        scope.createSet();
      });

      afterEach(function () {
        scope.sets.$remove(scope.sets[0]);
        $timeout.flush();
      });

      it('adds set of current weight and reps to exercise', inject(function () {
        $timeout.flush();
        scope.sets.should.have.length(1);
        var exercise = scope.sets[0];
        exercise.weight.should.equal('100');
        exercise.reps.should.equal('8');
      }));
    });

    describe('#deleteSet', function () {
      beforeEach(function () {
        scope.init();
        scope.createSet();
        $timeout.flush();
      });

      afterEach(function () {
        scope.sets.$remove(scope.sets[0]);
      });

      describe('when exercise is inactive', function () {
        beforeEach(function () {
          scope.isActive = function () { return false; };
          scope.deleteSet(scope.sets[0]);
        });

        it('does not removes given set', inject(function () {
          scope.sets.should.have.length(1);
        }));
      });

      describe('when exercise is inactive', function () {
        beforeEach(function () {
          scope.isActive = function () { return true; };
          scope.deleteSet(scope.sets[0]);
          $timeout.flush();
        });

        it('does not removes given set', inject(function () {
          scope.sets.should.have.length(0);
        }));
      });
    });
  });
});
