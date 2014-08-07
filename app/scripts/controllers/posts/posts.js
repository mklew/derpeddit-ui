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
    .controller('PostController', ['post', 'comments', '$scope', 'CommentsService','$q', 'PostsService', function (post, comments, $scope, CommentsService, $q, PostsService) {
        $scope.postWithComments = {
            post : post,
            comments : comments
        };

        $scope.refresh = function () {
            var postId = $scope.postWithComments.post.id;
            var postStub = { id: postId };
            var postP = PostsService.getPostById(postId).then(function (p) {
                return $scope.postWithComments.post = p;
            });
            var commentsP = CommentsService.getComments(postStub).then(function (c) {
                return $scope.postWithComments.comments = c;
            });
            return $q.all(postP, commentsP);
        }
    }])
    .controller('CommentFormController', ['$scope', 'CommentsService', function ($scope, CommentsService) {
        // has post on parent scope
        function init() {
            $scope.comment = {};
        }

        $scope.doComment = function () {
            CommentsService.comment($scope.postWithComments.post, $scope.comment).then(function (ignoredResponse) {
                return $scope.refresh().then(function () {
                    init();
                });
            })
        }
    }]);