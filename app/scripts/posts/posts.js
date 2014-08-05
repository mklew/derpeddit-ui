'use strict';

angular.module('dpt.posts.model', ['dpt.constants', 'ngResource'])
    .factory('PostsService', ['backendBaseAddress', '$resource', function (baseAddress, $resource) {

        var Posts = $resource(baseAddress + 'posts/:postId/:action', {postId: '@id', action: ''}, {
            upvote: {
                method: 'PUT',
                params: {
                    action: 'vote'
                }
            }
        });


        return {
            getAllPosts: function () {
                return Posts.query()
            },
            upvotePost: function (post) {
                return Posts.upvote({postId: post.id}, { negative: false });
            },
            downvotePost: function (post) {
                return Posts.upvote({postId: post.id}, { negative: true });
            }
        }
    }]);

