'use strict';

angular.module('dpt.directives')
    .directive('dptPostSummary', ['PostsService', 'CurrentUser', function (PostsService, CurrentUser) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                post: '=ngModel'
            },
            templateUrl: 'scripts/directives/post-summary-tpl.html',
            link: function ($scope, element, attrs) {
                $scope.CurrentUser = CurrentUser;
                $scope.isLinkPost = function(post) {
                    return post.link != null && angular.isDefined(post.link)
                };

                function updateScore(response) {
                    return $scope.post.score = response['new_post_score'];
                }

                $scope.upVote = function () {
                    return PostsService.upVotePost($scope.post).then(updateScore);
                };

                $scope.downVote = function () {
                    return PostsService.downVotePost($scope.post).then(updateScore);
                }
            }
        }
    }]);
