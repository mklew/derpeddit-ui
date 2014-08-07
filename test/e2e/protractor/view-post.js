var utils = require('./utils.js');

var createPostParts = require('./create-post-parts.js');

describe('View a post scenarios', function () {
    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    describe('//Scenario: Text post', function () {
        it('should notice comments below', function () {


        });

//When I click on a text post link
//Then I should see posts text and title
//And I should notice comments below
    });

    describe('Scenario: Link post', function () {
//When I click on a link post link
//Then I should be directed to post link URL
        it('should be directed to post link URL', function () {

        });
    });

    describe('Scenario: Reading comments on a text post', function () {
//When I click on a comments link for some post
//Then I should see posts text and title
//And I should notice comments below

        it('should see posts text and title and should notice comments below', function () {

        });
    });

    describe('Scenario: Reading comments on a link post', function () {
//When I click on a comments link for some post
//Then I should see posts title
//And I should notice comments below
        it('should see posts title and notice comments below', function () {

        });
    });
});