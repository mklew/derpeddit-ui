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
                    "postWithComments": ['$route', 'PostsService', 'CommentsService', '$q', function ($route, PostsService, CommentsService, $q) {
                        var postId = $route.current.params.id;
                        var postStub = { id: postId };
                        var postP = PostsService.getPostById(postId).then(function (p) {
                            return {post: p}
                        });
                        var commentsP = CommentsService.getComments(postStub).then(function (c) {
                            return {comments: c};
                        });

                        return $q.all(postP, commentsP);

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
