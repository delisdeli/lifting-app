describe('workout view', function() {
  var exercises, newExercise;

  beforeEach(function() {
    browser.get('/#/');

    exercises = element.all(by.repeater('exercise in exercises'));
    newExercise = element(by.model('newExercise'));
    newExercise.sendKeys('Deadlift');
    newExercise.sendKeys(protractor.Key.ENTER);
  });

  it('allows the user to add exercises', function() {
    expect(exercises.count()).toEqual(1);
    var cardLabel = exercises.first().getAttribute('.item-divider').getText();
    expect(cardLabel).toEqual('Deadlift');
  });

  describe('once the user adds an exercise', function () {
    describe('and taps an exercise card', function () {
      beforeEach(function () {
        exercises.first().click();
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
    });
  });
});
