'use strict';

angular.module('dpt.posts')
    .controller('SubmitController', ['$scope', function ($scope) {
        $scope.submitCtx = {
            submitText : true
        }
    }])
    .controller('SubmitTextFormController', ['$scope', 'PostsService', '$log', '$location', function ($scope, PostsService, $log, $location) {
        $scope.post = {};

        $scope.submitText = function() {
            PostsService.submitText($scope.post).then(function(r){
                $location.url('post/' + r.id);
            }, function(e){
                $log.error('submit text error', e);
            })
        }
    }])
    .controller('SubmitLinkFormController', ['$scope', 'PostsService', '$log', '$location', function ($scope, PostsService, $log, $location) {

        $scope.post = {};

        $scope.submitLink = function() {
            PostsService.submitLink($scope.post).then(function(r){
                $location.url('post/' + r.id);
            }, function(e){
                $log.error('submit link error', e);
            })
        }
    }]);
