'use strict';

angular.module('dpt.directives')
    .directive('dptPostSummary', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                post: '=ngModel'
            },
            templateUrl: 'scripts/directives/post-summary-tpl.html',
            link: function ($scope, element, attrs) {

                $scope.isLinkPost = function(post) {
                    return post.link != null && angular.isDefined(post.link)
                };
            }
        }
    });
