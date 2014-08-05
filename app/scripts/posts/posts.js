'use strict';

angular.module('dpt.posts.model', ['dpt.constants', 'utils'])
    .factory('PostsService', ['backendBaseAddress', '$http', '$q', '$log', 'UnwrapDataFromRequest',
        function (backendBaseAddress, $http, $q, $log, UnwrapDataFromRequest) {

            var baseUrl = backendBaseAddress + 'posts';

            function doVote(post, negative) {
                var url = baseUrl + '/' + post.id + '/vote';
                var data = { negative: negative };
                $log.info('Making PUT request to ', url, 'with data', data);
                return UnwrapDataFromRequest($http.put(url, data))
            }

            return {
                getAllPosts: function () {
                    $log.info('Making GET request to ', baseUrl);
                    return UnwrapDataFromRequest($http.get(baseUrl))
                },
                upvotePost: function (post) {
                    return doVote(post, false);
                },
                downvotePost: function (post) {
                    return doVote(post, true);
                }
            }
    }]);