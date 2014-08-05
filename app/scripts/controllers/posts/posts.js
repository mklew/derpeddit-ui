'use strict';

angular.module('dpt.posts', ['dpt.posts.model', 'utils'])
    .controller('PostsController', ['PostsService', '$scope', '_', function (PostService, $scope, _) {

        var postsIndex = {
            currentlyDisplays: 'top',
            posts: []
        };

        function displayPostsAs(name) {
            return function(posts) {
                postsIndex.posts.length = 0;
                postsIndex.posts.push.apply(postsIndex.posts, posts);
                postsIndex.currentlyDisplays = name;
            }
        }

        $scope.postsIndex = postsIndex;

        $scope.displayTopPosts = function () {
            PostService.getAllPosts().then(function (posts) {
                return _.chain(posts).sortBy('score').reverse().value()
            }).then(displayPostsAs('top'));
        };

        $scope.displayNewestPosts = function () {
            PostService.getAllPosts().then(function (posts) {
                return _.chain(posts).sortBy('created').reverse().value()
            }).then(displayPostsAs('newest'));
        };
    }]);


