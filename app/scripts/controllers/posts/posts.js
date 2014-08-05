'use strict';

angular.module('dpt.posts', ['dpt.posts.model'])
    .controller('PostsController', ['PostsService', '$scope', function (PostService, $scope) {

        var postsIndex = {
            currentlyDisplays: 'top'
        };

        $scope.postsIndex = postsIndex;

        $scope.displayTopPosts = function () {
            // TODO fetch via service and order by votes
            postsIndex.currentlyDisplays = 'top';
        };

        $scope.displayNewestPosts = function () {
            // TODO fetch via service and order by date
            postsIndex.currentlyDisplays = 'newest';
        };
    }]);