'use strict';

angular.module('dpt.users')
    .factory('UserService', ['backendBaseAddress', '$http', '$q', '$log', 'UnwrapDataFromRequest',
        function (backendBaseAddress, $http, $q, $log, UnwrapDataFromRequest) {

            var baseUrl = backendBaseAddress + 'core/auth/';

            function doPost(action, user) {
                var url = baseUrl + action;
                $log.info('Making POST request to ', url, 'with user', user);
                return UnwrapDataFromRequest($http.post(url, angular.copy(user)))
            }

            return {
                signUp: function (user) {
                    return doPost('signup', user);
                },
                logIn: function (user) {
                    return doPost('login', user);
                },
                logout: function () {
                    return doPost('logout', {});
                },
                profile: function () {
                    var url = baseUrl + 'profile';
                    $log.info('Making POST request to ', url);
                    return UnwrapDataFromRequest($http.get(url))
                }
            }
        }])
    .service('CurrentUser', ['UserService', function (UserService) {

        var user = {
            // isLoggedIn
            // profile
        };

        this.setIsLoggedIn = function () {
            user.isLoggedIn = true;
        };

        this.getCurrentUser = function () {
            return user;
        };

        this.isLoggedIn = function () {
            return user.isLoggedIn;
        };

        this.sync = function () {
            console.log('syncing');

            return UserService.profile().then(function (profile) {
                user.isLoggedIn = true;
                user.profile = profile;
            }, function () {
                user.isLoggedIn = false;
            })
        };

        this.init = function () {
           console.log('intializing');
           return sync();
        };

        this.logout = function () {
            return UserService.logout();
        }

    }])
    .run(['CurrentUser', function (CurrentUser) {
        console.log('run block of dpt.users module');

        CurrentUser.init();
    }]);
