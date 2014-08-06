'use strict';

angular.module('dpt.posts.model', ['dpt.constants', 'utils'])
    .factory('PostsService', ['backendBaseAddress', '$http', '$q', '$log', 'UnwrapDataFromRequest',
        function (backendBaseAddress, $http, $q, $log, UnwrapDataFromRequest) {

            var baseUrl = backendBaseAddress + 'posts';

            var currentOrder = 'score';

            function doVote(post, negative) {
                var url = baseUrl + '/' + post.id + '/vote';
                var data = { negative: negative };
                $log.info('Making PUT request to ', url, 'with data', data);
                return UnwrapDataFromRequest($http.put(url, data))
            }

            function getPosts(orderBy) {
                var url = baseUrl + "?ordering=" + orderBy;
                $log.info('Making GET request to ', url);
                return UnwrapDataFromRequest($http.get(url)).then(function (r) {
                    currentOrder = orderBy;
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
                    if (currentOrder == 'score') return this.getTop();
                    else return this.getNewest();
                },
                getTop: function () {
                    return getPosts('score');
                },
                getNewest: function () {
                    return getPosts('created');
                },
                upvotePost: function (post) {
                    return doVote(post, false);
                },
                downvotePost: function (post) {
                    return doVote(post, true);
                },
                displaysTop: function () {
                    return currentOrder == 'score';
                },
                displaysNewest: function () {
                    return currentOrder == 'created';
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