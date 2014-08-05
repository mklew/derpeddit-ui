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
    .service('CurrentUser', ['UserService', '$q', function (UserService, $q) {

        var user = {
            // isLoggedIn
            // profile
        };


        this.setIsLoggedIn = function () {
            user.isLoggedIn = true;
        };

        this.getCurrentUser = function () {
            return user.profile;
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
                return $q.reject();
            })
        };

        this.init = function () {
           console.log('intializing');
           return this.sync();
        };

        this.logout = function () {
            return UserService.logout().then(function(){
                user.profile = {};
                user.isLoggedIn = false;
            }, function(){ return $q.reject(); });
        };

        this.logIn = function(u) {
            return UserService.logIn(u).then(function(response){
                user.isLoggedIn = true;
                user.profile = user.profile || {};
                angular.extend(user.profile, response);
                return response;
            }, function(i){ return $q.reject(i); })
        }

    }])
    .run(['CurrentUser', function (CurrentUser) {
        console.log('run block of dpt.users module');

        CurrentUser.init();
    }]);
