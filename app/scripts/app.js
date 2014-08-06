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
                    "postWithComments": ['$route', 'PostsService', 'CommentsService', function($route, PostsService, CommentsService){
                        return PostsService.getPostById($route.current.params.id).then(function(post){
                            return CommentsService.getComments(post).then(function(comments){
                                return {
                                    post : post,
                                    comments : comments
                                }
                            })
                        });
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
