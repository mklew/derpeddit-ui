'use strict';

angular.module('dpt.posts.model', ['dpt.constants', 'utils'])
    .factory('PostsService', ['backendBaseAddress', '$http', '$q', '$log', 'UnwrapDataFromRequest',
        function (backendBaseAddress, $http, $q, $log, UnwrapDataFromRequest) {

            var baseUrl = backendBaseAddress + 'posts';

            var currentMode = 'top';

            function doVote(post, negative) {
                var url = baseUrl + '/' + post.id + '/vote';
                var data = { negative: negative };
                $log.info('Making PUT request to ', url, 'with data', data);
                return UnwrapDataFromRequest($http.put(url, data))
            }

            function getPosts(mode) {
                var url = baseUrl + "?mode=" + mode;
                $log.info('Making GET request to ', url);
                return UnwrapDataFromRequest($http.get(url)).then(function (r) {
                    currentMode = mode;
                    return r;
                }, function (e) {
                    return $q.reject(e);
                });
            }

            function submitPost(post) {
                var url = baseUrl;
                var data = angular.copy(post);
                $log.info('Making GET request to ', url, 'with data', data);
                return UnwrapDataFromRequest($http.post(url, data));
            }

            return {
                getPosts: function () {
                    if (currentMode == 'top') return this.getTop();
                    else return this.getNewest();
                },
                getTop: function () {
                    return getPosts('top');
                },
                getNewest: function () {
                    return getPosts('newest');
                },
                upVotePost: function (post) {
                    return doVote(post, false);
                },
                downVotePost: function (post) {
                    return doVote(post, true);
                },
                displaysTop: function () {
                    return currentMode == 'top';
                },
                displaysNewest: function () {
                    return currentMode == 'newest';
                },
                submitText: function (post) {
                    return submitPost(post);
                },
                submitLink: function (post) {
                    return submitPost(post);
                },
                getPostById: function (id) {
                    var url = baseUrl + '/' + id;
                    $log.info('Making GET request to ', url);
                    return UnwrapDataFromRequest($http.get(url))
                }
            }
    }]);