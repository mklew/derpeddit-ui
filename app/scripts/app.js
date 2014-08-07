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
                    "post": ['$route', 'PostsService', function ($route, PostsService) {
                        var postId = $route.current.params.id;
                        return PostsService.getPostById(postId).then(function (p) {
                            console.log('resolved post p',p)
                            return p;
                        });
                    }],
                    "comments": ['$route', 'CommentsService', function ($route, CommentsService) {
                        var postId = $route.current.params.id;
                        var postStub = { id: postId };

                        return CommentsService.getComments(postStub).then(function (c) {
                            console.log('resolved comments c',c)
                            return c;
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
