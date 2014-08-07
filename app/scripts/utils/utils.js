'use strict';

angular.module('utils', [])
    .service('_', function () { // injectable underscore
        return window._;
    })
    .factory('UnwrapDataFromRequest', ['$q', function ($q) {
        return function (request) {
            var deferred = $q.defer();
            request.success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                })
            });
            return deferred.promise;
        }
    }])
    .factory('Moment', function(){
        return window.moment;
    });