//Scenario: Comment
//Given I am on a main page
//And I had logged in
//And I had clicked on some post comments link
//And I have entered text to comment text box
//When I click on comment button
//Then I should see my comment added to comment lis

"use strict";

var utils = require('./utils.js');
var signUpParts = require('./sign-up-parts.js');

describe('Comment scenarios', function () {

    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    describe('Scenario: Comment', function () {
        it('should see comment', function () {
            //And I had logged in
            var username = signUpParts.successfulSignUp();

            //And I had clicked on some post comments link
            var firstPost = element.all(by.repeater('post in postsIndex.posts')).first();
            firstPost.element(by.css('.dpt-comments-link')).click();

            //And I have entered text to comment text box
            var comment = utils.randomComment();
            element(by.id('commentText')).sendKeys(comment);

            //When I click on comment button
            element(by.css('.dpt-submit-comment')).click();

            //Then I should see my comment added to comment list
            expect(element.all(by.repeater('comment in postWithComments.comments')).filter(function (elem) {
                return elem.element(by.tagName('p')).getText().then(function (text) {
                    return text === comment;
                })
            }).then(function(filteredElements) {
                return filteredElements.length;
            })).toBe(1)
        });
    })
});