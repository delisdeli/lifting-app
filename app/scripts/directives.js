'use strict';

var directives = angular.module('directives', []);

directives.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

directives.directive('stopEvent', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function (e) {
        e.stopPropagation();
      });
    }
  };
});