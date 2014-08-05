'use strict';

angular.module('dpt.users')
    .controller('SignUpController', ['$scope', '$log', 'UserService', function ($scope, $log, UserService) {
        var user = {
            // from view
        };

        var repeatedPass = {
            // from view
        };

        $scope.user = user;
        $scope.repeatedPassword = repeatedPass;

        $scope.signUpIfValid = function (user) {
            function signUpSuccess(res) {
                $log.info('SignUp success', res)
            }

            function signUpFailure(e) {
                $log.error('SignUp failure', e)
            }

            if ($scope.signUpForm.$valid) {
                $log.info('sign up form valid, user', user);
                UserService.signUp(user).then(signUpSuccess, signUpFailure)
            }
            else {
                $log.info('sign up form invalid')
            }
        }
    }]);


