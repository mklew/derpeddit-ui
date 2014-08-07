"use strict";

var signUpParts = require('./sign-up-parts.js');

var utils = require('./utils.js');

describe('Voting scenarios', function () {
    beforeEach(function () {
        browser.get('/');
        //            Given I am on a main page
        utils.tryToLogout();
        //           And I had logged in
        signUpParts.successfulSignUp();
    });

    function getSomePost() {
        return element.all(by.repeater('post in postsIndex.posts')).first();
    }

    function getScoreText(post) {
        return post.element(by.binding('post.score')).getText();
    }

    function performVoting(post, voteSelector, comparator) {

        // When I click on up arrow at some post
        var beforeVote = getScoreText(post);
        post.element(by.css(voteSelector)).click();
        var afterVote = getScoreText(post);

        // Then I should notice that post score has increased
        beforeVote.then(function (beforeScore) {
            afterVote.then(function (afterScore) {
                expect(comparator(parseInt(beforeScore), parseInt(afterScore))).toBe(true);
            })
        });

    }

    describe('Voting at main page scenarios', function () {

        it('Scenario: Upvote', function () {
            performVoting(getSomePost(), '.dpt-up-vote', function (before, after) {
                console.log('before', before, 'after', after);
                return before < after;
            });
        });

        it('Scenario: Downvote', function () {
            performVoting(getSomePost(), '.dpt-down-vote', function (before, after) {
                return before > after;
            });
        });

    });

    describe('Voting at post page scenarios', function () {

        it('Scenario: Upvote', function () {
            var post = getSomePost();
            post.element(by.css('.dpt-comments-link')).click();
            var postPageE = element(by.model('postWithComments.post'));

            performVoting(postPageE, '.dpt-up-vote', function (before, after) {
                return before < after;
            });
        });

        it('Scenario: Downvote', function () {
            var post = getSomePost();
            post.element(by.css('.dpt-comments-link')).click();
            var postPageE = element(by.model('postWithComments.post'));

            performVoting(postPageE, '.dpt-down-vote', function (before, after) {
                return before > after;
            });
        });
    });
});








