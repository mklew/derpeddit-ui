'use strict';

/**
 * @ngdoc function
 * @name dpt.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dpt
 */
angular.module('dpt')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
