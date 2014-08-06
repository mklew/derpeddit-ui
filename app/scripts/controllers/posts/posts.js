'use strict';

angular.module('dpt.posts', ['dpt.posts.model', 'utils'])
    .controller('PostsController', ['PostsService', '$scope', '_', '$location', function (PostService, $scope, _, $location) {

        var postsIndex = {
            posts: []
        };

        function setPosts(posts) {
            postsIndex.posts = postsIndex.posts || [];
            postsIndex.posts.length = 0;
            postsIndex.posts.push.apply(postsIndex.posts, posts);
        }

        $scope.postsIndex = postsIndex;

        $scope.displayTopPosts = function () {
            PostService.getTop().then(function (posts) {
                $location.url('/');
                setPosts(posts);
            })
        };

        $scope.displayNewestPosts = function () {
            PostService.getNewest().then(function (posts) {
                $location.url('/');
                setPosts(posts);
            })
        };

        $scope.displaysTop = PostService.displaysTop;

        $scope.displaysNewest = PostService.displaysNewest;
    }])
    .controller('PostListController', ['PostsService', '$scope', 'posts', function(PostsService, $scope, posts){
        $scope.postsIndex.posts = posts;
    }])
    .controller('LoginSignUpController', ['$scope', function($scope){

        var loginSignUpNav = {
            displayLogin : true
        };

        $scope.loginSignUpNav = loginSignUpNav;

    }])
    .controller('PostController', ['postWithComments', '$scope', function (postWithComments, $scope) {
        $scope.post = postWithComments.post;
        $scope.comments = postWithComments.comments;
    }]);