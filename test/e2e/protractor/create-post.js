var utils = require('./utils.js');

var loginFormObj = require('./objects/loginForm.js');

var signUpParts = require('./sign-up-parts.js');

describe('Create post scenarios', function(){
    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    beforeEach(function() {
        var loginForm = loginFormObj.instance();
    });

    function clickSubmitNewPost(){
        element(by.css('.dpt-new-post-btn')).click();
    }

    function givenLoggedInAndOnSubmitNewPost() {
        var username = signUpParts.successfulSignUp();
        utils.tryToLogout();
        var loginForm = loginFormObj.instance();
        loginForm.get();
        loginForm.setLogin(username);
        loginForm.setPassword();
        loginForm.login();

        //And I had clicked on submit post button
        clickSubmitNewPost();
    }

    describe('Scenario: Create a text post', function(){
        it('should see posts text and title', function () {
            givenLoggedInAndOnSubmitNewPost()

            //And I have entered post title and text
            var textForm = element(by.id('submitTextForm'));
            var postTitle = 'Awesome content inside';
            var postText = 'Barnabus "Barney" Stinson';
            textForm.element(by.id('textPostTitle')).sendKeys(postTitle);
            textForm.element(by.id('postText')).sendKeys(postText);

            //When I click on submit new text post
            textForm.element(by.css('.dpt-submit-text-post')).click();

            //Then I should see posts text and title
            expect(element(by.css('.dpt-post-title')).getText()).toMatch(postTitle);
            expect(element(by.css('.dpt-post-text')).getText()).toMatch(postText);
        });
    });

    describe('Scenario: Create a link post', function () {
        it('should notice that title is a href link with URL', function () {
            givenLoggedInAndOnSubmitNewPost();
            //And I had selected submit link tab
            element(by.css('.dpt-to-new-link')).click();

            //And I have entered post title and URL
            var linkForm = element(by.id('submitLinkForm'));
            var postTitle = 'Awesome link';
            var postLink = 'http://www.reddit.com/';
            linkForm.element(by.id('linkPostTitle')).sendKeys(postTitle);
            linkForm.element(by.id('postLink')).sendKeys(postLink);

            //When I click on submit new link post
            linkForm.element(by.css('.dpt-submit-link-post')).click();

            //Then I should see posts title
            var titleE = element(by.css('.dpt-post-title'));
            expect(titleE.getText()).toMatch(postTitle);
            //And it should notice that title is a href link with URL I specified
            expect(titleE.element(by.tagName('a')).getAttribute('href')).toEqual(postLink);
        });
    });
});