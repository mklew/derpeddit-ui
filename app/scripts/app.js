'use strict';

/**
 * @ngdoc overview
 * @name derpedditUiApp
 * @description
 * # derpedditUiApp
 *
 * Main module of the application.
 */
angular
  .module('dpt', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'dpt.posts'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
