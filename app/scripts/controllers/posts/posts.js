'use strict';

angular.module('dpt.posts', ['dpt.posts.model', 'utils'])
    .controller('PostsController', ['PostsService', '$scope', '_', function (PostService, $scope, _) {

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
                setPosts(posts);
            })
        };

        $scope.displayNewestPosts = function () {
            PostService.getNewest().then(function (posts) {
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

    }]);