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
        'dpt.posts',
        'dpt.users',
        'utils',
        'dpt.directives'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/posts/posts.html',
                resolve: {
                    "posts": ['PostsService', function (PostsService) {
                        return PostsService.getPosts();
                    }]
                },
                controller : 'PostListController'
            })
            .when('/submit', {
                templateUrl: 'views/posts/submit.html',
                controller: 'SubmitController'
            })
            .when('/post/:id', {
                templateUrl : 'views/posts/post.html',
                controller: 'PostController',
                resolve: {
                    "post": ['$route', 'PostsService', function($route, PostsService){
                        return PostsService.getPostById($route.current.params.id);
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('AppController', ['$scope', 'CurrentUser', function($scope, CurrentUser){
        $scope.CurrentUser = CurrentUser;
    }]);
