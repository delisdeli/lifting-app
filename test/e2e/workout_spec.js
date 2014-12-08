describe('workout view', function() {
  var exercises, newExercise, doneWorkout;

  var deleteAllExercises = function () {
    var buttons = $$('.delete-exercise-btn');

    buttons.count().then(function(count) {
      while(count > 0) {
        buttons.first().click();
        count--;
      }
    });
  };

  var isNotExercising = function () {
    var newExercise = element(by.model('newExercise'));
    var doneWorkout = $('.done-workout');
    var doneExercise = $('.done-exercise');
    expect(newExercise.isDisplayed()).toEqual(true);
    expect(doneWorkout.isDisplayed()).toEqual(true);
    expect(doneExercise.isDisplayed()).toEqual(false);
  }

  beforeEach(function() {
    browser.get('/#/workout/test_workout');
    exercises = element.all(by.repeater('exercise in exercises'));
  });

  afterEach(function () {
    deleteAllExercises();
  });

  it('allows the user to add exercises', function() {
    newExercise = element(by.model('newExercise'));
    newExercise.sendKeys('Deadlift');
    newExercise.sendKeys(protractor.Key.ENTER);

    expect(exercises.count()).toEqual(1);
    var cardLabel = exercises.first().getAttribute('.item-divider').getText();
    expect(cardLabel).toEqual('Deadlift');
  });

  describe('when an exercise exists', function () {
    beforeEach(function () {
      newExercise = element(by.model('newExercise'));
      newExercise.sendKeys('Deadlift');
      newExercise.sendKeys(protractor.Key.ENTER);
    });

    describe('and it is deleted', function () {
      it('should not be in the exercising state', function () {
        isNotExercising();
      });
    });

    describe('and an exercise is clicked', function () {
      var $tappedExercise;

      beforeEach(function () {
        $tappedExercise = exercises.first().click();
      });

      it('hides the newExercise input box', function() {
        expect(newExercise.isDisplayed()).toEqual(false);
      });

      it('hides the finish workout button', function() {
        var doneWorkout = $('.done-workout');
        expect(doneWorkout.isDisplayed()).toEqual(false);
      });

      it('shows the finish exercise button', function() {
        var doneExercise = $('.done-exercise');
        expect(doneExercise.isDisplayed()).toEqual(true);
      });

      it('shows the button for creating sets', function() {
        var $addSetBtn = $tappedExercise.$('.add-set-button');
        expect($addSetBtn.isDisplayed()).toEqual(true);
      });

      it('shows the change reps options', function() {
        var $manageRepsWrapper = $tappedExercise.$('.manage-reps-wrapper');
        expect($manageRepsWrapper.isDisplayed()).toEqual(true);
      });

      it('shows the change reps options', function() {
        var $manageRepsWrapper = $tappedExercise.$('.manage-reps-wrapper');
        expect($manageRepsWrapper.isDisplayed()).toEqual(true);
      });

      it('should default to 8 reps', function() {
        var numReps = $tappedExercise.$('.reps-banner').getText();
        expect(numReps).toEqual('8 reps');
      });

      describe('and the add rep button is clicked', function () {
        it('increments the number of reps', function() {
          $tappedExercise.$('.increment-rep-btn').click();
          var numReps = $tappedExercise.$('.reps-banner').getText();
          expect(numReps).toEqual('9 reps');
        });
      });

      describe('and subtract rep button is clicked', function () {
        it('decrements the number of reps', function() {
          $tappedExercise.$('.decrement-rep-btn').click();
          var numReps = $tappedExercise.$('.reps-banner').getText();
          expect(numReps).toEqual('7 reps');
        });
      });

      describe('and the finish exercise button is clicked', function () {
        beforeEach(function () {
          $('.done-exercise').click();
        });

        it('should not be in the exercising state', function () {
          isNotExercising();
        });
      });
    });
  });
});
