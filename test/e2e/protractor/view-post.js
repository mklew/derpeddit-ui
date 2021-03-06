var utils = require('./utils.js');

var createPostParts = require('./create-post-parts.js');

describe('View a post scenarios', function () {
//    As an anonymous user I want to be able to see post content shared by other users so learn something new
    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    function textPostScenario(navigateToPostFn) {
        var postTitle = "Some text post";
        var postText = "some text content";
        createPostParts.createTextPostWithComments(postTitle, postText);
        utils.tryToLogout();
        var createdPost = utils.getNewestPost();

        //When I navigate to post
        navigateToPostFn(createdPost);

        //Then I should see posts text and title
        expect(element(by.css('.dpt-post-title')).getText()).toMatch(postTitle);
        expect(element(by.css('.dpt-post-text')).getText()).toMatch(postText);
        //And I should notice comments below
        hasComments();
    }

    function hasComments(){
        expect(element.all(by.repeater('comment in postWithComments.comments')).count()).toBeGreaterThan(0);
    }

    describe('Scenario: Text post', function () {
        it('should notice comments below', function () {

            //When I click on a text post link
            textPostScenario(function (createdPost) {
                createdPost.element(by.binding('post.title')).click();
            });
        });
    });

    describe('Scenario: Link post', function () {
        it('should be directed to post link URL', function () {
            var postLink = "http://localhost:9000/";
            var postTitle = "To localhost";
            createPostParts.createLinkPost(postTitle, postLink);
            utils.tryToLogout();
            element(by.id('newestPosts')).click();
            var createdPost = utils.getNewestPost();
            //When I click on a link post link
            createdPost.element(by.css('.dpt-post-title')).element(by.tagName('a')).click();
            //Then I should be directed to post link URL
            expect(browser.driver.getCurrentUrl()).toMatch('.*'+postLink+'.*');
        });
    });

    describe('Scenario: Reading comments on a text post', function () {
        it('should see posts text and title and should notice comments below', function () {

            textPostScenario(function (createdPost) {
                //     When I click on a comments link for some post
                createdPost.element(by.css('.dpt-comments-link')).click();
            })
        });
    });

    describe('Scenario: Reading comments on a link post', function () {
        it('should see posts title and notice comments below', function () {
            var postTitle = "some awesome link";
            createPostParts.createLinkPostWithComments(postTitle, "http://reddit.com/");
            var createdPost = utils.getNewestPost();
            //When I click on a comments link for some post
            createdPost.element(by.css('.dpt-comments-link')).click();
            //Then I should see posts title
            expect(element(by.css('.dpt-post-title')).getText()).toMatch(postTitle);
            //And I should notice comments below
            hasComments();
        });
    });
});