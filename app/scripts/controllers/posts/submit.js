'use strict';

angular.module('dpt.posts')
    .controller('SubmitController', ['$scope', function ($scope) {
        $scope.submitCtx = {
            submitText : true
        }
    }])
    .controller('SubmitTextFormController', ['$scope', function ($scope) {

    }])
    .controller('SubmitLinkFormController', ['$scope', function ($scope) {

    }]);
