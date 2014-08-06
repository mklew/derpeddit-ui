'use strict';

angular.module('dpt.posts.model')
    .factory('CommentsService', ['backendBaseAddress', '$http', '$q', '$log', 'UnwrapDataFromRequest',
        function (backendBaseAddress, $http, $q, $log, UnwrapDataFromRequest) {

            function createUrl(post) {
                return backendBaseAddress + "posts/" + post.id;
            }

            return {
                getComments: function (post) {
                    var url = createUrl(post);
                    $log.info('Making GET request to ', url);
                    return UnwrapDataFromRequest($http.get(url));
                },
                comment: function (post, comment) {
                    var url = createUrl(post);
                    $log.info('Making POST request to ', url, 'with data', comment);
                    return UnwrapDataFromRequest($http.post(url, comment));
                }
            }
        }]);