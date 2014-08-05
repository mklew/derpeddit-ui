'use strict';

/**
 * @ngdoc function
 * @name dpt.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dpt
 */
angular.module('dpt')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
